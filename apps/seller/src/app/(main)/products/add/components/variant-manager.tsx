import { debounce } from "@repo/utils/functions";
import { useFieldArray, UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import {
  Badge,
  Button,
  FileWithPreview,
  FormControl,
  FormField,
  FormItem,
  Input,
  ShadTable,
  Switch,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/index";
import { GoFileMedia, GoTrash } from "react-icons/go";
import { LuX } from "react-icons/lu";

const VariantManager = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const { fields: variants, remove, update } = useFieldArray({ name: "variants", control: form.control });

  const attributes = form.watch("attributes") || [];
  const removeVariant = (index: number) => {
    // Step 1: Filter out the variant to be removed
    const updatedVariants = variants.filter((_, idx) => idx !== index);

    // Step 2: Identify attributes still in use
    const usedAttributes = updatedVariants.reduce<Record<string, Set<string>>>((acc, variant) => {
      variant.variantAttributes!.forEach((attr) => {
        if (!acc[attr.name!]) {
          acc[attr.name!] = new Set();
        }
        attr.attributeValues.forEach((value) => acc[attr.name!]!.add(value.name!));
      });
      return acc;
    }, {});

    // Step 3: Filter out attributes that are no longer referenced
    const updatedAttributes = attributes.filter((attribute) => {
      const usedValues = usedAttributes[attribute.name!];
      if (!usedValues) return false;

      // Retain only values still in use
      attribute.attributeValues = attribute.attributeValues.filter((value) => usedValues.has(value.name!));

      return attribute.attributeValues.length > 0; // Remove attribute if no values are left
    });

    form.setValue("attributes", updatedAttributes);
    remove(index);
  };

  const handleVariantUpdate = (index: number, field: keyof (typeof variants)[number], value: any) => {
    // Get the latest variant state using `form.watch`
    const currentVariant = form.watch(`variants.${index}`);
    // Update the specific field while preserving all other properties
    update(index, { ...currentVariant, [field]: value });
  };

  const handleDefaultVariant = (index: number) => {
    const updatedVariants = variants.map((variant, idx) => ({ ...variant, isDefault: index === idx }));
    form.setValue("variants", updatedVariants, { shouldDirty: true, shouldValidate: true });
  };
  return (
    <div className="w-full rounded-md border">
      <ShadTable>
        <TableHeader>
          <TableRow className="text-accent-foreground *:font-medium">
            <TableHead className="w-fit">Image</TableHead>
            <TableHead className="w-fit max-w-[250px]">Name</TableHead>
            <TableHead>Attributes</TableHead>
            <TableHead>Price of Variant</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="truncate">Default Variant</TableHead>
            <TableHead className="w-fit text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant, index) => (
            <TableRow key={index} className="*:py-2">
              <TableCell>
                <FormField
                  control={form.control}
                  name={`variants.${index}.variantImage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <VariantImageManager
                          variantImage={(field.value as unknown as FileWithPreview) ?? null}
                          index={index}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className="w-fit max-w-[250px] truncate font-medium">{variant.variantName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3 text-xs">
                  {variant.variantAttributes?.map((attr) => (
                    <div key={attr.attributeId} className="flex items-center gap-2">
                      <span className="font-medium">{attr.name}:</span>
                      {attr.attributeValues.map((value) => (
                        <Badge key={value.id} variant={"accent"} className="truncate rounded-md">
                          {value.name}
                        </Badge>
                      ))}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={variant.price}
                  onChange={debounce(
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                      handleVariantUpdate(index, "price", Number(e.target.value)),
                    500
                  )}
                  type="number"
                  className="h-8 w-36 text-xs"
                  placeholder="Price of Each Variant"
                />
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={variant.stock}
                  onChange={debounce(
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                      handleVariantUpdate(index, "stock", Number(e.target.value)),
                    500
                  )}
                  type="number"
                  className="h-8 w-36 text-xs"
                  placeholder="Write Here"
                />
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={variant.sku}
                  onChange={debounce(
                    (e: React.ChangeEvent<HTMLInputElement>) => handleVariantUpdate(index, "sku", e.target.value),
                    500
                  )}
                  className="h-8 w-36 text-xs"
                  placeholder="Write Here"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Switch
                    checked={variant.isDefault}
                    onCheckedChange={(checked) => checked && handleDefaultVariant(index)}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <Button
                    type="button"
                    onClick={() => removeVariant(index)}
                    variant={"destructive"}
                    className="h-fit w-fit p-2"
                  >
                    <GoTrash size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadTable>
    </div>
  );
};

const VariantImageManager = ({
  onChange,
  index,
  variantImage,
}: {
  onChange: (value: File | null) => void;
  index: number;
  variantImage: FileWithPreview | null;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      onChange(fileWithPreview);
    } else {
      onChange(null); // Clear the form field if no file is selected
    }
  };

  return (
    <div
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border"
      onClick={() => document.getElementById(`file-input-${index}`)?.click()}
    >
      {variantImage ? (
        <img src={variantImage.preview} alt="Selected Image" className="h-full w-full rounded-md object-cover" />
      ) : (
        <GoFileMedia size={24} className="text-gray-500" />
      )}
      <input id={`file-input-${index}`} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      {variantImage && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(null); // Clear the form field when the image is removed
          }}
          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
          type="button"
        >
          <LuX className="size-3" />
        </button>
      )}
    </div>
  );
};

export default VariantManager;
