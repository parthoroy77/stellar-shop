import prisma, { Order, Prisma, SubOrderStatus } from "@repo/prisma/client";
import { toNormalCase } from "@repo/utils/functions";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { TSellerOrderFilters } from "./sub-order.types";

const getAll = async ({ status }: TSellerOrderFilters, options: TPaginateOption, userId: number) => {
  const { skip, limit, page, sortBy, sortOrder } = calculatePagination(options);

  const seller = await prisma.seller.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true } });

  if (!seller) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller profile not found!");
  }

  const andClauses: Prisma.SubOrderWhereInput[] = [];

  if (status) {
    andClauses.push({
      status,
    });
  }

  const whereClause: Prisma.SubOrderWhereInput = andClauses.length > 0 ? { sellerId: seller.id, AND: andClauses } : {};
  const orders = await prisma.subOrder.findMany({
    where: {
      sellerId: seller.id,
      ...whereClause,
    },
    select: {
      id: true,
      netAmount: true,
      orderPlacedAt: true,
      status: true,
      order: {
        select: {
          id: true,
          uniqueId: true,
          status: true,
          paymentMethod: {
            select: { name: true, type: true },
          },
          user: {
            select: { fullName: true, avatarUrl: true },
          },
          paymentStatus: true,
        },
      },
      _count: {
        select: { subOrderItems: true },
      },
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.subOrder.count({ where: whereClause });

  // formate orders to simplify
  const formattedOrder = orders.map((o) => ({ ...o, totalItems: o._count.subOrderItems }));

  return { result: formattedOrder, meta: { skip, limit, page, sortBy, sortOrder, total } };
};

const updateStatus = async (subOrderId: number, status: SubOrderStatus, userId: number) => {
  // Verify seller existence
  const seller = await prisma.seller.findFirst({
    where: { userId, status: "ACTIVE" },
    select: { id: true },
  });

  if (!seller) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller profile not found!");
  }

  // Define allowed status transitions
  const statusTransitions: Partial<Record<SubOrderStatus, { previous: SubOrderStatus; timestampField?: keyof Order }>> =
    {
      CONFIRMED: { previous: "PROCESSING" },
      CANCELED: { previous: "PROCESSING" },
      PACKED: { previous: "CONFIRMED", timestampField: "orderPackedAt" },
      SHIPPED: { previous: "PACKED", timestampField: "orderShippedAt" },
    };

  // Validate status transition
  const transition = statusTransitions[status];
  if (!transition) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Invalid status transition!");
  }

  // Fetch sub-order details
  const subOrder = await prisma.subOrder.findFirst({
    where: { id: subOrderId, sellerId: seller.id, status: transition.previous },
    select: { id: true, orderId: true },
  });

  if (!subOrder) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Sub-order not found or invalid status transition!");
  }

  if (!subOrder.orderId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Associated order not found!");
  }

  const timeStamp = new Date();

  await prisma.$transaction(async (tx) => {
    // Update sub-order status
    await tx.subOrder.update({
      where: { id: subOrder.id },
      data: { status },
    });

    // Check if all sub-orders for this order are updated
    const subOrders = await tx.subOrder.findMany({
      where: { orderId: subOrder.orderId },
      select: { status: true },
    });

    // Determine the parent order status
    const statusHierarchy: Partial<SubOrderStatus[]> = [
      SubOrderStatus.CONFIRMED,
      SubOrderStatus.PACKED,
      SubOrderStatus.SHIPPED,
    ];
    const allStatuses = subOrders.map((s) => s.status).filter((s) => s !== "CANCELED"); // Exclude canceled sub-orders
    let parentOrderStatus: SubOrderStatus | null = null;

    for (const status of statusHierarchy) {
      const statusIndex = statusHierarchy.indexOf(status);
      const allReachedStatus = allStatuses.every((s) => {
        const currentStatusIndex = statusHierarchy.indexOf(s as SubOrderStatus);
        return currentStatusIndex >= statusIndex;
      });

      if (allReachedStatus) {
        parentOrderStatus = status!;
      } else {
        break;
      }
    }

    // Update order status only if needed
    if (parentOrderStatus) {
      await tx.order.update({
        where: { id: subOrder.orderId },
        data: {
          status: parentOrderStatus,
          ...(transition.timestampField && { [transition.timestampField]: timeStamp }),
          orderStatusHistory: {
            create: {
              status: parentOrderStatus,
              changedAt: timeStamp,
            },
          },
        },
      });
    }
    return;
  });

  return {
    statusCode: StatusCodes.OK,
    message: `Order status updated to ${toNormalCase(status.toLowerCase()).toLowerCase()}`,
  };
};

/**
 * Get Order details specially for seller
 * @param subOrderId
 * @returns
 */
const get = async (subOrderId: number) => {
  const result = await prisma.subOrder.findUnique({
    where: {
      id: subOrderId,
    },
    select: {
      id: true,
      totalAmount: true,
      discountAmount: true,
      netAmount: true,
      orderPlacedAt: true,
      shippingOption: {
        select: {
          name: true,
          estimateDays: true,
        },
      },
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
      order: {
        select: {
          uniqueId: true,
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
        },
      },
    },
  });
  return result;
};

export const SubOrderServices = { getAll, updateStatus, get };
