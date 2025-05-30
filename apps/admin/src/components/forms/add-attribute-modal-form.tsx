import { handleApiError, useAddAttributeMutation } from "@repo/redux";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { attributeValidationSchema, TAttributeValidationSchema } from "@repo/utils/validations";
import {
  AppButton,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@ui/index";
import { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { TbBrandAirtable } from "react-icons/tb";
import { toast } from "sonner";

const AddAttributeModalForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TAttributeValidationSchema>({
    resolver: zodResolver(attributeValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      values: [""],
    },
  });
  const [mutation, { isLoading }] = useAddAttributeMutation();
  const values = form.watch("values");

  // Function to add a new value
  const addValue = () => {
    form.setValue("values", [...values, ""]);
  };

  // Function to remove a value
  const removeValue = (index: number) => {
    if (values.length > 1) {
      const newValues = values.filter((_, i) => i !== index);
      form.setValue("values", newValues);
    }
  };

  const onSubmit = async (data: TAttributeValidationSchema) => {
    const toastId = toast.loading("Sending request to process", { duration: 3000 });
    try {
      const response = await mutation({ ...data, values: data.values.filter((x) => x.trim() !== "") }).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      const appError = handleApiError(error);
      toast.error(appError.message, { id: toastId });
    }
  };

  console.log(form.watch());
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          Add Attribute <LuPlus size={17} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TbBrandAirtable size={17} />
            Add Brand
          </DialogTitle>
          <DialogDescription>Which will help to create product variants!</DialogDescription>
        </DialogHeader>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Name Field */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Color, Size, Material"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe this attribute"
                      className="bg-accent/40 focus:border-secondary min-h-16 w-full resize-none rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attribute Values */}
            <div className="space-y-2">
              <FormLabel>Attribute Values</FormLabel>
              <div className="space-y-3">
                {values.map((_value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      name={`values.${index}`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mb-0 flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Value ${index + 1} (e.g. Small, Red, Cotton)`}
                              className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {values.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeValue(index)}
                        className="h-10 w-10 flex-shrink-0"
                      >
                        <LuTrash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Value Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addValue}
                className="mt-2 flex items-center gap-1"
              >
                <LuPlus size={14} /> Add Value
              </Button>
            </div>

            <DialogFooter>
              <AppButton loading={isLoading} type="submit" disabled={isLoading}>
                Add attribute
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttributeModalForm;
