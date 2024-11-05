"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError, useCreateCategoryMutation, useGetAllParentCategoriesQuery } from "@repo/redux";
import { CategoryLevels, TCategory } from "@repo/utils/types";
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
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TAddCategoryFormType = z.infer<typeof createCategoryValidationSchema>;

export default function AddCategoryForm({ close }: { close: () => void }) {
  const [searchTerms, setSearchTerms] = useState("");
  const form = useForm<TAddCategoryFormType>({
    resolver: zodResolver(createCategoryValidationSchema),
  });

  const selectedLevel = form.watch("level");
  const isCollectionLevel = selectedLevel === CategoryLevels.COLLECTION;

  const query = useMemo(() => {
    const queryParams = new URLSearchParams();
    if (searchTerms.length > 3) queryParams.append("query", searchTerms);
    if (selectedLevel && selectedLevel !== CategoryLevels.COLLECTION) {
      queryParams.append("level", selectedLevel === CategoryLevels.CATEGORY ? "COLLECTION" : "COLLECTION,CATEGORY");
    }
    return queryParams.toString();
  }, [searchTerms, selectedLevel]);

  const { data, isFetching: isParentCatFetching } = useGetAllParentCategoriesQuery(query, {
    skip: isCollectionLevel || !query,
  });

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

  const parentCategories = (data?.data as TCategory[]) || [];

  const onSubmit = async (data: TAddCategoryFormType) => {
    const toastId = toast.loading("Creating category...", { duration: 2000 });
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await createCategory(formData).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
        form.reset();
        close();
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };

  useEffect(() => {
    setSearchTerms("");
  }, [selectedLevel]);

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
                  {Object.values(CategoryLevels).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase().replace("_", " ")}
                    </SelectItem>
                  ))}
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
                    if (!Array.isArray(categories)) {
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
}
