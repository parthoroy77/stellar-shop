import { IApiError } from "@repo/utils/types";
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useQueryData = <TData, TError = IApiError, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TData, TQueryKey>,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, "queryKey" | "queryFn">
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
    refetchOnWindowFocus: false,
  });
};
