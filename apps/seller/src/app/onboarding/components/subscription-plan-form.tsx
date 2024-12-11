import { Button, RadioGroup, RadioGroupItem } from "@ui/index";
import { LuCheck } from "react-icons/lu";

const data = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billingPeriod: "monthly",
    features: ["Up to 10 product listings", "Basic analytics", "Standard support", "Community forum access"],
    productLimit: 10,
  },
  {
    id: "starter",
    name: "Starter",
    price: 19.99,
    billingPeriod: "monthly",
    features: [
      "Up to 50 product listings",
      "Advanced analytics",
      "Priority email support",
      "Social media integration",
      "Inventory management",
    ],
    productLimit: 50,
    recommended: true,
  },
  {
    id: "professional",
    name: "Professional",
    price: 49.99,
    billingPeriod: "monthly",
    features: [
      "Up to 100 product listings",
      "Advanced analytics with custom reports",
      "24/7 priority support",
      "API access",
      "Multi-channel selling",
      "Automated marketing tools",
    ],
    productLimit: 100,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199.99,
    billingPeriod: "monthly",
    features: [
      "Unlimited product listings",
      "Custom analytics solutions",
      "Dedicated account manager",
      "Custom API integration",
      "Advanced multi-channel selling",
      "AI-powered marketing and optimization",
      "White-label options",
    ],
    productLimit: Infinity,
  },
];

const SubscriptionPlanForm = ({}: { form: any }) => {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h6 className="text-accent-foreground text-xs">Step 3</h6>
        <h3 className="text-lg font-medium text-black">Subscription Plans</h3>
      </div>
      <hr />
      <RadioGroup className="space-y-3 *:rounded-lg *:border *:px-5 *:py-3 *:shadow-sm">
        {data.map(({ billingPeriod, features, name, price, }, i) => (
          <div key={i} className="flex items-start gap-3">
            <RadioGroupItem className="mt-1 size-6" value="option-one" id="option-one" />
            <div className="w-full space-y-2">
              <div className="flex h-fit items-center justify-between">
                <h4 className="font-medium">{name} Plan</h4>
                <Button
                  size={"sm"}
                  variant={"link"}
                  className="text-accent-foreground flex h-fit w-fit items-center p-0 hover:no-underline"
                >
                  <span>
                    from <i className="text-primary text-base font-bold">${price}</i> /
                  </span>{" "}
                  <span>{billingPeriod}</span>
                </Button>
              </div>
              <ul className="text-accent-foreground flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium">
                {features.map((x, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <LuCheck size={16} color="green" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SubscriptionPlanForm;
