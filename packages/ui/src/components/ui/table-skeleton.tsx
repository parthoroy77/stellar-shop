"use client";
import { FC } from "react";
import { Skeleton } from "./skeleton";
import { TableBody, TableCell, TableRow } from "./table";

type TTableSkeletonProps = {
  columnNo: number;
  rowNo: number;
};

const TableSkeleton: FC<TTableSkeletonProps> = ({ columnNo = 9, rowNo = 5 }) => {
  const generateArrByLength = (length: number): number[] => {
    const columnArr: number[] = [];
    for (let i = 0; i < length; i++) {
      columnArr.push(i);
    }

    return columnArr;
  };

  return (
    <TableBody>
      {generateArrByLength(rowNo).map((item) => (
        <TableRow key={item}>
          {generateArrByLength(columnNo).map((item) => (
            <TableCell key={item} className="py-2">
              <Skeleton className={`h-6 w-[${100 / columnNo}]%`} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
