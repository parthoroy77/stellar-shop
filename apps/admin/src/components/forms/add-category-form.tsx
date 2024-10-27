import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@ui/index";
import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

const data: TCategory[] = [];

type TAddCategoryFormType = z.infer<typeof createCategoryValidationSchema>;

const AddCategoryForm = () => {
  const form: UseFormReturn<TAddCategoryFormType> = useForm<TAddCategoryFormType>({
    resolver: zodResolver(createCategoryValidationSchema),
  });
  const isCollectionLevel = useMemo(() => form.watch("level") === CategoryLevels.COLLECTION, [form.watch("level")]);

  const onSubmit = async (data: TAddCategoryFormType) => {
    console.log(data);
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
                  name="categoryName"
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
              <ImageDropzone onFilesChange={(files) => field.onChange(files)} multiple={false} />
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
        {form.watch("level") && isCollectionLevel !== true && (
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-accent-foreground text-xs">Parent Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((x, i) => (
                      <SelectItem value={x.id.toString()} key={i}>
                        <div className="flex items-center gap-2">
                          <img
                            className="size-7"
                            src={
                              "https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/product-1-CnD-btSp.png"
                            }
                            alt={`Image of ${x.categoryName} Category`}
                          />
                          <span>{x.categoryName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

        <Button type="submit" size={"sm"} variant={"outline"}>
          Add Category
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
