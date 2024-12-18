import { Button } from "@ui/index";
import Link from "next/link";
import { LuArrowRight,  LuCircleCheck } from "react-icons/lu";

const OnboardingSuccessful = () => {
  return (
    <div className="flex min-h-[350px] w-full flex-col justify-center space-y-5 rounded-lg border bg-white p-8 text-center">
      <div>
        <LuCircleCheck className="mx-auto size-10" color="green" />
      </div>
      <h1 className="text-2xl font-semibold text-black">Account Approved!</h1>
      <p className="text-accent-foreground mx-auto w-[80%]">
        Congratulations! Your account has been successfully reviewed and approved. You now have full access to all our
        platform features.
      </p>
      <p className="text-sm text-gray-500">
        Thank you for your patience during the review process. We're excited to have you on board!
      </p>
      <Link href="/dashboard">
        <Button size={"sm"} variant={"success"} className="px-10">
          Go to Dashboard
          <LuArrowRight className="-mr-1 ml-2 size-4" aria-hidden="true" />
        </Button>
      </Link>
    </div>
  );
};

export default OnboardingSuccessful;
