import { IApiError } from "@repo/utils/types";
import {
  MutationFunction,
  MutationKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";

export const useMutationData = <TData, TVariables = void, TError = IApiError>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey?: MutationKey,
  onSuccess?: (data: TData) => void,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationKey" | "mutationFn">
): UseMutationResult<TData, TError, TVariables> => {
  const client = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: async (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      if (queryKey) {
        await client.invalidateQueries({ queryKey });
      }
    },
    ...options,
  });
};

type MutationState<TVariables = unknown, TStatus = string> = {
  variables?: TVariables;
  status: TStatus;
};

export const useMutationDataState = <TVariables = unknown, TStatus extends string = string>(
  mutationKey: MutationKey
): { latestVariables?: MutationState<TVariables, TStatus> } => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => ({
      variables: mutation.state.variables as TVariables,
      status: mutation.state.status as TStatus,
    }),
  });

  return { latestVariables: data[data.length - 1] };
};
