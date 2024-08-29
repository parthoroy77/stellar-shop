import { Progress } from "@ui/index";
import { GoStarFill } from "react-icons/go";
import { RxSlash } from "react-icons/rx";

const ProductReviewStatistics = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-8">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-end">
          <h1 className="text-5xl font-medium">4.5</h1>
          <span className="text-accent-foreground/70 flex items-center text-2xl">
            <RxSlash />
            <h2>5</h2>
          </span>
        </div>
        <div className="flex text-3xl text-yellow-500">
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
          <GoStarFill />
        </div>
        <span className="block text-sm">Average Of 5 reviews</span>
      </div>
      <div>
        <ReviewProgressBar starCount={5} progress={70} reviewCount={10} />
        <ReviewProgressBar starCount={4} progress={70} reviewCount={10} />
        <ReviewProgressBar starCount={3} progress={70} reviewCount={10} />
        <ReviewProgressBar starCount={2} progress={70} reviewCount={10} />
        <ReviewProgressBar starCount={1} progress={70} reviewCount={10} />
      </div>
    </div>
  );
};

const ReviewProgressBar = ({
  progress = 0,
  starCount = 0,
  reviewCount = 0,
}: {
  progress: number;
  starCount: number;
  reviewCount: number;
}) => {
  return (
    <div className="flex items-center gap-2 text-base font-medium">
      <span>
        <GoStarFill className="text-yellow-500" size={20} />
      </span>
      <span>{starCount}</span>
      <Progress
        className="h-2 w-[250px] lg:w-[400px]"
        indicatorClass="bg-yellow-400"
        aria-label="Progress Bar Of Ratings"
        value={progress}
      />
      <span className="text-sm font-normal">{reviewCount}</span>
    </div>
  );
};

export default ProductReviewStatistics;
