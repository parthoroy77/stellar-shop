import { LuChartBar, LuBox, LuCreditCard, LuShare2 } from "react-icons/lu";

export function IntegrationShowcase() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Powerful Integrations</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            Connect with the tools you already use to streamline your business
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Payment Gateways",
              description: "Accept payments from anywhere with multiple payment options",
              icon: LuCreditCard,
              gradient: "from-purple-400 to-blue-500",
            },
            {
              title: "Shipping Partners",
              description: "Integrate with major shipping carriers worldwide",
              icon: LuBox,
              gradient: "from-blue-400 to-teal-500",
            },
            {
              title: "Analytics Tools",
              description: "Connect your favorite analytics and tracking tools",
              icon: LuChartBar,
              gradient: "from-teal-400 to-green-500",
            },
            {
              title: "Social Media",
              description: "Sync with your social media accounts for broader reach",
              icon: LuShare2,
              gradient: "from-green-400 to-cyan-500",
            },
          ].map((integration, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-10 ${integration.gradient}`} />
              <div className="relative">
                <integration.icon className="text-secondary mb-6 h-12 w-12" />
                <h3 className="mb-4 text-xl font-bold">{integration.title}</h3>
                <p className="text-accent-foreground">{integration.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
