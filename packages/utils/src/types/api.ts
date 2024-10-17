export interface IApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
  error?: unknown;
  statusCode: number;
}
export interface IApiError {
  data: null;
  success: boolean;
  message: string;
  error: any[];
}
