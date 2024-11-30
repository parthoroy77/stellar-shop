const stats = [
  { value: "10K+", label: "Active Sellers" },
  { value: "$2M+", label: "Monthly Sales" },
  { value: "150+", label: "Countries Reached" },
  { value: "99.9%", label: "Uptime" },
];
const PlatformStats = () => {
  return (
    <div className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-blue-200">{stat.label}</dt>
              <dd className="order-first text-5xl font-semibold tracking-tight text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default PlatformStats;
