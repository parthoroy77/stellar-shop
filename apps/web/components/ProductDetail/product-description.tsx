const ProductDescription = ({ description }: { description: string }) => {
  return (
    <div className="text-accent-foreground rounded-md border p-4 text-xs tracking-wide lg:text-sm"> {description}</div>
  );
};

export default ProductDescription;
