"use client";
import { cn } from "@ui/lib/utils";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

type PhoneDisplayProps = {
  value: string;
  className?: string;
};

const PhoneDisplay: React.FC<PhoneDisplayProps> = ({ value, className }) => {
  const phoneNumber = React.useMemo(() => {
    try {
      return RPNInput.parsePhoneNumber(value);
    } catch (error) {
      console.error("Error parsing phone number:", error);
      return null;
    }
  }, [value]);

  const country = phoneNumber?.country;
  const formattedNumber = phoneNumber?.formatInternational() || value;

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {country && <FlagComponent country={country} countryName={country} />}
      <span>{formattedNumber}</span>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-3.5 w-5 overflow-hidden rounded-sm" aria-label={`Flag of ${countryName}`}>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneDisplay };
