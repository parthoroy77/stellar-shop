import { Button } from "@repo/ui";

const HeroBanner = () => {
  return (
    <div className="relative h-[550px] w-full overflow-hidden rounded-md lg:w-[58%]">
      <img
        className="h-full w-full rounded-md object-cover"
        src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/blog-post-5.png"
        alt="Banner Image"
      />
      <div className="absolute top-0 h-full w-full bg-gradient-to-r from-gray-900 to-black opacity-40" />
      <div className="absolute top-0 flex h-full w-full flex-col justify-center gap-6 p-8 text-white">
        <Button variant={"outline"} className="text-primary w-fit px-8 uppercase tracking-wide" size={"sm"}>
          From $320
        </Button>
        <h1 className="text-3xl font-semibold lg:text-4xl">Trends Car Rims</h1>
        <p className="text-sm lg:w-[80%] lg:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, tempora voluptates dicta incidunt commodi
          magni maxime nobis debitis nesciunt obcaecati dolorem a
        </p>
        <div className="space-x-3">
          <Button className="px-8 text-sm text-white" size={"sm"}>
            From $320
          </Button>
          <Button className="bg-secondary px-8 text-sm text-white" size={"sm"}>
            From $320
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
