import { getProductById } from "@/actions/product.action";
import { notFound } from "next/navigation";

type TParams = {
  id: string;
};
const ProductDetailPage = async ({ params }: { params: Promise<TParams> }) => {
  const productId = (await params).id;

  if (!productId) {
    notFound();
  }

  const product = await getProductById(+productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="divide-y *:px-5 *:py-3">
      <div>
        <h1 className="w-2/4 truncate text-pretty text-2xl font-semibold">{product.productName}</h1>
      </div>
      <div></div>
    </div>
  );
};

export default ProductDetailPage;
