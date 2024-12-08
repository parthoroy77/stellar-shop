import { Button } from "@ui/index";
import { cn } from "@ui/lib/utils";
import { FC } from "react";
import { LuCheck } from "react-icons/lu";

interface Props {
  steps: { label: string; id: number }[];
  currentStep: number;
}

const StepperIndicator: FC<Props> = ({ steps, currentStep }) => {
  return (
    <ul className="mx-auto flex justify-between">
      {steps.map(({ label, id }, i) => (
        <li key={i} className="relative">
          {i !== 2 && <div className={cn("border-accent absolute left-full top-1/2 -z-10 h-[1px] w-1/2 border")}></div>}
          {i !== 0 && (
            <div className={cn("border-accent absolute right-full top-1/2 -z-10 h-[1px] w-1/2 border")}></div>
          )}
          <Button
            size={"sm"}
            variant={"ghost"}
            disabled={currentStep < id}
            className={cn(
              "border-accent text-accent-foreground flex min-w-[150px] items-center gap-2 rounded-full border-2 px-3 py-2 hover:bg-white hover:text-black",
              currentStep === id && "border-secondary text-black",
              id < currentStep && "border-green-600"
            )}
          >
            <span className="border-secondary size-4 rounded-full border text-xs text-black">{i + 1}</span>
            <span className="text-sm">{label}</span>
            {currentStep > id && <LuCheck />}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default StepperIndicator;
