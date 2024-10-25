/**
 * Generates a unique slug for a given name.
 * @param name - The original name to base the slug on.
 * @param model - The Prisma model to check for unique slugs (e.g., `prisma.category`).
 * @param slugField - The field name for the slug in the database (default is `urlSlug`).
 * @returns A unique slug.
 */
export async function generateUniqueSlug(name: string, model: any, slugField = "urlSlug"): Promise<string> {
  // Convert name to lowercase, replace spaces and special characters with hyphens
  let baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let slug = baseSlug;
  let counter = 1;

  // Check if the slug is unique
  while (true) {
    const existingItem = await model.findUnique({
      where: {
        [slugField]: slug,
      },
    });

    if (!existingItem) {
      break; // Unique slug found
    }

    // Append counter if slug is not unique
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
