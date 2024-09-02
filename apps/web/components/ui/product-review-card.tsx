import Image from "next/image";
import { GoStarFill } from "react-icons/go";

const ProductReviewCard = () => {
  return (
    <div className="space-y-1 py-3">
      <div className="flex gap-1 text-yellow-500">
        <GoStarFill />
        <GoStarFill />
        <GoStarFill />
        <GoStarFill />
        <GoStarFill />
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-primary text-lg font-medium">Partho Roy</h4>
        <span className="text-accent-foreground block text-xs">10 Jul 2024</span>
      </div>
      <p className="text-accent-foreground text-sm">
        I am extremely satisfied with this purchase. The item arrived promptly, and the quality is exceptional. It's
        evident that the makers paid attention to detail. Overall, a fantastic buy!
      </p>
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_x, i) => (
          <Image
            height={80}
            width={80}
            key={i}
            className="size-20 object-contain"
            src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
            alt="Product Review Image"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductReviewCard;
