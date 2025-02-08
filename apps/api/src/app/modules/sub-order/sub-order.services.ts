import prisma, { Prisma, SubOrderStatus } from "@repo/prisma/client";
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

  const finalWhereClause: Prisma.SubOrderWhereInput =
    andClauses.length > 0 ? { sellerId: seller.id, AND: andClauses } : {};

  const orders = await prisma.subOrder.findMany({
    where: finalWhereClause,
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
  const total = await prisma.subOrder.count({ where: finalWhereClause });

  // formate orders to simplify
  const formattedOrder = orders.map((o) => ({ ...o, subOrderItems: o._count.subOrderItems }));

  return { result: formattedOrder, meta: { skip, limit, page, sortBy, sortOrder, total } };
};

const updateStatus = async (subOrderId: number, status: SubOrderStatus, userId: number) => {
  // Check if seller exists and is active
  const seller = await prisma.seller.findFirst({
    where: { userId, status: "ACTIVE" },
    select: { id: true },
  });

  if (!seller) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller profile not found!");
  }

  // Define allowed status transitions
  const statusUpdateFlow: Partial<Record<SubOrderStatus, SubOrderStatus>> = {
    PROCESSING: "CONFIRMED",
    CONFIRMED: "PACKED",
    PACKED: "SHIPPED",
  };

  const previousStatus = Object.keys(statusUpdateFlow).find(
    (key) => statusUpdateFlow[key as SubOrderStatus] === status
  ) as SubOrderStatus | undefined;

  if (!previousStatus) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Invalid status transition!");
  }

  // Update subOrder and order status
  const updatedSubOrder = await prisma.subOrder.update({
    where: { id: subOrderId, sellerId: seller.id, status: previousStatus },
    data: {
      status,
      order: {
        update: {
          status,
          orderStatusHistory: {
            create: {
              status,
              changedAt: new Date(),
            },
          },
        },
      },
    },
  });

  if (!updatedSubOrder) {
    throw new ApiError(StatusCodes.NOT_FOUND, "SubOrder not found or status update not allowed!");
  }

  return {
    statusCode: StatusCodes.OK,
    message: `Order status now updated to ${status.toLowerCase()}`,
  };
};

export const SubOrderServices = { getAll, updateStatus };
