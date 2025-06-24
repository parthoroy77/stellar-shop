export function getNameInitials(fullName: string): string {
  if (!fullName) return "";

  const nameParts = fullName.trim().split(/\s+/);
  const initials = nameParts
    .slice(0, 2) // Take first two words only
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials;
}

export const getProductQueryStr = (filters: unknown) => {
  return Object.entries(filters as Record<string, string>)
    .filter(([_, value]) => value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key === "q" ? "query" : key === "order" ? "sortOrder" : key)}=${encodeURIComponent(value.toString())}`
    )
    .join("&");
};
