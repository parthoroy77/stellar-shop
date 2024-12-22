"use client";

import { useFieldArray, UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  OptionSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/index";
import { useCallback } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlinePlaylistAdd } from "react-icons/md";

// These would typically come from an API in a real application
const attributeValues = [
  { id: 1, value: "Red", attributeId: 1 },
  { id: 2, value: "Blue", attributeId: 1 },
  { id: 3, value: "Black", attributeId: 1 },
  { id: 4, value: "S", attributeId: 2 },
  { id: 5, value: "M", attributeId: 2 },
  { id: 6, value: "L", attributeId: 2 },
  { id: 7, value: "XL", attributeId: 2 },
];

const attributes = [
  { id: 1, name: "Color" },
  { id: 2, name: "Size" },
];

interface ProductAttributeSelectionProps {
  form: UseFormReturn<TCreateProductValidation>;
}

const ProductAttributeSelection = ({ form }: ProductAttributeSelectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const handleAddAttribute = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      append({ attributeId: "", attributeValueId: [] });
    },
    [append]
  );

  const selectedAttributes = form.watch("attributes")?.map((attr: any) => attr.attributeId) || [];

  const getAvailableAttributes = useCallback(
    (index: number) => {
      const currentAttributeId = form.watch(`attributes.${index}.attributeId`);
      return attributes.filter(
        (attr) => attr.id.toString() === currentAttributeId || !selectedAttributes.includes(attr.id.toString())
      );
    },
    [form, selectedAttributes]
  );
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg">Product Attributes</h3>
          <p className="text-accent-foreground text-sm">
            If your product doesn't have any attributes you can skip <strong>Product Attributes</strong> and{" "}
            <strong>Product Variant</strong> Section
          </p>
        </div>
        <Button variant="accent" size="sm" className="flex items-center gap-2" onClick={handleAddAttribute}>
          <span>Add Attribute</span>
          <MdOutlinePlaylistAdd size={15} aria-hidden="true" />
        </Button>
      </div>
      <hr className="my-4" />
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 flex items-end gap-3">
          <FormField
            name={`attributes.${index}.attributeId`}
            control={form.control}
            render={({ field: attributeField }) => (
              <FormItem className="relative flex-1">
                <FormLabel>Select Attribute</FormLabel>
                <Select onValueChange={attributeField.onChange} value={attributeField.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product attribute" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getAvailableAttributes(index).map((attr) => (
                      <SelectItem key={attr.id} value={attr.id.toString()}>
                        {attr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`attributes.${index}.attributeValueId`}
            control={form.control}
            render={({ field: valueField }) => (
              <FormItem className="relative flex-1">
                <FormLabel>Select Attribute Value</FormLabel>
                <FormControl>
                  <OptionSelect
                    customQuerySearch={false}
                    items={attributeValues.filter(
                      (attrVal) => attrVal.attributeId.toString() === form.watch(`attributes.${index}.attributeId`)
                    )}
                    selectedItems={attributeValues.filter((x) =>
                      (form.watch(`attributes.${index}.attributeValueId`) as string[])?.includes(x.id.toString())
                    )}
                    onSelectionChange={(attributeValue) => {
                      if (Array.isArray(attributeValue)) {
                        valueField.onChange(attributeValue.map((item) => item.id.toString()));
                      }
                    }}
                    searchPlaceholder="Search attribute values..."
                    itemRenderer={(attributeValue) => (
                      <div className="flex items-center gap-2 text-sm">
                        <span>{attributeValue.value}</span>
                      </div>
                    )}
                    multiSelect={true}
                    getItemId={(attributeValue) => attributeValue.id}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
            className="h-9 w-9"
            aria-label="Remove attribute"
          >
            <CiCircleRemove size={19} aria-hidden="true" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductAttributeSelection;
