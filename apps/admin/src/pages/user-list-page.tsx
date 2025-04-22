import { column } from "@/components/data-tables/user/column";
import { UserListDataTable } from "@/components/data-tables/user/data-table";
import { useGetAllUsersQuery } from "@repo/redux";
import { TPaginationState } from "@repo/utils/types";
import { AppPagination } from "@ui/index";
import { useCallback, useEffect, useMemo, useState } from "react";

const UserListPage = () => {
  const [pagination, setPagination] = useState<TPaginationState>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const query = useMemo(() => {
    let queryStr = `status=active`;
    if (pagination) {
      queryStr += `&page=${pagination.page}&limit=${pagination.limit}`;
    }
    return queryStr;
  }, [pagination]);

  const { data, isFetching } = useGetAllUsersQuery(query);

  const users = data?.data || [];

  useEffect(() => {
    if (data?.meta) {
      const { limit, page, total } = data.meta;
      const totalPages = Math.ceil(total / limit);
      setPagination((prev) => ({
        ...prev,
        page,
        limit,
        total,
        totalPages,
      }));
    }
  }, [data]);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">User List</h1>
        <p className="text-accent-foreground text-sm font-medium">Manage your users and their account from here.</p>
      </div>
      <UserListDataTable columns={column} data={users} isLoading={isFetching} />
      {pagination.total > 10 && (
        <div className="flex justify-end">
          <div>
            <AppPagination
              totalPages={pagination.totalPages}
              currentPage={pagination.page}
              maxVisiblePages={4}
              showNextButton
              showPrevButton
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
