import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const CustomPagination = () => {
  return (
    <div className="flex space-x-2">
      {Array.from({ length: 5 }).map((_x, i) => (
        <button
          aria-label={`Pagination Button ${i + 1}`}
          className={`bg-muted-foreground hover:bg-accent/50 flex size-10 items-center justify-center rounded-md border text-xs font-medium`}
          key={i}
        >
          <span>{i + 1}</span>
        </button>
      ))}
      <button
        aria-label={`Pagination Button Next`}
        className="bg-muted-foreground flex size-10 items-center justify-center rounded-md border text-xs font-medium"
      >
        <span>
          <HiOutlineArrowNarrowRight />
        </span>
      </button>
    </div>
  );
};

export default CustomPagination;
