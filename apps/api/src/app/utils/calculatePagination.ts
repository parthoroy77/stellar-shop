import config from "../config";

export type TPaginateOption = {
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type TPaginateReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

// Function to calculate pagination
const calculatePagination = (options: TPaginateOption): TPaginateReturn => {
  // Parse the page number from options or default
  const page = Math.max(Number(options.page || config.default_page_number), 1);

  // Parse the limit per page from options or default
  const limit = Math.max(Number(options.limit || config.default_page_limit), 1);

  // Calculate the skip (How many items will be skipped)
  const skip = (page - 1) * limit;

  // Determine the field to sort by, defaulting to 'createdAt'
  const sortBy = options.sortBy || "createdAt";

  // Determine the sorting order, defaulting to 'asc' (ascending)
  const sortOrder = (options.sortOrder?.toLowerCase() === "desc" ? "desc" : "asc") as "asc" | "desc";

  // Return the calculated pagination values
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
