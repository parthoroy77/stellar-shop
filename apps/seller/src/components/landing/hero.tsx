import { Button, Container } from "@repo/ui";
import { LuArrowRight } from "react-icons/lu";

const Hero = () => {
  return (
    <div>
      <Container className="w-full py-10">
        <div className="mx-auto">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="space-y-5 lg:w-1/2">
              <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
                Transform Your Products into a<span className="text-secondary"> Thriving Business</span>
              </h1>
              <p className="text-accent-foreground leading-8">
                Join thousands of successful sellers who have turned their passion into profit. Our platform provides
                everything you need to start, grow, and scale your online business.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button className="px-10" size={"lg"}>
                  Start Selling <LuArrowRight className="ml-2 inline-block h-5 w-5" />
                </Button>
                <Button variant={"ghost"}>
                  Learn more <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop"
                alt="E-commerce dashboard"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
