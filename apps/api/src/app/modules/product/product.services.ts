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
      totalStock = payload.stock;
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

// const create = async (payload: TCreateProductValidation, userId: number) => {
//   /**
//    * First check seller exists or active
//    *Product Linked models
//     1. seller
//     2. brand
//     3. ProductAttribute (productId, attributeValueId)
//     4. ProductFile (productId, FileId)
//     5. Product Delivery Info (delivery information)
//     6. Product Shipping Option (productId, shippingOptionId)
//     7. Inventory logs(productId, variantId?,type,action )
//     8. Product Tags (productId, tagId)

//     Variant Linked Models
//     1. Product Variant Attribute (attributeValueId, variantId)
//     2. Variant File (variant, filed)
//     3. Inventory Logs
//    */
//   const {
//     variants,
//     attributes,
//     tags,
//     deliveryInformation,
//     productImages,
//     shippingOptions,
//     brandId,
//     productName,
//     description,
//     category,
//     comparePrice,
//     sku,
//     stock,
//     price,
//   } = payload;

//   // check seller exist
//   const seller = await prisma.seller.findUnique({ where: { userId, status: "ACTIVE" } });

//   // store all uploaded files public id so that we can delete them if fails
//   let uploadedFilePublicIds: string[] = [];
//   // total stock of a product
//   let productTotalStock: number = 0;
//   // store variant attribute values
//   let variantAttributes: string[] = [];
//   // store product attribute values
//   let productAttr: string[] = [];
//   if (!seller) {
//     throw new ApiError(StatusCodes.CONFLICT, "Seller does not exists or active!");
//   }
//   if (price > comparePrice) {
//     throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Compare price should be grater than actual price!");
//   }

//   if (attributes && attributes.length) {
//     productAttr = attributes.flatMap((attr) => attr.attributeValues.map((value) => value.id));
//   }
//   // first upload variant then store with variant ids
//   if (variants && variants.length > 0) {
//     productTotalStock += variants.reduce((acc, cur) => acc + cur.stock, 0);
//     variantAttributes = variants.flatMap((variant) =>
//       variant.variantAttributes.flatMap((attr) => attr.attributeValues.map((value) => value.id))
//     );
//   }

//   try {
//     const uploadedProductImages = await Promise.all(
//       productImages.map((item) => uploadFileToCloudinaryAndCreateRecord(item.path, "products", userId))
//     );
//     uploadedProductImages.map((el) => uploadedFilePublicIds.push(el.fileRecord.filePublicId));
//     const productSlug = await generateUniqueSlug(payload.productName, prisma.product, "urlSlug");
//     const product = await prisma.product.create({
//       data: {
//         productName,
//         uniqueId: generateUniqueId("PROD-"),
//         urlSlug: productSlug,
//         brandId: +brandId,
//         price,
//         comparePrice,
//         sku,
//         description,
//         attributes: {
//           createMany: {
//             data: productAttr.map((id) => ({
//               attributeValueId: +id,
//             })),
//           },
//         },
//         stock: productTotalStock,
//         sellerId: seller.id,
//         deliveryInfo: {
//           create: payload.deliveryInformation,
//         },
//         images: {
//           createMany: {
//             data: uploadedProductImages.map((img) => ({
//               fileId: +img.fileRecord.id,
//             })),
//           },
//         },
//         shippingOptions: {
//           createMany: {
//             data: payload.shippingOptions.map((op) => ({
//               shippingOptionId: +op,
//             })),
//           },
//         },
//       },
//     });
//     if (payload.tags && payload.tags.length > 0) {
//       produtCreateInput.tags = {
//         createMany: {
//           data: payload.tags.map((tag) => ({ tagId: +tag })),
//         },
//       };
//     }
//   } catch (error) {}
// };

export const ProductServices = {
  create,
};
