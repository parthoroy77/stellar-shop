import Image from "next/image";

const SearchResultItem = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image
          width={45}
          height={45}
          className="rounded-md border"
          src="https://klbtheme.com/bevesi/wp-content/uploads/2024/04/2-17-1024x1024.jpg"
          alt="Product Image"
        />
        <div>
          <h6 className="text-[.8rem] font-medium">
            LEGO Creator 3 in 1 Tropical Ukulele Instrument Toy, Transforms from Ukulele to Surfboard Toy to Dolphin Toy
          </h6>
        </div>
      </div>
      <div>
        <span className="text-primary font-semibold">$7.99</span>
      </div>
    </div>
  );
};

export default SearchResultItem;
