import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Badge, FormControl, FormField, FormItem, FormLabel, OptionSelect } from "@ui/index";
const tags = [
  { id: 1, name: "summer" },
  { id: 2, name: "hotsales" },
  { id: 3, name: "limited edition" },
  { id: 4, name: "bestseller" },
  { id: 5, name: "new arrival" },
  { id: 6, name: "clearance" },
  { id: 7, name: "exclusive" },
  { id: 8, name: "discounted" },
  { id: 9, name: "black friday" },
  { id: 10, name: "holiday special" },
  { id: 11, name: "flash sale" },
  { id: 12, name: "limited stock" },
  { id: 13, name: "bundle offer" },
  { id: 14, name: "pre-order" },
  { id: 15, name: "best value" },
  { id: 16, name: "top rated" },
  { id: 17, name: "holiday gift" },
  { id: 18, name: "exclusive deal" },
];
const ProductTagsSelection = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const selectedTags = form.getValues("tags") || [];

  return (
    <>
      <FormField
        name="tags"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Product Tags</FormLabel>
            <FormControl>
              <OptionSelect
                customQuerySearch={false}
                items={tags}
                selectedItems={tags.filter((tag) => form.watch("tags")?.includes(tag.id.toString()))}
                onSelectionChange={(tags) => {
                  if (Array.isArray(tags)) {
                    field.onChange(tags.map((tag) => tag.id.toString()));
                  }
                }}
                itemRenderer={(tag) => (
                  <div className="text-primary-foreground font-medium capitalize">
                    <span>{tag.name}</span>
                  </div>
                )}
                getItemId={(tag) => tag.id}
                multiSelect
              />
            </FormControl>
          </FormItem>
        )}
      />
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags
            .filter((tag) => selectedTags.some((x) => x === tag.id.toString()))
            .map((el) => (
              <Badge variant={"accent"} className="rounded-md capitalize" key={el.id}>
                {el.name}
              </Badge>
            ))}
        </div>
      )}
    </>
  );
};

export default ProductTagsSelection;
