"use client";

import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Button, FormControl, FormField, FormItem, FormLabel, Input } from "@ui/index";
import { useEffect, useState } from "react";

const ProductInventoryDetails = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const [showState, setShowState] = useState(false);

  // Form values and derived states
  const variants = form.watch("variants") || [];
  const attributes = form.getValues("attributes") || [];
  const hasAttributes = attributes.some((attr) => attr.attributeId && attr.attributeValues.length > 0);
  const totalStock = variants.reduce((acc, variant) => acc + (variant.stock || 0), 0);
  const hasVariants = variants.length > 0 && hasAttributes;

  useEffect(() => {
    setShowState(false);
  }, [hasVariants, totalStock]);

  // Helper components for messages
  const MessageBox = ({ type, message }: { type: "success" | "warning"; message: string }) => (
    <div
      className={`rounded-md p-4 text-center ${
        type === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );

  const renderStockDetails = () => {
    if (hasAttributes && !hasVariants) {
      return (
        <MessageBox
          type="warning"
          message="Looks like you selected Attributes. Please generate variants and update them."
        />
      );
    }

    if (hasVariants) {
      return isNaN(totalStock) || totalStock === 0 ? (
        <MessageBox
          type="warning"
          message="Oops! It looks like your variants need some attention. Please update the stock quantities in the variants section above."
        />
      ) : (
        <MessageBox
          type="success"
          message={`Great job! Your total product stock quantity is ${totalStock}. You're all set to start selling!`}
        />
      );
    }

    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Product Initial Stock</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="e.g. 100"
                  className="focus:border-secondary h-10 rounded-md px-5 placeholder:text-xs focus:border"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.watch("stock") > 0 && (
          <MessageBox type="success" message="You've set your initial stock. Your inventory setup is completed!" />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg">Product Inventory</h3>
          <p className="text-accent-foreground text-xs">
            {variants.length > 0
              ? "Your variant stocks are being tracked."
              : "Add initial stock for your base product."}
          </p>
        </div>
        <Button
          onClick={() => setShowState((prev) => !prev)}
          variant="accent"
          type="button"
          size="sm"
          className="flex items-center gap-2"
        >
          Get Stock Details
        </Button>
      </div>

      {showState && (
        <>
          <hr />
          {renderStockDetails()}
        </>
      )}
    </div>
  );
};

export default ProductInventoryDetails;
