import { createBrand } from "@/actions/brand.action";
import { getAllBrands } from "@/lib/api/brands";
import { useQueryClient, useQueryData } from "@repo/tanstack-query";
import { useForm, UseFormReturn } from "@repo/utils/hook-form";
import { TCreateBrandValidation, TCreateProductValidation } from "@repo/utils/validations";
import {
  AppButton,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageDropzone,
  Input,
  OptionSelect,
  Textarea,
} from "@ui/index";
import { useState, useTransition } from "react";
import { LuPlus } from "react-icons/lu";
import { TbBrandAirtable } from "react-icons/tb";
import { toast } from "sonner";

const ProductBrandSelection = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const [open, setOpen] = useState(false);
  const { data: brands = [], isFetching } = useQueryData(["brands"], () => getAllBrands());
  const handleSetNewBrand = (id: string) => {
    form.setValue("brandId", id);
  };
  return (
    <>
      <FormField
        name="brandId"
        control={form.control}
        render={({ field }) => (
          <FormItem className="relative col-span-2 w-full">
            <div className="flex items-center justify-between gap-5">
              <FormLabel>Select Product Brand</FormLabel>
              <Button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                variant={"accent"}
                size={"sm"}
                className="h-fit px-6 py-1.5"
              >
                <LuPlus className="mr-2" /> Add
              </Button>
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
            <FormDescription>Select a brand. If none, choose 'No Brand' or add your own.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <AddBrandPopup onClose={() => setOpen(false)} open={open} handleSetNewBrand={handleSetNewBrand} />
    </>
  );
};

const AddBrandPopup = ({
  handleSetNewBrand,
  open,
  onClose,
}: {
  handleSetNewBrand: (id: string) => void;
  open: boolean;
  onClose: () => void;
}) => {
  const form = useForm<TCreateBrandValidation>({
    defaultValues: {
      name: "",
      description: "",
      logo: null,
    },
  });
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const onSubmit = (data: TCreateBrandValidation) => {
    const toastId = toast.loading("Sending request to upload!", { duration: 2000 });

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    startTransition(async () => {
      const result = await createBrand(formData);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        if (result.success && result.data) {
          // set updated data
          handleSetNewBrand(result.data.id.toString());

          // close the modal
          onClose();

          // Invalidate and refetch the brands query
          queryClient.invalidateQueries({ queryKey: ["brands"] });

          // reset form
          form.reset();
        }
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TbBrandAirtable size={17} />
            Add Brand
          </DialogTitle>
          <DialogDescription>Add your own brand and make difference!</DialogDescription>
        </DialogHeader>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Brand</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Amazon LTD"
                      type="text"
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your brand logo</FormLabel>
                  <ImageDropzone
                    onFilesChange={(files) => {
                      field.onChange(files);
                    }}
                    multiple={false}
                    containerClassName="border-secondary"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write here."
                      className="bg-accent/40 focus:border-secondary h-10 w-full rounded-md placeholder:text-xs focus:border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <AppButton loading={isPending} type="submit" size={"sm"} variant={"secondary"} className="border">
                Upload Brand
              </AppButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductBrandSelection;
