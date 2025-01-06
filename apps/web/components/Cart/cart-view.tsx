"use client";
import { groupCartItemsBySeller, TGroupItem } from "@/utils/group-cart-items-by-seller";
import { TCartItem } from "@repo/utils/types";
import { Checkbox } from "@ui/index";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import CartActions from "./cart-actions";
import CartItem from "./cart-item";
import CartSummary from "./cart-summary";

const CartView = ({ cartItems }: { cartItems: TCartItem[] }) => {
  // Use a Set for selected cart items for efficient lookup
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Set<number>>(new Set());

  // Memoize grouped cart items
  const groupedItems = useMemo(() => groupCartItemsBySeller(cartItems), [cartItems]);

  // Check if all items are selected
  const allSelected = useMemo(
    () => cartItems.every((item) => selectedCartItemIds.has(item.id)),
    [cartItems, selectedCartItemIds]
  );

  // Handler toggle select all
  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedCartItemIds(new Set(cartItems.map((item) => item.id)));
      } else {
        setSelectedCartItemIds(new Set());
      }
    },
    [cartItems]
  );

  // Handle toggle all products in a seller
  const toggleSellerItems = useCallback((checked: boolean, groupItem: TGroupItem) => {
    setSelectedCartItemIds((prev) => {
      const updatedSet = new Set(prev);
      groupItem.items.forEach((item) => {
        if (checked) {
          updatedSet.add(item.id);
        } else {
          updatedSet.delete(item.id);
        }
      });
      return updatedSet;
    });
  }, []);

  // Handle toggle one item
  const toggleItemSelection = useCallback((itemId: number, isSelected: boolean) => {
    setSelectedCartItemIds((prev) => {
      const updatedSet = new Set(prev);
      if (isSelected) {
        updatedSet.add(itemId);
      } else {
        updatedSet.delete(itemId);
      }
      return updatedSet;
    });
  }, []);

  // Check all product of a seller are selected
  const isSellerFullySelected = useCallback(
    (sellerId: number) => {
      const shopItems = groupedItems[sellerId]?.items || [];
      return shopItems.every((item) => selectedCartItemIds.has(item.id));
    },
    [groupedItems, selectedCartItemIds]
  );

  return (
    <div className="flex w-full flex-col gap-5 *:rounded-md lg:flex-row">
      <div className="h-fit space-y-3 lg:w-[75%]">
        <CartActions handleSelectAll={toggleSelectAll} allSelected={allSelected} />
        {Object.values(groupedItems).map((groupedItem, idx) => (
          <div key={idx} className="divide-y-2 rounded-md border-2 *:px-4 *:py-3 *:lg:px-6">
            <div className="flex items-center gap-2">
              <Checkbox
                className="data-[state=checked]:bg-primary"
                checked={isSellerFullySelected(groupedItem.seller.id)}
                onCheckedChange={(checked) => toggleSellerItems(checked as boolean, groupedItem)}
              />
              <div className="flex items-center gap-2">
                <Image
                  width={30}
                  height={30}
                  alt={groupedItem.seller.shopName}
                  src={groupedItem.seller.logo.fileSecureUrl}
                />
                <h5>{groupedItem.seller.shopName}</h5>
              </div>
            </div>
            {groupedItem.items.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                isChecked={selectedCartItemIds.has(cartItem.id)}
                onSelect={(checked) => toggleItemSelection(cartItem.id, checked)}
              />
            ))}
          </div>
        ))}
      </div>
      <CartSummary />
    </div>
  );
};

export default CartView;
