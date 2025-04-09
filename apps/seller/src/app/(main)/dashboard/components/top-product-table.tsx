import { ShadTable as Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui";
import { Star } from "lucide-react";

const topProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    rating: 4.8,
    sold: 128,
    revenue: "$16,512.00",
    profit: "$8,256.00",
  },
  {
    id: 2,
    name: "Smart Watch",
    rating: 4.5,
    sold: 96,
    revenue: "$8,544.00",
    profit: "$4,272.00",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    rating: 4.7,
    sold: 84,
    revenue: "$4,956.00",
    profit: "$2,478.00",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    rating: 4.3,
    sold: 72,
    revenue: "$3,240.00",
    profit: "$1,620.00",
  },
];

export function TopProductsTable() {
  return (
    <div className="overflow-auto">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-accent rounded-xl">
            <TableHead className="text-accent-foreground">Product</TableHead>
            <TableHead className="text-accent-foreground">Rating</TableHead>
            <TableHead className="text-accent-foreground">Sold</TableHead>
            <TableHead className="text-accent-foreground">Revenue</TableHead>
            <TableHead className="text-right">Profit (After Fee)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.id} className="border-b">
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="">{product.rating}</span>
                </div>
              </TableCell>
              <TableCell className="">{product.sold}</TableCell>
              <TableCell className="">{product.revenue}</TableCell>
              <TableCell className="text-right font-medium text-emerald-600">{product.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
