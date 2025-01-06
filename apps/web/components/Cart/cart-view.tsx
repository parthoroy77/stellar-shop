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
  const [selectedCartItems, setSelectedCartItems] = useState<TCartItem[]>([]);

  // Group cart items if they are from same seller/shop
  const groupedItems = useMemo(() => groupCartItemsBySeller(cartItems), [cartItems]);

  // Handle selecting/deselecting all items from a seller
  const handleShopSelection = (isSelected: boolean, groupItem: TGroupItem) => {
    if (isSelected) {
      setSelectedCartItems((prevSelectedItems) => [
        ...prevSelectedItems,
        ...groupItem.items.filter((item) => !prevSelectedItems.some((selected) => selected.id === item.id)),
      ]);
    } else {
      setSelectedCartItems((prevSelectedItems) =>
        prevSelectedItems.filter((cartItem) => !groupItem.items.some((item) => item.id === cartItem.id))
      );
    }
  };

  // Handle selecting/deselecting a single item
  const handleItemSelection = (item: TCartItem, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCartItems((prev) => [...prev, item]);
    } else {
      setSelectedCartItems((prev) => prev.filter((selectedItem) => selectedItem.id !== item.id));
    }
  };

  // Check if all items from a seller are selected
  const isSellerFullySelected = useCallback((shopId: number) => {
    const shopItems = groupedItems[shopId]?.items || [];
    return shopItems.every((item) => selectedCartItems.some((selectedItem) => selectedItem.id === item.id));
  }, []);

  // Check if an individual item is selected
  const isItemSelected = useCallback((itemId: number) => {
    return selectedCartItems.some((item) => item.id === itemId);
  }, []);
  return (
    <div className="flex w-full flex-col gap-5 *:rounded-md lg:flex-row">
      <div className="h-fit space-y-3 lg:w-[75%]">
        <CartActions />
        {Object.values(groupedItems).map((groupedItem, idx) => (
          <div key={idx} className="divide-y-2 rounded-md border-2 *:px-4 *:py-3 *:lg:px-6">
            <div className="flex items-center gap-2">
              <Checkbox
                className="data-[state=checked]:bg-primary"
                checked={isSellerFullySelected(groupedItem.seller.id)}
                onCheckedChange={(checked) => handleShopSelection(checked as boolean, groupedItem)}
              />
              {/* TODO: Redirect to seller  */}
              <div className="flex items-center gap-2">
                <Image
                  width={30}
                  height={30}
                  alt={groupedItem.seller.shopName}
                  src={groupedItem.seller.logo.fileSecureUrl}
                />
                <h5> {groupedItem.seller.shopName}</h5>
              </div>
            </div>
            {groupedItem.items.map((cartItem, i) => (
              <CartItem
                key={i}
                cartItem={cartItem}
                isChecked={isItemSelected(cartItem.id)}
                onSelect={(checked) => handleItemSelection(cartItem, checked)}
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
