export function generateUniqueId(prefix?: string, length?: number): string {
  const randomPart = Math.random().toString(36).substring(2).toUpperCase(); // Random string
  const timestampPart = Date.now().toString(36).toUpperCase(); // Timestamp in base 36
  const uniquePart = `${randomPart}${timestampPart}`; // Combine both parts

  let finalId = prefix ? `${prefix}${uniquePart}` : uniquePart;

  if (length && length > 0) {
    finalId = finalId.substring(0, length);
  }

  return finalId;
}
