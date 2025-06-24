import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const FeatureProducts = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Find fresh grocery & dairy products"
          subHeading="Grab Before Stock Out"
          className="text-accent-foreground bg-[url('/ui-images/sidebar-4.jpg')] bg-cover bg-left"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductShowcase demoItems={8} isDemo products={[]} />
      </div>
    </div>
  );
};

export default FeatureProducts;
