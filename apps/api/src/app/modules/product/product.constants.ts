export const NEWLY_ARRIVAL_TIME_PERIOD = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
export const PRODUCT_SEARCHABLE_FIELDS = ["productName", "description"];
export const PRODUCT_FILTERABLE_KEYS = ["query", "brands", "tags", "min", "max", "inStock", "status"];
export const PRODUCT_CACHE_BASE_KEY = "product";
export const NEWLY_ARRIVED_CACHE_TTL = 10 * 60;
