import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui/index";
import type { FC } from "react";

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showNextButton?: boolean;
  showPrevButton?: boolean;
}

export const AppPagination: FC<AppPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showNextButton = true,
  showPrevButton = true,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageLink(i));
      }
    } else {
      const leftBound = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const rightBound = Math.min(totalPages, leftBound + maxVisiblePages - 1);

      if (leftBound > 1) {
        pageNumbers.push(renderPageLink(1));
        if (leftBound > 2) {
          pageNumbers.push(
            <PaginationItem key="ellipsis-left">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(renderPageLink(i));
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          pageNumbers.push(
            <PaginationItem key="ellipsis-right">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        pageNumbers.push(renderPageLink(totalPages));
      }
    }

    return pageNumbers;
  };

  const renderPageLink = (page: number) => (
    <PaginationItem key={page}>
      <PaginationLink
        size={"sm"}
        onClick={(e) => {
          e.preventDefault();
          onPageChange(page);
        }}
        isActive={currentPage === page}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );

  return (
    <Pagination>
      <PaginationContent>
        {showPrevButton && (
          <PaginationItem>
            <PaginationPrevious
              size={"sm"}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
            />
          </PaginationItem>
        )}
        {renderPageNumbers()}
        {showNextButton && (
          <PaginationItem>
            <PaginationNext
              size={"sm"}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
