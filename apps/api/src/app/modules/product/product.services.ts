import prisma, { Prisma } from "@repo/prisma/client";
import { generateUniqueId } from "@repo/utils/functions";
import { TCreateProductValidation } from "@repo/utils/validations";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import {
  deleteFileFromCloudinaryAndRecord,
  uploadFileToCloudinaryAndCreateRecord,
} from "../../handlers/handleCloudUpload";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";
import { NEWLY_ARRIVAL_TIME_PERIOD } from "./product.constants";
import { TProductFilters } from "./product.types";
import { getProductBaseQuery, getProductDetailSelectOptions, getProductsBaseSelectOption } from "./product.utils";

const create = async (payload: TCreateProductValidation, userId: number) => {
  const uploadedImagesPublicIds: { recordId: number; publicId: string }[] = [];

  let totalStock: number = 0;

  const cleanup = async () => {
    for (const file of uploadedImagesPublicIds) {
      await deleteFileFromCloudinaryAndRecord(file.publicId, file.recordId);
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
    uploadedImagesPublicIds.push(
      ...uploadedProdImages.map((img) => ({ publicId: img.fileRecord.filePublicId, recordId: img.fileRecord.id }))
    );

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
    if (payload.attributes && payload.attributes.length > 0) {
      productData.attributes = {
        createMany: {
          data: payload.attributes.flatMap((attr) =>
            attr.attributeValues.map((value) => ({ attributeValueId: +value.id }))
          ),
        },
      };
    }

    if (payload.tags && payload.tags.length > 0) {
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
        let isDefaultSet = false;
        for (const variant of payload.variants) {
          if (variant.isDefault) {
            if (isDefaultSet) {
              // If a default variant has already been set, make this one false
              variant.isDefault = false;
            } else {
              // Mark that we've set the default variant
              isDefaultSet = true;
            }
          }
          const variantImage = await uploadFileToCloudinaryAndCreateRecord(
            variant.variantImage.path,
            "variants",
            userId
          );

          uploadedImagesPublicIds.push({
            publicId: variantImage.fileRecord.filePublicId,
            recordId: variantImage.fileRecord.id,
          });

          variantsData.push({
            uniqueId: generateUniqueId(`${createdProduct.uniqueId}-VAR-`),
            productId: createdProduct.id,
            variantName: variant.variantName,
            price: variant.price,
            stock: variant.stock,
            sku: variant.sku,
            isDefault: variant.isDefault,
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

const getPendingProducts = async () => {
  const result = await prisma.product.findMany({
    where: { status: "PENDING" },
    select: {
      id: true,
      uniqueId: true,
      productName: true,
      status: true,
      price: true,
      comparePrice: true,
      sku: true,
      stock: true,
      categories: {
        where: {
          category: {
            level: "COLLECTION",
          },
        },
        select: {
          category: {
            select: {
              categoryName: true,
              level: true,
            },
          },
        },
      },
      seller: {
        select: { shopName: true, userId: true, logo: { select: { fileUrl: true } } },
      },
      images: { take: 1, select: { file: { select: { fileSecureUrl: true, fileUrl: true } } } },
    },
  });
  return result;
};

/**
 * For admin only
 */
const productApproval = async (productId: number) => {
  const product = await prisma.product.findUnique({
    where: { id: productId, status: "PENDING" },
    select: { id: true, seller: { select: { id: true, status: true, user: { select: { id: true, status: true } } } } },
  });

  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product already accept or doesn't exists");
  }

  if (product.seller.status !== "ACTIVE" || product.seller.user.status !== "ACTIVE") {
    throw new ApiError(StatusCodes.CONFLICT, "This seller or associate user restricted or inactive!");
  }

  await prisma.product.update({ where: { id: product.id }, data: { status: "ACTIVE" } });
  return;
};

const getNewlyArrived = async (paginateOptions: TPaginateOption) => {
  const { skip, limit, page } = calculatePagination(paginateOptions);
  const whereClause: Prisma.ProductWhereInput = { status: "ACTIVE", createdAt: { gte: NEWLY_ARRIVAL_TIME_PERIOD } };
  const [result, count] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereClause,
      select: getProductsBaseSelectOption(),
      skip,
      take: limit,
    }),
    prisma.product.count({
      where: whereClause,
    }),
  ]);

  return {
    result,
    meta: {
      limit,
      skip,
      page,
      total: count,
    },
  };
};

// Function to get product details
const getProductDetails = async (params: { slug?: string; productId?: number }) => {
  const { slug, productId } = params;

  // Determine the `where` condition dynamically
  const whereClause: any = {};
  if (slug) whereClause.urlSlug = slug;
  if (productId) whereClause.id = productId;

  // Ensure at least one condition is provided
  if (!Object.keys(whereClause).length) {
    throw new Error("Either 'slug' or 'productId' must be provided.");
  }

  // Perform the query
  const result = await prisma.product.findUnique({
    where: whereClause,
    select: getProductDetailSelectOptions(),
  });

  return result;
};

const getProductsBySearch = async (filters: TProductFilters, paginateOptions: TPaginateOption) => {
  const { skip, limit, page, sortBy, sortOrder } = calculatePagination(paginateOptions);

  const result = await prisma.product.findMany({
    where: getProductBaseQuery(filters),
    select: getProductsBaseSelectOption(),
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {},
  });

  const total = await prisma.product.count({ where: getProductBaseQuery(filters) });

  return {
    result,
    meta: {
      skip,
      limit,
      page,
      sortBy,
      sortOrder,
      total,
    },
  };
};

const getAllBySellerId = async (sellerId: number, options: TPaginateOption) => {
  const { limit, skip, page, sortBy, sortOrder } = calculatePagination(options);
  const result = await prisma.product.findMany({
    where: { sellerId },
    select: { ...getProductsBaseSelectOption(), createdAt: true },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const count = await prisma.product.count({ where: { sellerId } });
  return {
    result,
    meta: { limit, skip, page, total: count, sortOrder, sortBy },
  };
};

export const ProductServices = {
  create,
  getPendingProducts,
  productApproval,
  getNewlyArrived,
  getProductDetails,
  getProductsBySearch,
  getAllBySellerId,
};
