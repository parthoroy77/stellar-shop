import { LuClock, LuGift, LuRocket, LuShield } from "react-icons/lu";

const PlatformBenefits = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Why Sellers Choose Us</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            Join a platform that puts sellers first with industry-leading benefits and support
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          <div className="relative rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <LuShield className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">Secure Payments</h3>
            <p className="text-accent-foreground">Guaranteed secure transactions and reliable payment processing</p>
          </div>

          <div className="relative rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <LuRocket className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">Quick Setup</h3>
            <p className="text-accent-foreground">Get your store up and running in minutes with our intuitive tools</p>
          </div>

          <div className="relative rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <LuGift className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">Special Offers</h3>
            <p className="text-accent-foreground">Regular promotions and marketing support to boost your sales</p>
          </div>

          <div className="relative rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <LuClock className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">24/7 Support</h3>
            <p className="text-accent-foreground">Round-the-clock assistance to help you succeed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformBenefits;
