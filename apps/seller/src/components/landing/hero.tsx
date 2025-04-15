import { Button, Container } from "@repo/ui";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import dashboardImg from "../../../public/dashboard-2.png";
const Hero = () => {
  return (
    <Container className="h-fit w-full py-10">
      <div className="mx-auto">
        <div className="flex flex-col items-center gap-12">
          <div className="flex w-2/3 flex-col items-center justify-center gap-5 text-center">
            <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
              Transform Your Products into a<span className="text-secondary"> Thriving Business</span>
            </h1>
            <p className="text-accent-foreground leading-8">
              Join thousands of successful sellers who have turned their passion into profit. Our platform provides
              everything you need to start, grow, and scale your online business.
            </p>
            <div className="flex items-center gap-x-6">
              <Button className="px-10" size={"lg"}>
                Start Selling <LuArrowRight className="ml-2 inline-block h-5 w-5" />
              </Button>
              <Button variant={"link"}>
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
          <div className="">
            <Image
              src={dashboardImg}
              alt="Stellar Shop Seller Dashboard"
              className="overflow-hidden rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
