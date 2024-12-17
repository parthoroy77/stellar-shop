import ProductUploadForm from "./components/product-upload-form";

const AddNewProductPage = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between space-y-1 rounded-md rounded-b-none px-5 py-3">
        <h2 className="text-xl font-medium">Add Product</h2>
        <h5 className="text-accent-foreground text-sm"> Add a new product to your shop</h5>
      </div>
      <hr />
      <ProductUploadForm />
    </div>
  );
};

export default AddNewProductPage;
