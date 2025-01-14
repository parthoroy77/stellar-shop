-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'PROCESSING', 'PACKED', 'SHIPPED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DELIVERY_FAILED', 'RETURN_INITIATED', 'RETURN_RECEIVED', 'REPLACEMENT_INITIATED', 'REFUND_INITIATED', 'REFUND_COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('PENDING', 'PAID', 'UNPAID');

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "discountAmount" DOUBLE PRECISION NOT NULL,
    "grossAmount" DOUBLE PRECISION NOT NULL,
    "shippingCost" DOUBLE PRECISION NOT NULL,
    "orderNote" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',
    "paymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "orderPlacedAt" TIMESTAMP(3) NOT NULL,
    "orderShippedAt" TIMESTAMP(3),
    "orderDeliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productVariantId" INTEGER,
    "productName" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_uniqueId_key" ON "Orders"("uniqueId");

-- CreateIndex
CREATE INDEX "Orders_uniqueId_userId_id_idx" ON "Orders"("uniqueId", "userId", "id");

-- CreateIndex
CREATE INDEX "OrderItems_orderId_productId_productVariantId_idx" ON "OrderItems"("orderId", "productId", "productVariantId");
