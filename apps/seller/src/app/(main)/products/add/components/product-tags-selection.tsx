import { getAllTags } from "@/lib/api";
import { useQueryData } from "@repo/tanstack-query";
import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Badge, FormControl, FormField, FormItem, FormLabel, OptionSelect } from "@ui/index";

const ProductTagsSelection = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const selectedTags = form.getValues("tags") || [];
  const { data: tags = [], isFetching } = useQueryData(["tags"], () => getAllTags());

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
                disabled={isFetching}
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
