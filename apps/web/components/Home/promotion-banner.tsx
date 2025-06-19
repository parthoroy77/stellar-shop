import Image from "next/image";
import banner1 from "../../public/ui-images/promoted-1.png";
import banner2 from "../../public/ui-images/promoted-2.jpg";

const PromotionBanner = () => {
  return (
    <div className="flex flex-col gap-5 *:w-full lg:h-[300px] lg:flex-row *:lg:w-[50%]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md *:w-full lg:flex-row *:lg:w-[50%]">
        <div className="bg-secondary-foreground text-primary-foreground flex h-[300px] flex-col items-center justify-center gap-3 text-xs">
          <h4 className="text-center text-2xl font-semibold">
            A place to throw your <br /> worries away
          </h4>
          <span>Up to 40% off Accessories</span>
          <span>Check Details</span>
        </div>
        <Image className="h-[300px] object-cover object-center" src={banner1} alt="Promoted Product Banner Image" />
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md *:w-full lg:flex-row *:lg:w-[50%]">
        <div className="bg-muted-foreground text-primary-foreground flex h-[300px] flex-col items-center justify-center gap-3 text-xs">
          <h4 className="text-center text-2xl font-semibold">
            Provide you the quality <br /> that's you expected
          </h4>
          <span>Up to 40% off Accessories</span>
          <span>Check Details</span>
        </div>
        <Image className="h-[300px] object-cover object-right" alt="Promoted Product Banner Image" src={banner2} />
      </div>
    </div>
  );
};

export default PromotionBanner;
