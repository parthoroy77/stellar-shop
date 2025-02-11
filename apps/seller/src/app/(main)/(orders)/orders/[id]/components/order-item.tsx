import { ISubOrderItem } from "@repo/utils/types";
import Image from "next/image";

const OrderItem = ({ item }: { item: ISubOrderItem }) => {
  const { attributes, productName, product, productVariant, productVariantId, price, quantity } = item;
  const image = productVariantId
    ? productVariant.images[0]?.file?.fileSecureUrl
    : product.images[0]?.file?.fileSecureUrl;
  console.log(product.images);
  return (
    <div>
      <Image src={image!} alt={productName} />
    </div>
  );
};

export default OrderItem;
