"use client";
import TableSkeleton from "@ui/components/ui/table-skeleton";
import { Button, Input, ShadTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/index";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@ui/tanstack-table";
import { useState } from "react";

interface PendingProductTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
}

const ProductDataTable = <TData, TValue>({
  data,
  isLoading = false,
  columns,
}: PendingProductTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [searchText, setSearchText] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    globalFilterFn: (row, _, filterValue) => {
      const productName = row.getValue("productName")?.toString().toLowerCase() || "";
      return productName.includes(filterValue.toLowerCase());
    },
  });

  return (
    <div className="w-full space-y-5">
      <div>
        <Input
          placeholder="Search products..."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            table.setGlobalFilter(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <ShadTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-accent/40 border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="h-fit text-nowrap py-2 text-xs font-medium" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableSkeleton rowNo={8} columnNo={columns.length} />
          ) : (
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
          )}
        </ShadTable>
      </div>
      <div className="flex items-center justify-end space-x-2">
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

export default ProductDataTable;
