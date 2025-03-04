export type TProductFilters = {
  query?: string;
  brands?: string[];
  tags?: string[];
  min?: number;
  max?: number;
  status?: string;
  inStock?: boolean;
};
