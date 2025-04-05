import { Button } from "@ui/index";
import { BiDollar } from "react-icons/bi";
import KeyMetrics from "./components/key-metrcis";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-xl font-medium">Dashboard</h1>

        <div>
          <Button className="flex items-center gap-2">
            <BiDollar size={17} />
            Withdraw Earnings
          </Button>
        </div>
      </div>
      <hr />
      <div className="*:p-5">
        <KeyMetrics />
      </div>
    </div>
  );
};

export default DashboardPage;
