import { LuArrowRight } from "react-icons/lu";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your Products into a<span className="text-blue-600"> Thriving Business</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join thousands of successful sellers who have turned their passion into profit. Our platform provides
              everything you need to start, grow, and scale your online business.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Start Selling <LuArrowRight className="ml-2 inline-block h-5 w-5" />
              </button>
              <button className="text-lg font-semibold leading-6 text-gray-900 transition-all hover:text-blue-600">
                Learn more <span aria-hidden="true">→</span>
              </button>
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
    </section>
  );
};

export default Hero;
