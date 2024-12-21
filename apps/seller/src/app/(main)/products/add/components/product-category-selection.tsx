import { getAllCategories } from "@/lib/api/categories";
import { useQueryData } from "@repo/tanstack-query";
import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { FormField, FormItem, FormLabel, FormMessage, OptionSelect } from "@ui/index";

const ProductCategorySelection = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const collectionId = form.watch("category.collectionId");
  const categoryId = form.watch("category.categoryId");

  // Fetch collections
  const { data: collectionCategories = [], isFetching: isGrandParentCatFetching } = useQueryData(
    ["grand-parent-categories"],
    () => getAllCategories("level=COLLECTION")
  );

  // Fetch categories (dependent on `collectionId`)
  const { data: parentCategories = [], isFetching: isParentCatFetching } = useQueryData(
    ["parent-categories", collectionId],
    () => getAllCategories(`level=CATEGORY&parentId=${collectionId}`),
    { enabled: !!collectionId } // Fetch only if `collectionId` exists
  );

  // Fetch subcategories (dependent on `categoryId`)
  const { data: subCategories = [], isFetching: isSubCatFetching } = useQueryData(
    ["sub-categories", categoryId],
    () => getAllCategories(`level=SUB_CATEGORY&parentId=${categoryId}`),
    { enabled: !!categoryId } // Fetch only if `categoryId` exists
  );

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Collection Selection */}
      <FormField
        control={form.control}
        name="category.collectionId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-accent-foreground text-xs">Select Collection</FormLabel>
            <OptionSelect
              customQuerySearch={false}
              items={collectionCategories}
              selectedItems={collectionCategories.filter((x) => x.id.toString() === field.value) || []}
              onSelectionChange={(category) => {
                if (!Array.isArray(category)) {
                  field.onChange(category.id.toString());
                  form.resetField("category.categoryId"); // Reset dependent field
                  form.resetField("category.subCategories"); // Reset subcategories field
                }
              }}
              searchPlaceholder="Search Collections..."
              itemRenderer={(cat) => (
                <div className="flex items-center gap-2 text-xs">
                  <img className="size-6 rounded-md" src={cat.images[0]?.file.fileUrl} alt={cat.categoryName} />
                  {cat.categoryName}
                </div>
              )}
              isLoading={isGrandParentCatFetching}
              multiSelect={false}
              getItemId={(cat) => cat.id}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Category Selection */}
      <FormField
        control={form.control}
        name="category.categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-accent-foreground text-xs">Select Category</FormLabel>
            <OptionSelect
              customQuerySearch={false}
              items={parentCategories}
              selectedItems={parentCategories.filter((x) => x.id.toString() === field.value) || []}
              onSelectionChange={(category) => {
                if (!Array.isArray(category)) {
                  field.onChange(category.id.toString());
                  form.resetField("category.subCategories"); // Reset subcategories field
                }
              }}
              searchPlaceholder="Search Categories..."
              itemRenderer={(cat) => (
                <div className="flex items-center gap-2 text-xs">
                  <img className="size-6 rounded-md" src={cat.images[0]?.file.fileUrl} alt={cat.categoryName} />
                  {cat.categoryName}
                </div>
              )}
              isLoading={isParentCatFetching}
              multiSelect={false}
              getItemId={(cat) => cat.id}
              disabled={!collectionId}
              disabledWarning="Select Collection First!"
            />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Subcategory Selection */}
      <FormField
        control={form.control}
        name="category.subCategories"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-accent-foreground text-xs">Select Sub Category</FormLabel>
            <OptionSelect
              customQuerySearch={false}
              items={subCategories}
              selectedItems={subCategories.filter((x) => field.value?.includes(x.id.toString())) || []}
              onSelectionChange={(categories) => {
                if (Array.isArray(categories)) {
                  field.onChange(categories.map((cat) => cat.id.toString()));
                }
              }}
              searchPlaceholder="Search Subcategories..."
              itemRenderer={(cat) => (
                <div className="flex items-center gap-2 text-xs">
                  <img className="size-6 rounded-md" src={cat.images[0]?.file.fileUrl} alt={cat.categoryName} />
                  {cat.categoryName}
                </div>
              )}
              isLoading={isSubCatFetching}
              multiSelect={true}
              getItemId={(cat) => cat.id}
              disabled={!categoryId}
              disabledWarning="Select Category First!"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductCategorySelection;
