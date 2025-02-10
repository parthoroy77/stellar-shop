-- AddForeignKey
ALTER TABLE "SubOrderItems" ADD CONSTRAINT "SubOrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubOrderItems" ADD CONSTRAINT "SubOrderItems_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
