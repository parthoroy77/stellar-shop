import { SubOrderStatus } from "@repo/prisma/client";

export type TSellerOrderFilters = {
  status: SubOrderStatus;
};
