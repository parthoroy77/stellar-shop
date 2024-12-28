export const parseProductData = (body: Record<string, any>, files: Express.Multer.File[]) => {
  const productImages: Express.Multer.File[] = [];

  // Normalize productImages
  files.forEach((file) => {
    if (file.fieldname.startsWith("productImages")) {
      productImages.push(file);
    }
  });

  // Normalize variant images and associate with their respective variants
  const variantFiles = files.filter((file) => file.fieldname.startsWith("variants"));

  const transformedVariants =
    body?.variants &&
    body.variants.length > 0 &&
    body.variants.map((variant: any, index: number) => {
      const variantFile = variantFiles.find((file) => file.fieldname === `variants[${index}][variantImage]`);
      return {
        ...variant,
        price: parseFloat(variant.price),
        stock: parseInt(variant.stock, 10),
        variantAttributes: JSON.parse(variant.variantAttributes),
        variantImage: variantFile || null,
        isDefault: JSON.parse(variant.isDefault),
      };
    });

  return {
    ...body,
    price: parseFloat(body.price),
    comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : undefined,
    stock: parseInt(body.stock, 10),
    category: JSON.parse(body.category),
    attributes: JSON.parse(body.attributes),
    deliveryInformation: JSON.parse(body.deliveryInformation),
    shippingOptions: JSON.parse(body.shippingOptions),
    tags: JSON.parse(body.tags),
    productImages,
    variants: transformedVariants || [],
  };
};
