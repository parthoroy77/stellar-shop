const ProductDescription = ({ description }: { description: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: description }} className="rounded-md border p-2"></div>;
};

export default ProductDescription;
