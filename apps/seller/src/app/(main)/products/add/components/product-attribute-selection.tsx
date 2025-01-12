"use client";

import { getAllAttributesWithValues } from "@/actions/attribute.action";
import { useQueryData } from "@repo/tanstack-query";
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
import { useCallback, useMemo } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlinePlaylistAdd } from "react-icons/md";

interface ProductAttributeSelectionProps {
  form: UseFormReturn<TCreateProductValidation>;
}

const ProductAttributeSelection = ({ form }: ProductAttributeSelectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const { data: attributesData = [], isFetching } = useQueryData(["attributes-with-values"], () =>
    getAllAttributesWithValues()
  );

  const attributes = useMemo(() => attributesData?.map(({ attributeValues, ...rest }) => rest) || [], [attributesData]);

  const attributeValues = useMemo(
    () => attributesData?.flatMap(({ attributeValues }) => attributeValues || []) || [],
    [attributesData]
  );

  const selectedAttributes = form.watch("attributes")?.map((attr: any) => attr.attributeId) || [];

  const getAvailableAttributes = useCallback(
    (index: number) => {
      const currentAttributeId = form.watch(`attributes.${index}.attributeId`);
      return attributes.filter(
        (attr) => attr.id.toString() === currentAttributeId || !selectedAttributes.includes(attr.id.toString())
      );
    },
    [attributes, form, selectedAttributes]
  );

  const handleAddAttribute = useCallback(() => {
    append({ attributeId: "", attributeValues: [] });
  }, [append]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg">Product Attributes</h3>
          <p className="text-accent-foreground text-xs">
            If your product doesn't have any attributes, you can skip <strong>Product Attributes</strong> and{" "}
            <strong>Product Variant</strong> sections.
          </p>
        </div>
        <Button
          type="button"
          variant="accent"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleAddAttribute}
        >
          <span>Add Attribute</span>
          <MdOutlinePlaylistAdd size={15} aria-hidden="true" />
        </Button>
      </div>

      {fields.length > 0 && <hr className="my-4" />}

      {fields.map((field, index) => {
        const availableAttributes = getAvailableAttributes(index);

        return (
          <div key={field.id} className="mb-4 flex items-end gap-3">
            <FormField
              name={`attributes.${index}.attributeId`}
              control={form.control}
              render={({ field: attributeField }) => (
                <FormItem className="relative flex-1">
                  <FormLabel>Select Attribute</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selectedAttribute = attributes.find((x) => x.id.toString() === value);
                      form.setValue(`attributes.${index}.name`, selectedAttribute?.name || "");
                      attributeField.onChange(value);
                    }}
                    value={attributeField.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isFetching}>
                        <SelectValue placeholder="Select product attribute" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableAttributes.length > 0 ? (
                        availableAttributes.map((attr) => (
                          <SelectItem key={attr.id} value={attr.id.toString()}>
                            {attr.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="text-accent-foreground text-center text-sm">
                          <span>No Attributes Found</span>
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`attributes.${index}.attributeValues`}
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
                      selectedItems={attributeValues.filter((item) =>
                        (form.watch(`attributes.${index}.attributeValues`) as { id: string; name: string }[])?.some(
                          (attr) => attr.id === item.id.toString()
                        )
                      )}
                      onSelectionChange={(attributeValue) => {
                        if (Array.isArray(attributeValue)) {
                          valueField.onChange(
                            attributeValue.map((item) => ({ id: item.id.toString(), name: item.value }))
                          );
                        }
                      }}
                      searchPlaceholder="Search attribute values..."
                      itemRenderer={(attributeValue) => (
                        <div className="flex items-center gap-2 text-sm">
                          <span>{attributeValue.value}</span>
                        </div>
                      )}
                      multiSelect
                      isLoading={isFetching}
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
        );
      })}
    </div>
  );
};

export default ProductAttributeSelection;
