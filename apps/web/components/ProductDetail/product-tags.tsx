import { ITag } from "@repo/utils/types";
import { Badge } from "@ui/index";
import { FC } from "react";

interface Props {
  tags?: Partial<ITag>[];
  discount: number;
  lowStock: boolean;
}

const ProductTags: FC<Props> = ({ discount, tags, lowStock }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {discount && <Badge className="rounded-md uppercase">{discount}% OFF</Badge>}
      {lowStock && <Badge className="rounded-md uppercase">LOW STOCK</Badge>}
      {/* <Badge className="rounded-md uppercase">SALE</Badge> */}
      {tags?.map((tag) => (
        <Badge key={tag.id} variant={"accent"} className="rounded-md capitalize">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};

export default ProductTags;
