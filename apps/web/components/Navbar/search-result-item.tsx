import Image from "next/image";
import { FC } from "react";
interface SearchResultItemProps {
  isFocused: boolean; // Focus state to highlight the item
  onMouseEnter: () => void; // Function that handles mouse hover event
}
const SearchResultItem: FC<SearchResultItemProps> = ({ isFocused, onMouseEnter }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`${isFocused ? "bg-accent/40" : "bg-white"} flex cursor-pointer items-center justify-between gap-2 px-4 py-3`}
    >
      <div className="flex items-center gap-2">
        <Image
          width={45}
          height={45}
          className="size-[35px] rounded-md border md:size-[40px] lg:size-[45px]"
          src="https://klbtheme.com/bevesi/wp-content/uploads/2024/04/2-17-1024x1024.jpg"
          alt="Product Image"
        />
        <div>
          <h6 className="text-[.6rem] font-medium lg:text-sm">
            LEGO Creator 3 in 1 Tropical Ukulele Instrument Toy, Lorem ipsum dolor sit amet consectetur adipisicing
          </h6>
        </div>
      </div>
      <div>
        <span className="text-primary text-sm font-semibold lg:text-base">$7.99</span>
      </div>
    </div>
  );
};

export default SearchResultItem;
