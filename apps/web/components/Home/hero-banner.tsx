import { Button } from "@repo/ui";

const HeroBanner = () => {
  return (
    <div className="w-[58%] h-full relative">
      <img
        className="h-full w-full rounded-md object-cover object-cover"
        src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/blog-post-5.png"
        alt="Banner Image"
      />
      <div className="bg-gradient-to-r from-gray-900 to-black h-full w-full absolute top-0 opacity-40" />
      <div className="absolute h-full w-full flex flex-col justify-center gap-6 p-8 top-0 text-white">
        <Button className="uppercase bg-accent px-8 tracking-wide w-fit" size={"sm"}>
          From $320
        </Button>
        <h1 className="text-4xl font-semibold ">Trends Car Rims</h1>
        <p className="w-[80%] text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, tempora voluptates dicta incidunt commodi
          magni maxime nobis debitis nesciunt obcaecati dolorem a
        </p>
        <div className="space-x-3">
          <Button className="text-white text-sm px-8 " size={"sm"}>
            From $320
          </Button>
          <Button className="text-white bg-secondary text-sm px-8 " size={"sm"}>
            From $320
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
