import { Button } from "@ui/index";
import { cn } from "@ui/lib/utils";

const steps = [
  {
    id: 1,
    label: "Store Information",
  },
  {
    id: 2,
    label: "Address Details",
  },
  {
    id: 3,
    label: "Subscription Plans",
  },
];

const StepperIndicator = () => {
  return (
    <ul className="mx-auto flex justify-between">
      {steps.map(({ label }, i) => (
        <li key={i} className="relative">
          {i !== 2 && <div className={cn("border-accent absolute left-full top-1/2 -z-10 h-[1px] w-1/2 border")}></div>}
          {i !== 0 && (
            <div className={cn("border-accent absolute right-full top-1/2 -z-10 h-[1px] w-1/2 border")}></div>
          )}
          <Button
            size={"sm"}
            variant={"ghost"}
            disabled={i !== 0}
            className={cn(
              "border-secondary flex min-w-[150px] items-center gap-2 rounded-full border-2 px-3 py-2 hover:bg-white hover:text-black",
              i !== 0 && "border-accent text-accent-foreground"
            )}
          >
            <span className="border-secondary size-4 rounded-full border text-xs text-black">{i + 1}</span>
            <span className="text-sm">{label}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default StepperIndicator;
