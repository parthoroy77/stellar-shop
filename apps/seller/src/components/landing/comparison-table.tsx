import { LuCheck, LuX } from "react-icons/lu";

export function ComparisonTable() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Why Choose Our Platform?</h2>
          <p className="text-accent-foreground mt-6 text-lg leading-8">
            See how we compare to traditional marketplaces
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-accent/40">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Features</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Our Platform</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Traditional Marketplace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { feature: "Commission Rate", us: "3-8%", them: "15-25%" },
                { feature: "Brand Control", us: true, them: false },
                { feature: "Custom Domain", us: true, them: false },
                { feature: "Analytics Dashboard", us: true, them: "Limited" },
                { feature: "Marketing Tools", us: true, them: "Basic" },
                { feature: "24/7 Support", us: true, them: false },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-accent/40"}>
                  <td className="px-6 py-4 text-sm font-medium">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.us === "boolean" ? (
                      row.us ? (
                        <LuCheck className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <LuX className="mx-auto h-5 w-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-sm">{row.us}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.them === "boolean" ? (
                      row.them ? (
                        <LuCheck className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <LuX className="mx-auto h-5 w-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-sm">{row.them}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
