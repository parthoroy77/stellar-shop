import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError, useCreateCategoryMutation, useGetAllParentCategoriesQuery } from "@repo/redux";
import { CategoryLevels, IApiResponse, TCategory } from "@repo/utils/types";
import { createCategoryValidationSchema, z } from "@repo/utils/validations";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageDropzone,
  Input,
  OptionSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@ui/index";
import { useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

type TAddCategoryFormType = z.infer<typeof createCategoryValidationSchema>;

const AddCategoryForm = () => {
  // States
  const [searchTerms, setSearchTerms] = useState("");
  // Form
  const form: UseFormReturn<TAddCategoryFormType> = useForm<TAddCategoryFormType>({
    resolver: zodResolver(createCategoryValidationSchema),
  });
  const selectedLevel = form.watch("level");
  const isCollectionLevel = selectedLevel === CategoryLevels.COLLECTION;

  // Query memoization
  const query = useMemo(() => {
    let queryString = "";
    if (searchTerms.length > 3) queryString += `&query=${searchTerms}`;
    if (selectedLevel) queryString += `&level=${selectedLevel}`;
    return queryString;
  }, [searchTerms, selectedLevel]);

  // Data fetching
  const { data, isFetching: isParentCatFetching } = useGetAllParentCategoriesQuery(query, {
    skip: isCollectionLevel || !query,
  });

  // Mutations
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

  const parentCategories = (data?.data as TCategory[]) || [];
  // Form submission handler
  const onSubmit = async (data: TAddCategoryFormType) => {
    const toastId = toast.loading("Creating category...", { duration: 2000 });
    const { attachment, ...rest } = data;
    delete attachment.preview;
    const formData = new FormData();
    Object.entries({ attachment, ...rest }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response: IApiResponse<TCategory> = await createCategory(formData).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-accent-foreground text-xs">Category Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Fashion"
                  type="text"
                  className="focus:border-secondary h-9 w-full border px-5 placeholder:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <ImageDropzone
                onFilesChange={(files) => {
                  field.onChange(files);
                }}
                multiple={false}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-accent-foreground text-xs">Category Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select category level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={CategoryLevels.COLLECTION}>Collection</SelectItem>
                  <SelectItem value={CategoryLevels.CATEGORY}>Category</SelectItem>
                  <SelectItem value={CategoryLevels.SUB_CATEGORY}>Sub Category</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedLevel && !isCollectionLevel && (
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-accent-foreground text-xs">Parent Category</FormLabel>
                <OptionSelect
                  items={parentCategories}
                  selectedItems={parentCategories.filter((x) => x.id.toString() === form.watch("parentId")) || []}
                  onSelectionChange={(categories) => {
                    if (Array.isArray(categories)) {
                      return;
                    } else {
                      field.onChange(categories.id.toString());
                    }
                  }}
                  searchPlaceholder="Search Categories..."
                  itemRenderer={(cat) => (
                    <div className="flex items-center gap-2 text-xs">
                      <img className="size-6 rounded-md" src={cat.images[0].file.fileUrl} alt={cat.categoryName} />
                      {cat.categoryName}
                    </div>
                  )}
                  isLoading={isParentCatFetching}
                  onSearch={setSearchTerms}
                  multiSelect={false}
                  getItemId={(cat) => cat.id}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-accent-foreground text-xs">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Category Description"
                  className="resize-none placeholder:text-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isCreating || isParentCatFetching} type="submit" size="sm" variant="outline">
          Add Category
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
