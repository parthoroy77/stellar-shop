"use client";

import { AppPagination } from "@ui/index";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface Props {
  defaultPage: number;
  totalPages: number;
}

const SearchPagination: FC<Props> = ({ defaultPage = 1, totalPages = 1 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const onPageChange = (page: number) => {
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`, { scroll: true });
  };
  return (
    <div>
      <AppPagination
        currentPage={defaultPage}
        totalPages={totalPages}
        maxVisiblePages={4}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default SearchPagination;
