import { LuDollarSign, LuTrendingUp } from "react-icons/lu";

export function SuccessStories() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Success Stories That Inspire</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            Real results from real sellers who transformed their business with us
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="bg-secondary p-8">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c"
                  alt="Success story"
                  className="h-16 w-16 rounded-full border-2 border-white"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Artisan Crafts Co.</h3>
                  <p className="text-blue-100">Handmade Jewelry Business</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <LuDollarSign className="text-secondary mx-auto mb-2 h-8 w-8" />
                  <p className="text-2xl font-bold">487%</p>
                  <p className="text-accent-foreground text-sm">Revenue Growth</p>
                </div>
                <div className="text-center">
                  <LuTrendingUp className="text-secondary mx-auto mb-2 h-8 w-8" />
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-accent-foreground text-sm">Monthly Orders</p>
                </div>
              </div>
              <p className="text-accent-foreground italic">
                "Within 6 months, we went from a local shop to serving customers worldwide. The platform's tools and
                support made scaling our business seamless."
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="bg-secondary p-8">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1542744094-24638eff58bb"
                  alt="Success story"
                  className="h-16 w-16 rounded-full border-2 border-white"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Tech Gadgets Plus</h3>
                  <p className="text-blue-100">Electronics Store</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <LuDollarSign className="text-secondary mx-auto mb-2 h-8 w-8" />
                  <p className="text-2xl font-bold">2.1M</p>
                  <p className="text-accent-foreground text-sm">Annual Revenue</p>
                </div>
                <div className="text-center">
                  <LuTrendingUp className="text-secondary mx-auto mb-2 h-8 w-8" />
                  <p className="text-2xl font-bold">325%</p>
                  <p className="text-accent-foreground text-sm">Customer Growth</p>
                </div>
              </div>
              <p className="text-accent-foreground italic">
                "The analytics tools helped us identify our best-selling products and optimize our inventory. Our
                business has never been better!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
