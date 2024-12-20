import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/index";
import { LuInfo, LuPlus } from "react-icons/lu";

const ProductBrandSelection = ({ form }: { form: any }) => {
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select brand of you product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="232">No Brand</SelectItem>
                  </SelectContent>
                </Select>
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
