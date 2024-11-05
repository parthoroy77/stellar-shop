import {
  ColumnDef,
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
import { CategoryLevels } from "@repo/utils/types";
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

interface CategoryListTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
}

const CategoryListTable = <TData, TValue>({ data, columns }: CategoryListTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
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
      <div className="flex items-center justify-between gap-5 py-4">
        <Input
          placeholder="Search categories..."
          className="max-w-[300px] text-xs lg:text-sm"
          value={(table.getColumn("categoryName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("categoryName")?.setFilterValue(event.target.value)}
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
                    <TableHead className="text-nowrap text-xs font-medium capitalize" key={header.id}>
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
      <SelectTrigger className="w-[100px] text-xs lg:w-[180px]">
        <SelectValue placeholder="Category Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="pl-2 text-xs font-medium">Select Level</SelectLabel>
          <hr />
          <SelectItem className="text-xs font-normal" value={CategoryLevels.COLLECTION}>
            Collection
          </SelectItem>
          <SelectItem className="text-xs font-normal" value={CategoryLevels.CATEGORY}>
            Category{" "}
          </SelectItem>
          <SelectItem className="text-xs font-normal" value={CategoryLevels.SUB_CATEGORY}>
            Sub Category{" "}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryListTable;
