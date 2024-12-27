import prisma, { Prisma } from "@repo/prisma/client";
import { generateUniqueId } from "@repo/utils/functions";
import { TCreateProductValidation } from "@repo/utils/validations";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { uploadFileToCloudinaryAndCreateRecord } from "../../handlers/handleCloudUpload";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";

export const create = async (payload: TCreateProductValidation, userId: number) => {
  const uploadedImagesPublicIds: string[] = [];

  let totalStock: number = 0;

  const cleanup = async () => {
    for (const publicId of uploadedImagesPublicIds) {
      await deleteFromCloudinary(publicId, "image");
    }
  };

  try {
    // Check if the seller exists and is active
    const seller = await prisma.seller.findUnique({
      where: { userId, status: "ACTIVE" },
    });

    if (!seller) {
      throw new ApiError(StatusCodes.CONFLICT, "Seller does not exist or is not active!");
    }

    // if actual price is less than compare price
    if (payload.price > payload.comparePrice) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Compare price should be greater than the actual price!");
    }

    // calculate the product stock
    if (payload.variants && payload.variants.length > 0) {
      totalStock = payload.variants.reduce((acc, curr) => acc + curr.stock, 0);
    } else {
      totalStock = payload.stock || 0;
    }

    // if total stock is 0
    if (totalStock <= 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Stock information not found!");
    }
    // Upload product images
    const uploadedProdImages = await Promise.all(
      payload.productImages.map((file) => uploadFileToCloudinaryAndCreateRecord(file.path, "products", userId))
    );
    uploadedImagesPublicIds.push(...uploadedProdImages.map((img) => img.fileRecord.filePublicId));

    // Generate unique slug
    const productSlug = await generateUniqueSlug(payload.productName, prisma.product, "urlSlug");

    // prepare product payload
    const productData: Prisma.ProductCreateArgs["data"] = {
      uniqueId: generateUniqueId("PROD-"),
      urlSlug: productSlug,
      productName: payload.productName,
      description: payload.description,
      brandId: +payload.brandId,
      sku: payload.sku,
      price: payload.price,
      comparePrice: payload.comparePrice,
      stock: totalStock,
      sellerId: seller.id,
      deliveryInfo: { create: payload.deliveryInformation },
      shippingOptions: {
        createMany: {
          data: payload.shippingOptions.map((id) => ({ shippingOptionId: +id })),
        },
      },
      images: {
        createMany: {
          data: uploadedProdImages.map((img) => ({ fileId: img.fileRecord.id })),
        },
      },
      inventoryLogs: {
        create: {
          type: "NEW_PRODUCT",
          action: "ADDITION",
          quantity: 0,
        },
      },
      categories: {
        createMany: {
          data: [
            ...payload.category.subCategories?.map((id) => ({ categoryId: +id })),
            { categoryId: +payload.category.categoryId },
            { categoryId: +payload.category.collectionId },
          ],
        },
      },
    };

    // Add optional fields if they exist
    if (payload.attributes) {
      productData.attributes = {
        createMany: {
          data: payload.attributes.flatMap((attr) =>
            attr.attributeValues.map((value) => ({ attributeValueId: +value.id }))
          ),
        },
      };
    }

    if (payload.tags) {
      productData.tags = {
        createMany: {
          data: payload.tags.map((tagId) => ({ tagId: +tagId })),
        },
      };
    }

    // variants creation payload
    const variantsData: Prisma.ProductVariantCreateArgs["data"][] = [];

    // batch in transaction query
    await prisma.$transaction(async (tx) => {
      // Prepare product data

      const createdProduct = await tx.product.create({
        data: productData,
      });

      if (payload.variants && payload.variants.length > 0) {
        for (const variant of payload.variants) {
          const variantImage = await uploadFileToCloudinaryAndCreateRecord(
            variant.variantImage.path,
            "variants",
            userId
          );
          uploadedImagesPublicIds.push(variantImage.fileRecord.filePublicId);

          variantsData.push({
            uniqueId: generateUniqueId(`${createdProduct.uniqueId}-VAR-`),
            productId: createdProduct.id,
            variantName: variant.variantName,
            price: variant.price,
            stock: variant.stock,
            sku: variant.sku,
            attributes: {
              createMany: {
                data: variant.variantAttributes.flatMap((attr) =>
                  attr.attributeValues.map((value) => ({ attributeValueId: +value.id }))
                ),
              },
            },
            images: {
              create: {
                fileId: variantImage.fileRecord.id,
              },
            },
            inventoryLogs: {
              create: {
                productId: createdProduct.id,
                quantity: +variant.stock,
                action: "ADDITION",
                type: "NEW_PRODUCT",
              },
            },
          });
        }
      }
      await Promise.all(variantsData.map((data) => tx.productVariant.create({ data })));
    });
  } catch (error) {
    await cleanup();
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while uploading product!");
  }
};

export const ProductServices = {
  create,
};
