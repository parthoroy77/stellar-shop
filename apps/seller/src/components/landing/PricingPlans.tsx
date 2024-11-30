import { LuCheck, LuZap } from "react-icons/lu";

const plans = [
  {
    name: "Starter",
    price: "$29",
    commission: "8%",
    features: ["Up to 100 products", "Basic analytics", "Standard support", "Basic marketing tools", "Manual payouts"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$79",
    commission: "5%",
    features: [
      "Unlimited products",
      "Advanced analytics",
      "Priority support",
      "Advanced marketing tools",
      "Automated payouts",
      "Custom domain",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    commission: "3%",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integration",
      "API access",
      "Bulk upload tools",
      "White-label solution",
    ],
    popular: false,
  },
];

export function PricingPlans() {
  return (
    <div className="bg-accent/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Choose Your Growth Plan</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            Select a plan that best fits your business needs. Lower commission rates as you grow!
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                plan.popular ? "relative shadow-xl" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-secondary absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.popular && <LuZap className="text-secondary h-6 w-6" />}
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-accent-foreground text-sm font-semibold leading-6">/month</span>
                </p>
                <p className="text-accent-foreground mt-2 text-base leading-6">
                  Commission rate: <span className="font-semibold">{plan.commission}</span>
                </p>
                <ul role="list" className="text-accent-foreground mt-8 space-y-3 text-sm leading-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <LuCheck className="text-secondary h-6 w-5 flex-none" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.popular
                    ? "bg-secondary text-white hover:bg-blue-500 focus-visible:outline-blue-600"
                    : "text-secondary bg-accent/40 hover:bg-gray-100"
                }`}
              >
                Get started today
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
