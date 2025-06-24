import { getProductDetailBySlug } from "@/actions/product";
import PaymentInfo from "@/components/ProductDetail/payment-info";
import ProductDescription from "@/components/ProductDetail/product-description";
import ProductImageGallery from "@/components/ProductDetail/product-image-gallery";
import ProductInfoPanel from "@/components/ProductDetail/product-info-panel";
import ProductReviewContainer from "@/components/ProductDetail/product-review-container";
import ProductSellerInfo from "@/components/ProductDetail/product-seller-info";
import ProductShippingInfo from "@/components/ProductDetail/product-shipping-info";
import ProductSuggestion from "@/components/ProductDetail/product-suggestions";
import ProductTabNavigation from "@/components/ProductDetail/product-tab-navigation";
import BreadcrumbMenu from "@/components/ui/breadcrumb-menu";
import { products } from "@/dummyData/products";
import { formatProductBreadcrumb, processProductImages } from "@/utils/product-utils";
import { TProduct, TProductShippingOption, TSeller } from "@repo/utils/types";
import { notFound } from "next/navigation";

const items = [
  { href: "#", label: "Fashion" },
  { href: "#", label: "Kids Clothings" },
  { href: "#", label: "Kids Accessories" },
  { href: "#", label: "Comfortable and Fashionable Exclusive T-shirt" },
];

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  // For current purpose we have dummy products.
  const product: TProduct | null =
    slug === "item" ? (products[0] as unknown as TProduct) : await getProductDetailBySlug(slug);

  if (!product) {
    notFound();
  }

  const productImages = processProductImages(product);

  const breadcrumbs = formatProductBreadcrumb(product.categories);

  return (
    <section className="space-y-5 py-5">
      <BreadcrumbMenu items={breadcrumbs || items} />
      <div>
        {/* Web Layout */}
        <div className="hidden grid-cols-12 gap-4 lg:grid">
          {/* left section */}
          <section className="col-span-9 grid h-fit grid-cols-12 gap-5">
            <div className="col-span-12 grid h-fit grid-cols-12 gap-4">
              <div className="col-span-6 flex h-fit flex-col space-y-5">
                <ProductImageGallery productName={product?.productName} images={productImages} />
              </div>
              <div className="col-span-6 flex h-fit flex-col gap-5">
                <ProductInfoPanel product={product as unknown as TProduct} />
              </div>
            </div>
            <div className="col-span-12">
              <ProductTabNavigation product={product as unknown as TProduct} />
            </div>
          </section>
          {/* Right Section */}
          <section className="col-span-3 flex flex-col gap-5">
            <ProductShippingInfo shippingOptions={product.shippingOptions as TProductShippingOption[]} />
            <ProductSellerInfo seller={product.seller as unknown as TSeller} />
            <PaymentInfo />
            <hr />
            <ProductSuggestion />
          </section>
        </div>

        {/* Mobile Layout */}
        <div className="space-y-5 lg:hidden">
          <ProductImageGallery productName={product?.productName} images={productImages} />
          <ProductInfoPanel product={product as unknown as TProduct} />
          <ProductReviewContainer product={product as unknown as TProduct} />
          <ProductSellerInfo seller={product.seller as unknown as TSeller} />
          <FAQ />
          <Specification />
          <ProductDescription description={product?.description ?? ""} />
        </div>
      </div>
    </section>
  );
};

const FAQ = () => <div>FAQ</div>;
const Specification = () => <div>Specification</div>;

export default ProductDetailPage;
