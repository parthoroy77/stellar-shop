import { getAllBrands } from "@/lib/api/brands";
import { useQueryData } from "@repo/tanstack-query";
import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Label, OptionSelect } from "@ui/index";
import { LuInfo, LuPlus } from "react-icons/lu";

const ProductBrandSelection = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const { data: brands = [], isFetching } = useQueryData(["brands"], () => getAllBrands());
  return (
    <div className="grid grid-cols-3 items-center gap-3">
      <FormField
        name="brandId"
        control={form.control}
        render={({ field }) => (
          <FormItem className="relative col-span-2 w-full">
            <div className="flex items-center gap-5">
              <FormLabel>Select Product Brand</FormLabel>
              <div className="text-accent-foreground flex space-x-1 text-xs font-medium">
                <LuInfo color="gray" size={14} />
                <p>Select a brand. If none, choose 'No Brand' or add your own.</p>
              </div>
            </div>
            <FormControl>
              <div className="flex items-center gap-3">
                <OptionSelect
                  customQuerySearch={false}
                  items={brands || []}
                  selectedItems={brands.filter((brand) => brand.id.toString() === field.value) || []}
                  onSelectionChange={(brand) => {
                    if (!Array.isArray(brand)) {
                      field.onChange(brand.id.toString());
                    }
                  }}
                  searchPlaceholder="Search Collections..."
                  itemRenderer={(brand) => (
                    <div className="flex items-center gap-2 text-xs">
                      <img className="size-6 rounded-md" src={brand.file.fileUrl} alt={brand.name} />
                      {brand.name}
                    </div>
                  )}
                  isLoading={isFetching}
                  multiSelect={false}
                  getItemId={(brand) => brand.id}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-3">
        <Label>Add Your Own Brand</Label>
        {/* TODO: On add button open a modal to create a brand */}
        <Button size={"sm"} variant={"outline"} className="flex items-center gap-2">
          <LuPlus size={17} />
          <span>Add</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductBrandSelection;
