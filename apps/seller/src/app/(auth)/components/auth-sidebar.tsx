"use client";

import LogoText from "@/components/sidebar/logo-text";
import { DiStreamline } from "react-icons/di";
import { FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { RiDonutChartFill } from "react-icons/ri";
const cards = [
  {
    title: "Manage Orders",
    value: "20K",
    trend: 5,
    icon: <DiStreamline className="text-accent-foreground" />,
    chart: <RiDonutChartFill className="text-blue-800" size={55} />,
    position: "top-20 left-20",
  },
  {
    title: "Active Users",
    value: "8.5K",
    trend: -2,
    icon: <FaUsers className="text-green-600" />,
    chart: <RiDonutChartFill className="text-green-600" size={55} />,
    position: "top-1/2 right-48",
  },
  {
    title: "Total Sales",
    value: "$45K",
    trend: 10,
    icon: <FaShoppingCart className="text-purple-600" />,
    chart: <RiDonutChartFill className="text-purple-600" size={55} />,
    position: "bottom-12 left-16",
  },
  {
    title: "Revenue",
    value: "$32K",
    trend: 7,
    icon: <FaMoneyBillWave className="text-yellow-600" />,
    chart: <RiDonutChartFill className="text-yellow-600" size={55} />,
    position: "top-14 right-44",
  },
];

const AuthSidebar = () => {
  return (
    <section className="bg-accent/30 flex h-full w-full flex-col justify-between gap-8 p-4 md:w-[60%] md:p-20">
      <div className="relative h-full w-full">
        <LogoText />
        {cards.map((card, index) => (
          <div key={index} className={`absolute space-y-2 rounded-2xl border bg-white p-4 shadow-sm ${card.position}`}>
            <h5 className="text-sm font-medium">{card.title}</h5>
            <div className="flex items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl md:text-3xl">
                  {card.icon}
                  <span className="font-bold">{card.value}</span>
                </div>
                <h5
                  className={`flex items-center gap-2 text-xs font-semibold md:text-sm ${
                    card.trend > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.trend > 0 ? <LuTrendingUp /> : <LuTrendingDown />}
                  {Math.abs(card.trend)}% vs last month
                </h5>
              </div>
              {card.chart}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-medium md:text-3xl">Welcome Back!</h3>
        <p className="text-accent-foreground text-sm md:text-base">Start managing your store and grow exponentially!</p>
        <p className="text-accent-foreground text-sm md:text-base">
          Check your remaining orders fulfill buyer needs <br /> with your great{" "}
          <i className="text-secondary font-medium capitalize">product</i>.
        </p>
      </div>
    </section>
  );
};

export default AuthSidebar;
