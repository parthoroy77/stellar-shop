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
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageDropzone,
  Input,
  Label,
  OptionSelect,
  Textarea,
} from "@ui/index";
import { useState, useTransition } from "react";
import { LuInfo, LuPlus } from "react-icons/lu";
import { TbBrandAirtable } from "react-icons/tb";
import { toast } from "sonner";

const ProductBrandSelection = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const { data: brands = [], isFetching } = useQueryData(["brands"], () => getAllBrands());
  const handleSetNewBrand = (id: string) => {
    form.setValue("brandId", id);
  };
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
        <AddBrandPopup handleSetNewBrand={handleSetNewBrand} />
      </div>
    </div>
  );
};

const AddBrandPopup = ({ handleSetNewBrand }: { handleSetNewBrand: (id: string) => void }) => {
  const [open, setOpen] = useState(false);
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
          handleSetNewBrand(result.data.id.toString());
          setOpen(false);

          // Invalidate and refetch the brands query
          queryClient.invalidateQueries({ queryKey: ["brands"] });
        }
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"accent"} className="flex items-center gap-2">
          <LuPlus size={17} />
          <span>Add</span>
        </Button>
      </DialogTrigger>
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
