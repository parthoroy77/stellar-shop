import { Combobox, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@ui/index";
import { City, Country, ICountry, IState, State } from "country-state-city";
import { useCallback, useMemo, useState } from "react";

interface AddressIso {
  countryCode: string | null;
  stateCode: string | null;
}

interface AddressDetailsFormProps {
  form: any; // Replace `any` with your form type, e.g., `UseFormReturn<T>`
}

const AddressDetailsForm = ({ form }: AddressDetailsFormProps) => {
  const [addressIso, setAddressIso] = useState<AddressIso>({
    countryCode: null,
    stateCode: null,
  });

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (addressIso.countryCode ? State.getStatesOfCountry(addressIso.countryCode) : []),
    [addressIso.countryCode]
  );
  const cities = useMemo(
    () =>
      addressIso.countryCode && addressIso.stateCode
        ? City.getCitiesOfState(addressIso.countryCode, addressIso.stateCode)
        : [],
    [addressIso.countryCode, addressIso.stateCode]
  );

  const handleCountryChange = useCallback(
    (country: ICountry | undefined) => {
      form.setValue("state", "");
      form.setValue("city", "");
      setAddressIso(() => ({
        countryCode: country?.isoCode || null,
        stateCode: null,
      }));
    },
    [form]
  );

  const handleStateChange = useCallback(
    (state: IState | undefined) => {
      form.setValue("city", "");
      setAddressIso((prev) => ({
        ...prev,
        stateCode: state?.isoCode || null,
      }));
    },
    [form]
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="space-y-1">
        <h6 className="text-accent-foreground text-xs">Step 2</h6>
        <h3 className="text-lg font-medium text-black">Address Details</h3>
      </div>
      <hr />

      {/* Full Address Field */}
      <FormField
        control={form.control}
        name="fullAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Address</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Block 4, Street 9, Rd 2, East Dhaka"
                className="bg-accent/40 h-9 w-full border px-5 placeholder:text-xs"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Country, State, and City Fields */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-2">
        {/* Country Field */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Combobox
                  items={countries}
                  selectedItem={countries.find((x) => x.name === form.watch("country"))}
                  onValueChange={(item) => {
                    field.onChange(item?.name);
                    handleCountryChange(item);
                  }}
                  placeholder="Select Country"
                  getItemId={(country) => country?.name || ""}
                  itemRenderer={(item) => <span>{item?.name}</span>}
                  buttonVariants={{ variant: "accent", size: "sm" }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State Field */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/District</FormLabel>
              <FormControl>
                <Combobox
                  items={states}
                  selectedItem={states.find((x) => x.name === form.watch("state"))}
                  onValueChange={(item) => {
                    field.onChange(item?.name);
                    handleStateChange(item);
                  }}
                  placeholder="Select State"
                  getItemId={(state) => state?.name || ""}
                  itemRenderer={(item) => <span>{item?.name}</span>}
                  buttonVariants={{ variant: "accent", size: "sm" }}
                  disabled={states.length === 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City Field */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Combobox
                  items={cities}
                  selectedItem={cities.find((x) => x.name === form.watch("city"))}
                  onValueChange={(item) => {
                    field.onChange(item?.name);
                  }}
                  placeholder="Select City"
                  getItemId={(city) => city?.name || ""}
                  itemRenderer={(item) => <span>{item?.name}</span>}
                  buttonVariants={{ variant: "accent", size: "sm" }}
                  disabled={cities.length === 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Zip Code Field */}
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. 30232"
                  className="bg-accent/40 h-9 w-full border px-5 placeholder:text-xs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressDetailsForm;
