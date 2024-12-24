/**
 * Generates the Cartesian product of the input arrays.
 * @param arrays - An array of arrays to generate the Cartesian product from.
 * @returns The Cartesian product of the input arrays.
 */
export const cartesian = <T>(...arrays: T[][]): T[][] => {
  // Handle edge case: if no arrays are provided, return an empty array
  if (arrays.length === 0) return [];

  return arrays.reduce<T[][]>(
    (results, currentArray) =>
      results
        .map((result) => currentArray.map((item) => [...result, item]))
        .reduce((subResults, items) => [...subResults, ...items], []),
    [[]]
  );
};
