import { LuChartColumn, LuShoppingBag, LuTruck, LuUsers } from "react-icons/lu";

const features = [
  {
    name: "Easy to Start",
    description: "Set up your store in minutes with our intuitive dashboard and tools.",
    icon: LuShoppingBag,
  },
  {
    name: "Powerful Analytics",
    description: "Track your sales, customer behavior, and growth with detailed insights.",
    icon: LuChartColumn,
  },
  {
    name: "Global Reach",
    description: "Access customers worldwide with our integrated shipping solutions.",
    icon: LuTruck,
  },
  {
    name: "Community Support",
    description: "Join a community of sellers and share experiences and tips.",
    icon: LuUsers,
  },
];
const FeatureOfferings = () => {
  return (
    <div className="bg-accent/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-5 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-black">Everything You Need to Succeed</h2>
          <p className="text-accent-foreground text-lg leading-8">
            Our platform provides all the tools and features you need to build a successful online business.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <dt className="text-lg font-semibold leading-7">
                  <div className="bg-secondary mb-6 flex h-10 w-10 items-center justify-center rounded-lg">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="text-accent-foreground mt-2 text-base leading-7">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureOfferings;
