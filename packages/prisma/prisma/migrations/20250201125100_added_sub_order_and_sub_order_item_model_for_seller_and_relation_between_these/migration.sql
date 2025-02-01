-- CreateEnum
CREATE TYPE "SubOrderStatus" AS ENUM ('PROCESSING', 'PACKED', 'SHIPPED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DELIVERY_FAILED', 'RETURN_INITIATED', 'RETURN_RECEIVED', 'REPLACEMENT_INITIATED', 'REFUND_INITIATED', 'REFUND_COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "SubOrders" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "discountAmount" DECIMAL(65,30) NOT NULL,
    "netAmount" DECIMAL(65,30) NOT NULL,
    "orderNote" TEXT,
    "status" "SubOrderStatus" NOT NULL DEFAULT 'PROCESSING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderPlacedAt" TIMESTAMP(3) NOT NULL,
    "orderPackedAt" TIMESTAMP(3),
    "orderShippedAt" TIMESTAMP(3),
    "orderDeliveredAt" TIMESTAMP(3),
    "orderCanceledAt" TIMESTAMP(3),

    CONSTRAINT "SubOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubOrderItems" (
    "id" SERIAL NOT NULL,
    "subOrderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productVariantId" INTEGER,
    "productName" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubOrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubOrders_uniqueId_key" ON "SubOrders"("uniqueId");

-- CreateIndex
CREATE INDEX "SubOrders_uniqueId_id_orderId_status_idx" ON "SubOrders"("uniqueId", "id", "orderId", "status");

-- CreateIndex
CREATE INDEX "SubOrderItems_subOrderId_productId_productVariantId_idx" ON "SubOrderItems"("subOrderId", "productId", "productVariantId");

-- AddForeignKey
ALTER TABLE "SubOrders" ADD CONSTRAINT "SubOrders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubOrders" ADD CONSTRAINT "SubOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubOrderItems" ADD CONSTRAINT "SubOrderItems_subOrderId_fkey" FOREIGN KEY ("subOrderId") REFERENCES "SubOrders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
