import prisma, { OrderStatus, Prisma, SubOrderStatus } from "@repo/prisma/client";
import { generateUniqueId, toNormalCase } from "@repo/utils/functions";
import { StatusCodes } from "http-status-codes";
import { redisInstance } from "../../../server";
import { ApiError } from "../../handlers/ApiError";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { CheckoutServices } from "../checkout/checkout.services";
import { getCheckoutCacheKey, getCheckoutSession } from "../checkout/checkout.utils";
import { TOrderFilters } from "./order.types";
import { handlePaymentRedirect } from "./order.utils";

const place = async (payload: { orderNote?: string }, userId: number) => {
  // retrieved checkout details
  const cacheKey = getCheckoutCacheKey(userId);
  const { packages, paymentMethodId, shippingAddress: shippingAddressId } = await getCheckoutSession(userId);

  const orderPlacingTime = new Date();

  // Check shipping address
  if (!shippingAddressId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Shipping address not found!");
  }

  // Check shipping address
  if (!paymentMethodId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Payment method not found!");
  }

  // Calculate updated order summary
  const orderSummary = await CheckoutServices.summary(userId);

  // Fetch payment method from database
  const paymentMethod = await prisma.paymentMethod.findUnique({
    where: { id: paymentMethodId, status: "ACTIVE" },
    select: { type: true, id: true },
  });

  if (!paymentMethod) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid payment method!");
  }

  // Fetch shipping address from database
  const shippingAddress = await prisma.shippingAddress.findUnique({ where: { id: +shippingAddressId, userId } });

  if (!shippingAddress) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Shipping address not found!");
  }

  // Create base order data with basic fields
  const orderBase: Prisma.OrderCreateArgs["data"] = {
    uniqueId: generateUniqueId("ORD-"),
    userId,
    totalAmount: orderSummary.totalAmount,
    discountAmount: orderSummary.discountAmount,
    shippingAmount: orderSummary.totalShippingFee,
    grossAmount: orderSummary.grossAmount,
    netAmount: orderSummary.netAmount,
    paymentMethodId: paymentMethod.id,
    orderNote: payload.orderNote ?? null,
    status: "PLACED",
    orderPlacedAt: orderPlacingTime,
    // Order shipping address
    orderShippingAddress: {
      create: {
        fullName: shippingAddress.fullName,
        phoneNumber: shippingAddress?.phoneNumber,
        fullAddress: shippingAddress?.fullAddress,
        country: shippingAddress.country,
        state: shippingAddress.state,
        city: shippingAddress.city,
        zipCode: shippingAddress.zipCode,
        type: shippingAddress.type,
      },
    },
    // Order status history
    orderStatusHistory: {
      create: {
        status: "PLACED",
        changedAt: orderPlacingTime,
      },
    },
  };

  // Initialize sub order and order item
  const subOrdersData: Prisma.SubOrderUncheckedCreateInput[] = [];
  const orderItemsData: Prisma.OrderItemCreateManyInput[] = [];

  // Process each package
  for (const { items, selectedShippingOption, sellerId } of packages) {
    // Fetch shipping option from database
    const shippingOption = await prisma.shippingOption.findUnique({ where: { id: +selectedShippingOption! } });
    if (!shippingOption) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Shipping option not found!");
    }

    // Package amounts
    let totalSubOrderAmount = 0;
    let discountAmount = 0;
    let netAmount = 0;

    // Initialize sub order item for each package
    const subOrderItems: Prisma.SubOrderItemCreateManyInput[] = [];

    // Process each items in a package
    for (const { productId, productVariantId, quantity } of items) {
      // Fetch the product
      const product = await prisma.product.findUnique({
        where: { id: productId, status: "ACTIVE" },
        select: {
          id: true,
          stock: true,
          productName: true,
          price: true,
          attributes: {
            select: {
              attributeValue: {
                select: {
                  id: true,
                  value: true,
                  attribute: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!product) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Product not found!");
      }

      // Fetch the variant if this item has variants
      const variant = productVariantId
        ? await prisma.productVariant.findUnique({
            where: { id: productVariantId, productId, status: "ACTIVE" },
            select: {
              id: true,
              stock: true,
              price: true,
              attributes: {
                select: {
                  attributeValue: {
                    select: {
                      id: true,
                      value: true,
                      attribute: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          })
        : null;

      // Determine stock
      const stock = variant ? variant.stock : product.stock;

      // Validate stock need based on quantity
      if (stock < quantity) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Some products are out of stock");
      }

      // Determine price
      const price = variant ? variant.price : product.price;

      // Calculate sub total for this item
      const subTotal = price * quantity;

      // Update package sub total
      totalSubOrderAmount += subTotal;

      // Prepare order item and sub order item base data
      const itemData = {
        productId: product.id,
        productVariantId: variant ? variant.id : null,
        productName: product.productName,
        attributes: variant ? variant.attributes : product.attributes,
        price,
        quantity,
        totalAmount: subTotal,
      };

      // @ts-ignore
      subOrderItems.push(itemData);
      // @ts-ignore
      orderItemsData.push(itemData);
    }

    // Calculate net amount for this package
    netAmount += totalSubOrderAmount - discountAmount;
    //@ts-ignore
    subOrdersData.push({
      uniqueId: generateUniqueId("SUB-"),
      sellerId: sellerId!,
      totalAmount: totalSubOrderAmount,
      discountAmount,
      netAmount,
      shippingOptionId: shippingOption.id,
      orderPlacedAt: orderPlacingTime,
      subOrderItems: {
        createMany: { data: subOrderItems },
      },
      orderNote: payload.orderNote ? payload.orderNote : null,
    });
  }

  // Execute database transactions for order placement
  const orderId = await prisma.$transaction(async (tx) => {
    // create order
    const order = await tx.order.create({
      data: { ...orderBase, orderItems: { createMany: { data: orderItemsData } } },
    });

    // create sub orders
    await Promise.all(
      subOrdersData.map((subOrderData) =>
        tx.subOrder.create({
          data: {
            ...subOrderData,
            orderId: order.id,
          },
        })
      )
    );

    /**
     * Update product or variant stocks
     * Create inventory log for this action
     * */
    for (let { productId, productVariantId, quantity } of orderItemsData) {
      if (productVariantId) {
        await tx.productVariant.update({
          where: { id: productVariantId },
          data: {
            stock: {
              decrement: quantity,
            },
            inventoryLogs: {
              create: {
                action: "DEDUCTION",
                productId,
                quantity,
                type: "SALE",
              },
            },
          },
        });
      } else {
        await tx.product.update({
          where: { id: productId },
          data: {
            stock: {
              decrement: quantity,
            },
            inventoryLogs: {
              create: {
                action: "DEDUCTION",
                quantity,
                type: "SALE",
              },
            },
          },
        });
      }
    }

    // Clear cart item after placing order
    await tx.cartItem.deleteMany({
      where: {
        userId,
        productId: { in: orderItemsData.map((item) => item.productId) },
        quantity: { in: orderItemsData.map((item) => item.quantity) },
      },
    });

    // Clear checkout session for this user
    await redisInstance!.del(cacheKey);

    return order.uniqueId;
  });

  return handlePaymentRedirect(paymentMethod.type, orderId);
};

/**
 * Only for Admin
 * Retrieves orders based on provided filters and options.
 * @param {object} filters - The filtering criteria for retrieving orders.
 * @param {object} options - Pagination and sorting options.
 * @returns {Promise<{ results: object[], meta: TMeta }>}
 * */
const getOrdersForAdmin = async ({ status, paymentStatus }: TOrderFilters, options: TPaginateOption) => {
  const { skip, limit, page, sortBy, sortOrder } = calculatePagination(options);
  const andClauses: Prisma.OrderWhereInput[] = [];

  if (status) {
    andClauses.push({
      status,
    });
  }
  if (paymentStatus) {
    andClauses.push({
      paymentStatus,
    });
  }

  const finalWhereClause: Prisma.OrderWhereInput = andClauses.length > 0 ? { AND: andClauses } : {};

  const orders = await prisma.order.findMany({
    where: finalWhereClause,
    select: {
      id: true,
      uniqueId: true,
      totalAmount: true,
      discountAmount: true,
      shippingAmount: true,
      netAmount: true,
      status: true,
      paymentStatus: true,
      paymentMethod: {
        select: { name: true, type: true },
      },
      user: {
        select: { fullName: true, avatarUrl: true },
      },
      _count: {
        select: {
          subOrders: true,
          orderItems: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.order.count({ where: finalWhereClause });

  return {
    result: orders.map((order) => ({
      ...order,
      totalSubOrders: order._count.subOrders,
      totalOrderItems: order._count.orderItems,
    })),
    meta: {
      skip,
      limit,
      page,
      sortBy,
      sortOrder,
      total,
    },
  };
};

const updateOrderStatusForAdmin = async (orderId: number, status: OrderStatus) => {
  // Define allowed status transitions
  const statusTransitions: Partial<Record<string, { previous: string; timestampField?: string }>> = {
    IN_TRANSIT: { previous: "SHIPPED" },
    OUT_FOR_DELIVERY: { previous: "IN_TRANSIT" },
    DELIVERED: { previous: "OUT_FOR_DELIVERY", timestampField: "orderDeliveredAt" },
    [OrderStatus.DELIVERY_FAILED]: { previous: "OUT_FOR_DELIVERY", timestampField: "orderCanceledAt" },
  };

  // Ensure the requested status transition is allowed
  const transition = statusTransitions[status];
  if (!transition) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "You cannot update this status!");
  }

  // Prepare update data
  const updateData: Record<string, any> = { status };
  if (transition.timestampField) {
    updateData[transition.timestampField] = new Date();
  }

  // Update order and related sub-orders in a transaction
  await prisma.$transaction(async (prisma) => {
    // Update Order
    const order = await prisma.order.update({
      where: { id: orderId, status: transition.previous as OrderStatus },
      data: {
        ...updateData,
        orderStatusHistory: {
          create: { status, changedAt: new Date() },
        },
      },
    });

    // Update related SubOrders
    await prisma.subOrder.updateMany({
      where: { orderId, status: transition.previous as SubOrderStatus },
      data: { ...updateData },
    });

    return order;
  });

  return {
    statusCode: StatusCodes.OK,
    message: `Order status updated to ${toNormalCase(status.toLowerCase())}`,
  };
};

const getDetailForAdmin = async (orderId: number) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      uniqueId: true,
      totalAmount: true,
      discountAmount: true,
      grossAmount: true,
      shippingAmount: true,
      netAmount: true,
      paymentStatus: true,
      status: true,
      paymentMethod: {
        select: {
          name: true,
          type: true,
        },
      },
      orderStatusHistory: true,
      orderShippingAddress: {
        take: 1,
        omit: { createdAt: true, updatedAt: true },
      },
      user: {
        select: { fullName: true, avatarUrl: true },
      },
      subOrders: {
        select: {
          id: true,
          totalAmount: true,
          discountAmount: true,
          netAmount: true,
          shippingOption: {
            select: {
              name: true,
              estimateDays: true,
            },
          },
          status: true,
          seller: { select: { shopName: true, logo: { select: { fileSecureUrl: true } } } },
          subOrderItems: {
            include: {
              product: {
                select: {
                  uniqueId: true,
                  images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } },
                },
              },
              productVariant: {
                select: {
                  uniqueId: true,
                  images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } },
                },
              },
            },
            omit: { createdAt: true, updatedAt: true },
          },
        },
      },
      _count: { select: { orderItems: true } },
    },
  });

  return { ...order, totalOrderItems: order?._count.orderItems };
};

const getOrdersForBuyer = async (userId: number, options: TPaginateOption, status?: TOrderFilters["status"]) => {
  const { skip, limit, page, sortBy, sortOrder } = calculatePagination(options);
  const andClauses: Prisma.OrderWhereInput[] = [];

  if (status) {
    andClauses.push({
      status,
    });
  }

  const whereClause: Prisma.OrderWhereInput = andClauses.length > 0 ? { userId, AND: andClauses } : { userId };

  const orders = await prisma.order.findMany({
    where: whereClause,
    select: {
      id: true,
      uniqueId: true,
      status: true,
      totalAmount: true,
      shippingAmount: true,
      discountAmount: true,
      grossAmount: true,
      orderNote: true,
      orderPlacedAt: true,
      netAmount: true,
      paymentStatus: true,
      orderStatusHistory: { omit: { orderId: true } },
      paymentMethod: {
        select: {
          name: true,
          type: true,
        },
      },
      subOrders: {
        select: {
          seller: {
            select: { shopName: true, logo: { select: { fileSecureUrl: true } } },
          },
          subOrderItems: {
            select: {
              price: true,
              productName: true,
              quantity: true,
              attributes: true,
              totalAmount: true,
              product: {
                select: { images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } } },
              },
              productVariant: {
                select: { images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } } },
              },
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.order.count({ where: whereClause });

  return {
    result: orders,
    meta: {
      skip,
      limit,
      page,
      sortBy,
      sortOrder,
      total,
    },
  };
};

const getDetailForBuyer = async (orderId: number, userId: number) => {
  const result = await prisma.order.findFirst({
    where: { id: orderId, userId },
    select: {
      id: true,
      uniqueId: true,
      totalAmount: true,
      discountAmount: true,
      grossAmount: true,
      shippingAmount: true,
      netAmount: true,
      paymentStatus: true,
      status: true,
      paymentMethod: {
        select: {
          name: true,
          type: true,
        },
      },
      orderStatusHistory: true,
      orderItems: {
        include: {
          product: {
            select: {
              uniqueId: true,
              images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } },
            },
          },
          productVariant: {
            select: {
              uniqueId: true,
              images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } },
            },
          },
        },
        omit: { createdAt: true, updatedAt: true, productId: true, productVariantId: true, orderId: true, id: true },
      },
    },
  });

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order not found!");
  }

  return result;
};

export const OrderServices = {
  place,
  // Admin services
  getOrdersForAdmin,
  updateOrderStatusForAdmin,
  getDetailForAdmin,
  // Buyer services
  getOrdersForBuyer,
  getDetailForBuyer,
};
