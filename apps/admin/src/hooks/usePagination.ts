import { TPaginationState } from "@repo/utils/types";
import { useCallback, useState } from "react";

export const usePagination = ({ ...defaultState }: Partial<TPaginationState>) => {
  const [pagination, setPagination] = useState<TPaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    ...defaultState,
  });

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleUpdatePagination = useCallback((newPagination: Omit<TPaginationState, "totalPages">) => {
    const { limit, page, total } = newPagination;
    const totalPages = Math.ceil(total / limit);
    setPagination((prev) => ({
      ...prev,
      page,
      limit,
      total,
      totalPages,
    }));
  }, []);

  return { pagination, handlePageChange, handleUpdatePagination };
};
