import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@repo/ui/tanstack-table";
import { CategoryLevels, TCategory } from "@repo/utils/types";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/index";
import { useState } from "react";
import { categoryListColumn } from "./category-list-column";
const data: TCategory[] = [
  {
    id: 20,
    categoryName: "Home & Lifestyle",
    urlSlug: "home-lifestyle",
    parentCategoryId: null,
    level: "COLLECTION",
    categoryImageUrl: "home-lifestyle.jpg",
    status: "ACTIVE",
    createdAt: "2024-08-25",
    updatedAt: null,
  },
  {
    id: 20,
    categoryName: "Home & dfdf Lifestyle",
    urlSlug: "home-lifestyle",
    parentCategoryId: null,
    level: "COLLECTION",
    categoryImageUrl: "home-lifestyle.jpg",
    status: "ACTIVE",
    createdAt: "2024-08-25",
    updatedAt: null,
  },
  {
    id: 20,
    categoryName: "Home & Lifestyle",
    urlSlug: "home-lifestyle",
    parentCategoryId: null,
    level: "COLLECTION",
    categoryImageUrl: "home-lifestyle.jpg",
    status: "ACTIVE",
    createdAt: "2024-08-25",
    updatedAt: null,
  },
  {
    id: 20,
    categoryName: "Home & Lifestyle",
    urlSlug: "home-lifestyle",
    parentCategoryId: null,
    level: "COLLECTION",
    categoryImageUrl: "home-lifestyle.jpg",
    status: "ACTIVE",
    createdAt: "2024-08-25",
    updatedAt: null,
  },
  {
    id: 20,
    categoryName: "Home & Lifestyle",
    urlSlug: "home-lifestyle",
    parentCategoryId: null,
    level: "COLLECTION",
    categoryImageUrl: "home-lifestyle.jpg",
    status: "ACTIVE",
    createdAt: "2024-08-25",
    updatedAt: null,
  },
  {
    id: 20,
    categoryName: "Home & Lifestyle",
    urlSlug: "home-lifestyle",
    parentCategoryId: null,
    level: "COLLECTION",
    categoryImageUrl: "home-lifestyle.jpg",
    status: "ACTIVE",
    createdAt: "2024-08-25",
    updatedAt: null,
  },
];

const CategoryListTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: categoryListColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search categories..."
          value={(table.getColumn("categoryName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("categoryName")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <CategoryLevel />
      </div>
      <div className="rounded-md border">
        <ShadTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-xs font-medium uppercase" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={categoryListColumn.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadTable>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-accent-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const CategoryLevel = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Level</SelectLabel>
          <SelectItem value={CategoryLevels.COLLECTION}>Collection</SelectItem>
          <SelectItem value={CategoryLevels.CATEGORY}>Category </SelectItem>
          <SelectItem value={CategoryLevels.SUB_CATEGORY}>Sub Category </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryListTable;
