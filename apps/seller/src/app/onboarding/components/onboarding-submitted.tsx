import { Progress } from "@ui/index";
import { LuHourglass } from "react-icons/lu";

const OnboardingSubmitted = () => {
  return (
    <div className="flex h-[350px] w-full flex-col justify-center space-y-5 rounded-lg border bg-white p-8 text-center">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="border-secondary size-16 animate-spin rounded-full border-b-2"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <LuHourglass className="size-6 text-black" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-black">Account Under Review</h1>
      <p className="text-accent-foreground mx-auto w-[70%] text-sm">
        Thank you for your patience. Our team is currently reviewing your account. We will notify you shortly with
        further information.
      </p>
      <div className="bg-accent h-2 w-full rounded-full">
        <Progress value={75} className="bg-accent h-2" indicatorClass="bg-secondary" />
      </div>
      <p className="text-accent-foreground text-sm">
        This process usually takes 1-2 business days. We appreciate your understanding.
      </p>
    </div>
  );
};

export default OnboardingSubmitted;
