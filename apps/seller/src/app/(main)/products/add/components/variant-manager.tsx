import { debounce } from "@repo/utils/functions";
import { useFieldArray, UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import {
  Badge,
  Button,
  FileWithPreview,
  FormField,
  FormItem,
  Input,
  ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/index";
import { useState } from "react";
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
  return (
    <div className="w-full rounded-md border">
      <ShadTable>
        <TableHeader>
          <TableRow className="text-accent-foreground *:font-medium">
            <TableHead className="w-fit">Image</TableHead>
            <TableHead className="w-fit max-w-[250px]">Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Attributes</TableHead>
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
                      <VariantImageManager onChange={field.onChange} />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className="w-fit max-w-[250px] truncate font-medium">{variant.variantName}</TableCell>
              <TableCell>
                <Input
                  defaultValue={variant.sku}
                  onChange={debounce(
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                      update(index, { ...variants[index]!, sku: e.target.value }),
                    500
                  )}
                  className="h-8 w-36 text-xs"
                  placeholder="Write Here"
                />
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={variant.stock}
                  onChange={debounce(
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                      update(index, { ...variants[index]!, stock: Number(e.target.value) }),
                    500
                  )}
                  className="h-8 w-36 text-xs"
                  placeholder="Write Here"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 text-xs">
                  {variant.variantAttributes?.map((attr) => (
                    <div key={attr.attributeId} className="flex items-center gap-2">
                      <span className="font-medium">{attr.name}:</span>
                      {attr.attributeValues.map((value) => (
                        <Badge key={value.id} variant={"accent"} className="rounded-md">
                          {value.name}
                        </Badge>
                      ))}
                    </div>
                  ))}
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

const VariantImageManager = ({ onChange }: { onChange: (value: File | null) => void }) => {
  const [image, setImage] = useState<FileWithPreview | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // get the file from event
    const file = event.target.files?.[0];

    if (file) {
      // create viewable object url
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setImage(fileWithPreview);
      onChange(file);
    } else {
      setImage(null);
      onChange(null); // Clear the form field if no file is selected
    }
  };

  return (
    <div
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border"
      onClick={() => document.getElementById("file-input")?.click()}
    >
      {image ? (
        <img src={image.preview} alt="Selected Image" className="h-full w-full rounded-md object-cover" />
      ) : (
        <GoFileMedia size={24} className="text-gray-500" />
      )}
      <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      {image && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setImage(null);
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
