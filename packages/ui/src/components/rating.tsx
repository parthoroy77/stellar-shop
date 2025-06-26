"use client";
import { RiStarFill } from "@remixicon/react";
import { FC, useEffect, useId, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";

interface Props {
  defaultValue?: string;
  onChange: (value: number) => void;
  size?: number;
}
export const Rating: FC<Props> = ({ defaultValue, onChange, size }) => {
  const id = useId();
  const [hoverRating, setHoverRating] = useState("");
  const [currentRating, setCurrentRating] = useState(defaultValue || "");

  useEffect(() => {
    onChange(+currentRating);
  }, [currentRating]);
  return (
    <fieldset className="space-y-4">
      <RadioGroup className="inline-flex gap-0" onValueChange={setCurrentRating}>
        {["1", "2", "3", "4", "5"].map((value) => (
          <label
            key={value}
            className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px] group relative cursor-pointer rounded p-0.5 outline-none"
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating("")}
          >
            <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
            <RiStarFill
              size={size || 24}
              className={`transition-all ${
                (hoverRating || currentRating) >= value ? "text-amber-500" : "text-input"
              } group-hover:scale-110`}
            />
            <span className="sr-only">
              {value} star{value === "1" ? "" : "s"}
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
};
