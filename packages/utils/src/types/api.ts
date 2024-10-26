export type TMeta = {
  page: number;
  limit: number;
  total: number;
};
export interface IApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
  error?: unknown;
  statusCode: number;
  meta?: TMeta;
}
export interface IApiError {
  data: null;
  success: boolean;
  message: string;
  error: any[];
}
