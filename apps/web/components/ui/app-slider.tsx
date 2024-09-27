import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@ui/lib/utils";
import React, { useState } from "react";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const AppSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, min, max, step, formatLabel, value, onValueChange, ...props }, ref) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = useState<number[]>(initialValue);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="bg-accent relative h-1 w-full grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-secondary absolute h-full" />
        </SliderPrimitive.Track>
        {localValues.map((value, i) => (
          <React.Fragment key={i}>
            <SliderPrimitive.Thumb
              title={value.toString()}
              className="border-primary bg-background focus-visible:ring-ring block h-3.5 w-3.5 cursor-pointer rounded-full border shadow transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

AppSlider.displayName = SliderPrimitive.Root.displayName;

export { AppSlider };
