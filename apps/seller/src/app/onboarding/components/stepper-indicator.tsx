import { Button } from "@ui/index";
import { cn } from "@ui/lib/utils";

const StepperIndicator = () => {
  return (
    <ul className="mx-auto flex justify-between">
      {Array.from({ length: 3 }).map((_x, i) => (
        <li key={i}>
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
            <span className="text-sm">Store Information</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default StepperIndicator;
