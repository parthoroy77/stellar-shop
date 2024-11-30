import { LuAward, LuDollarSign, LuTrendingUp } from "react-icons/lu";

export function CommissionTiers() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Grow More, Pay Less</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            Our dynamic commission structure rewards your success. The more you sell, the less you pay.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col rounded-3xl bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
            <LuDollarSign className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">Starting Tier</h3>
            <div className="text-secondary mb-2 text-4xl font-bold">8%</div>
            <p className="text-accent-foreground">Commission rate for monthly sales under $10,000</p>
            <ul className="text-accent-foreground mt-6 space-y-3 text-sm">
              <li>• Basic seller tools</li>
              <li>• Standard support</li>
              <li>• Regular payouts</li>
            </ul>
          </div>

          <div className="flex transform flex-col rounded-3xl bg-gradient-to-br from-blue-100 to-white p-8 shadow-md transition-transform hover:scale-105">
            <LuTrendingUp className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">Growth Tier</h3>
            <div className="text-secondary mb-2 text-4xl font-bold">5%</div>
            <p className="text-accent-foreground">Commission rate for monthly sales $10,000 - $50,000</p>
            <ul className="text-accent-foreground mt-6 space-y-3 text-sm">
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
              <li>• Faster payouts</li>
            </ul>
          </div>

          <div className="flex flex-col rounded-3xl bg-gradient-to-br from-blue-200 to-white p-8 shadow-sm">
            <LuAward className="text-secondary mb-6 h-12 w-12" />
            <h3 className="mb-4 text-xl font-bold">Elite Tier</h3>
            <div className="text-secondary mb-2 text-4xl font-bold">3%</div>
            <p className="text-accent-foreground">Commission rate for monthly sales over $50,000</p>
            <ul className="text-accent-foreground mt-6 space-y-3 text-sm">
              <li>• Premium features</li>
              <li>• Dedicated support</li>
              <li>• Instant payouts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
