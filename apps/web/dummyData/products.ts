export const products = [
  {
    id: 1,
    productName: "Comfortable and Fashionable Exclusive T-shirt",
    urlSlug: "comfortable-and-fashionable-exclusive-t-shirt",
    categoryId: 3,
    brandId: 1,
    description: "A comfortable and stylish men's t-shirt.",
    price: 19.99,
    comparePrice: 21.25,
    stockQuantity: 100,
    lowStockThreshold: 10,
    status: "active",
    createdAt: "2024-08-22T10:00:00Z",
    updatedAt: "2024-08-22T12:00:00Z",
    brand: {
      id: 1,
      name: "Gucci",
      description: "Leading brand in clothing.",
      logo: "https://example.com/images/techbrand-logo.jpg",
      createdAt: "2024-08-25T10:00:00Z",
      updatedAt: "2024-08-25T10:00:00Z",
    },
    images: [
      {
        id: 1,
        fileName: "product-9394-image",
        description: "Image of product 9394",
        fileType: "image",
        filePublicId: "cloudinary_public_id_123",
        fileSize: 204800,
        fileUrl:
          "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
        fileSecureUrl:
          "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
        uploadedBy: 1,
        associatedEntityId: 1,
        status: "active",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
      {
        id: 2,
        fileName: "product-9395-image",
        description: "Image of product 9394",
        fileType: "image",
        filePublicId: "cloudinary_public_id_1235",
        fileSize: 204800,
        fileUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
        fileSecureUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
        uploadedBy: 1,
        associatedEntityId: 1,
        status: "active",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
    ],
    categories: [
      {
        id: 1,
        categoryName: "Men's Fashion",
        urlSlug: "mens-fashions",
        parentCategoryId: null,
        level: "Collection",
        categoryImageUrl: "https://example.com/images/electronics.jpg",
        status: "active",
        createdAt: "2024-08-25T09:00:00Z",
        updatedAt: "2024-08-25T09:00:00Z",
        subCategories: [
          {
            id: 2,
            categoryName: "Clothing",
            urlSlug: "mens-clothing",
            parentCategoryId: 1,
            level: "Category",
            categoryImageUrl: "https://example.com/images/mobile-phones.jpg",
            status: "active",
            createdAt: "2024-08-25T09:05:00Z",
            updatedAt: "2024-08-25T09:05:00Z",
            subCategories: [
              {
                id: 3,
                categoryName: "T Shirts",
                urlSlug: "mens-t-shirts",
                parentCategoryId: 2,
                level: "Sub Category",
                categoryImageUrl: "https://example.com/images/smartphones.jpg",
                status: "active",
                createdAt: "2024-08-25T09:10:00Z",
                updatedAt: "2024-08-25T09:10:00Z",
              },
              {
                id: 4,
                categoryName: "Casual Shirts",
                urlSlug: "men-casual-shirts",
                parentCategoryId: 2,
                level: "Sub Category",
                categoryImageUrl: "https://example.com/images/feature-phones.jpg",
                status: "inactive",
                createdAt: "2024-08-25T09:15:00Z",
                updatedAt: "2024-08-25T09:15:00Z",
              },
            ],
          },
        ],
      },
    ],
    attributes: [
      {
        id: 1,
        name: "Color",
        attributeValues: [
          {
            id: 1,
            attributeId: 1,
            value: "Black",
          },
          {
            id: 2,
            attributeId: 1,
            value: "Large",
          },
          {
            id: 3,
            attributeId: 1,
            value: "Medium",
          },
          {
            id: 4,
            attributeId: 1,
            value: "Regular",
          },
          {
            id: 5,
            attributeId: 1,
            value: "White",
          },
        ],
      },
      {
        id: 2,
        name: "Size",
        attributeValues: [
          {
            id: 1,
            attributeId: 2,
            value: "S",
          },
          {
            id: 2,
            attributeId: 2,
            value: "L",
          },
          {
            id: 3,
            attributeId: 2,
            value: "M",
          },
          {
            id: 4,
            attributeId: 2,
            value: "XL",
          },
          {
            id: 5,
            attributeId: 2,
            value: "XXL",
          },
        ],
      },
    ],
    variants: [
      {
        id: 1,
        variantName: "Men's T-Shirt - Black - Large",
        description: "Black Large Size",
        price: 19.99,
        stockQuantity: 50,
        sku: "TSHIRT-BLK-LG",
        status: "active",
        createdAt: "2024-08-22T10:00:00Z",
        updatedAt: "2024-08-22T12:00:00Z",
        images: [
          {
            id: 1,
            fileName: "product-varian-9394-image",
            description: "Image of product 9394",
            fileType: "image",
            filePublicId: "cloudinary_public_id_123",
            fileSize: 204800,
            fileUrl:
              "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
            fileSecureUrl: "https://secure.example.com/files/product-9394-image",
            uploadedBy: 1,
            associatedEntityId: 1,
            status: "active",
            createdAt: "2024-08-25T10:00:00Z",
            updatedAt: "2024-08-25T12:00:00Z",
          },
        ],
        attributes: [
          {
            id: 1,
            name: "Color",
            createdAt: "2024-08-22T10:00:00Z",
            updatedAt: "2024-08-22T12:00:00Z",
            attributeValues: [
              {
                id: 1,
                attributeId: 1,
                value: "Black",
                createdAt: "2024-08-22T10:00:00Z",
                updatedAt: "2024-08-22T12:00:00Z",
              },
            ],
          },
          {
            id: 1,
            name: "Size",
            createdAt: "2024-08-22T10:00:00Z",
            updatedAt: "2024-08-22T12:00:00Z",
            attributeValues: [
              {
                id: 1,
                attributeId: 1,
                value: "Large",
                createdAt: "2024-08-22T10:00:00Z",
                updatedAt: "2024-08-22T12:00:00Z",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        variantName: "Men's T-Shirt - White - Medium",
        description: "White Medium Size",
        price: 19.99,
        stockQuantity: 30,
        sku: "TSHIRT-WHT-MD",
        status: "active",
        createdAt: "2024-08-22T10:00:00Z",
        updatedAt: "2024-08-22T12:00:00Z",
        images: [
          {
            id: 1,
            fileName: "product-varian-9395-image",
            description: "Image of product 9394",
            fileType: "image",
            filePublicId: "cloudinary_public_id_123",
            fileSize: 204800,
            fileUrl:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
            fileSecureUrl: "https://secure.example.com/files/product-9394-image",
            uploadedBy: 1,
            associatedEntityId: 2,
            status: "active",
            createdAt: "2024-08-25T10:00:00Z",
            updatedAt: "2024-08-25T12:00:00Z",
          },
        ],
        attributes: [
          {
            id: 3,
            name: "Color",
            value: "White",
          },
          {
            id: 4,
            name: "Size",
            value: "Medium",
          },
        ],
      },
    ],
    ratingAverage: {
      id: 701,
      productId: 101,
      averageRating: 5.0,
      ratingCount: 1,
      createdAt: "2024-08-16T12:34:56Z",
      updatedAt: "2024-08-16T12:34:56Z",
    },
    reviews: [
      {
        id: 601,
        productId: 101,
        userId: 301,
        rating: 5,
        reviewText: "Excellent sound quality and comfort!",
        images: [],
        createdAt: "2024-08-16T12:34:56Z",
        updatedAt: "2024-08-16T12:34:56Z",
      },
      {
        id: 602,
        productId: 101,
        userId: 302,
        rating: 4.3,
        reviewText: "Excellent sound quality and comfort!",
        images: [],
        createdAt: "2024-08-16T12:34:56Z",
        updatedAt: "2024-08-16T12:34:56Z",
      },
    ],
    tags: [
      {
        id: 501,
        productId: 101,
        name: "Bluetooth",
        createdAt: "2024-08-15T12:34:56Z",
        updatedAt: "2024-08-20T12:34:56Z",
      },
      {
        id: 502,
        productId: 101,
        name: "Noise Cancelling",
        createdAt: "2024-08-15T12:34:56Z",
        updatedAt: "2024-08-20T12:34:56Z",
      },
    ],
    seller: {
      id: 401,
      userId: 201,
      storeName: "AudioTech",
      storeDescription: "Your go-to store for high-quality audio equipment.",
      storeLogoUrl: "https://example.com/images/audiotech-logo.jpg",
      storeBannerUrl: "https://example.com/images/audiotech-banner.jpg",
      businessAddress: "123 Tech Lane, Silicon Valley, CA",
      contactNumber: "555-123-4567",
      status: "active",
      createdAt: "2024-08-15T12:34:56Z",
      updatedAt: "2024-08-20T12:34:56Z",
    },
  },
  {
    id: 2,
    productName: "Women's Leather Jacket",
    urlSlug: "womens-leather-jacket",
    categoryId: 4,
    brandId: 2,
    description: "A stylish and durable women's leather jacket.",
    price: 149.99,
    comparePrice: 170.25,
    stockQuantity: 50,
    lowStockThreshold: 5,
    status: "active",
    createdAt: "2024-08-24T09:00:00Z",
    updatedAt: "2024-08-24T11:00:00Z",
    brand: {
      id: 2,
      name: "Prada",
      description: "Luxury fashion brand known for its elegance.",
      logo: "https://example.com/images/prada-logo.jpg",
      createdAt: "2024-08-25T11:00:00Z",
      updatedAt: "2024-08-25T11:00:00Z",
    },
    images: [
      {
        id: 3,
        fileName: "womens-leather-jacket-front",
        description: "Front view of the women's leather jacket",
        fileType: "image",
        filePublicId: "cloudinary_public_id_124",
        fileSize: 307200,
        fileUrl:
          "https://images.vestiairecollective.com/images/resized/w=1024,h=1024,q=75,f=auto,/produit/42428979-1_2.jpg",
        fileSecureUrl: "https://secure.example.com/files/womens-leather-jacket-front",
        uploadedBy: 2,
        associatedEntityId: 2,
        status: "active",
        createdAt: "2024-08-24T09:00:00Z",
        updatedAt: "2024-08-24T11:00:00Z",
      },
    ],
    categories: [
      {
        id: 4,
        categoryName: "Women's Fashion",
        urlSlug: "womens-fashion",
        parentCategoryId: null,
        level: "Collection",
        categoryImageUrl: "https://example.com/images/womens-fashion.jpg",
        status: "active",
        createdAt: "2024-08-24T08:00:00Z",
        updatedAt: "2024-08-24T08:00:00Z",
        subCategories: [
          {
            id: 5,
            categoryName: "Outerwear",
            urlSlug: "womens-outerwear",
            parentCategoryId: 4,
            level: "Category",
            categoryImageUrl: "https://example.com/images/outerwear.jpg",
            status: "active",
            createdAt: "2024-08-24T08:10:00Z",
            updatedAt: "2024-08-24T08:10:00Z",
          },
        ],
      },
    ],
    attributes: [
      {
        id: 3,
        name: "Color",
        attributeValues: [
          {
            id: 6,
            attributeId: 3,
            value: "Brown",
          },
          {
            id: 7,
            attributeId: 3,
            value: "Black",
          },
        ],
      },
      {
        id: 4,
        name: "Size",
        attributeValues: [
          {
            id: 6,
            attributeId: 4,
            value: "S",
          },
          {
            id: 7,
            attributeId: 4,
            value: "M",
          },
          {
            id: 8,
            attributeId: 4,
            value: "L",
          },
        ],
      },
    ],
    variants: [
      {
        id: 3,
        variantName: "Women's Leather Jacket - Black - Medium",
        description: "Black Medium Size",
        price: 149.99,
        stockQuantity: 20,
        sku: "JACKET-BLK-MD",
        status: "active",
        createdAt: "2024-08-24T09:00:00Z",
        updatedAt: "2024-08-24T11:00:00Z",
        images: [
          {
            id: 3,
            fileName: "womens-leather-jacket-black-medium",
            description: "Black Medium Size Variant",
            fileType: "image",
            filePublicId: "cloudinary_public_id_125",
            fileSize: 307200,
            fileUrl:
              "https://images.vestiairecollective.com/images/resized/w=1024,h=1024,q=75,f=auto,/produit/42428979-1_2.jpg",
            fileSecureUrl: "https://secure.example.com/files/womens-leather-jacket-black-medium",
            uploadedBy: 2,
            associatedEntityId: 3,
            status: "active",
            createdAt: "2024-08-24T09:00:00Z",
            updatedAt: "2024-08-24T11:00:00Z",
          },
        ],
        attributes: [
          {
            id: 3,
            name: "Color",
            attributeValues: [
              {
                id: 6,
                attributeId: 3,
                value: "Black",
              },
            ],
          },
          {
            id: 4,
            name: "Size",
            attributeValues: [
              {
                id: 7,
                attributeId: 4,
                value: "Medium",
              },
            ],
          },
        ],
      },
    ],
    ratingAverage: {
      id: 702,
      productId: 102,
      averageRating: 4.7,
      ratingCount: 3,
      createdAt: "2024-08-23T13:45:00Z",
      updatedAt: "2024-08-23T13:45:00Z",
    },
    reviews: [
      {
        id: 603,
        productId: 102,
        userId: 303,
        rating: 5,
        reviewText: "Absolutely love this jacket! Great fit and quality.",
        images: [],
        createdAt: "2024-08-23T13:45:00Z",
        updatedAt: "2024-08-23T13:45:00Z",
      },
      {
        id: 604,
        productId: 102,
        userId: 304,
        rating: 4.5,
        reviewText: "Very stylish and comfortable, but a bit pricey.",
        images: [],
        createdAt: "2024-08-23T13:45:00Z",
        updatedAt: "2024-08-23T13:45:00Z",
      },
    ],
    tags: [
      {
        id: 503,
        productId: 102,
        name: "Leather",
        createdAt: "2024-08-24T09:00:00Z",
        updatedAt: "2024-08-24T11:00:00Z",
      },
    ],
    seller: {
      id: 402,
      userId: 202,
      storeName: "LuxuryFashions",
      storeDescription: "Premium fashion with a touch of elegance.",
      storeLogoUrl: "https://example.com/images/luxuryfashions-logo.jpg",
      storeBannerUrl: "https://example.com/images/luxuryfashions-banner.jpg",
      businessAddress: "456 Fashion Ave, New York, NY",
      contactNumber: "555-234-5678",
      status: "active",
      createdAt: "2024-08-15T12:34:56Z",
      updatedAt: "2024-08-20T12:34:56Z",
    },
  },
  {
    id: 3,
    productName: "Wireless Earbuds",
    urlSlug: "wireless-earbuds",
    categoryId: 5,
    brandId: 3,
    description: "High-quality wireless earbuds with noise-cancelling features.",
    price: 89.99,
    comparePrice: 95.25,
    stockQuantity: 200,
    lowStockThreshold: 20,
    status: "active",
    createdAt: "2024-08-24T10:00:00Z",
    updatedAt: "2024-08-24T12:00:00Z",
    brand: {
      id: 3,
      name: "Bose",
      description: "Renowned brand for high-performance audio equipment.",
      logo: "https://example.com/images/bose-logo.jpg",
      createdAt: "2024-08-25T12:00:00Z",
      updatedAt: "2024-08-25T12:00:00Z",
    },
    images: [
      {
        id: 4,
        fileName: "wireless-earbuds-front",
        description: "Front view of the wireless earbuds",
        fileType: "image",
        filePublicId: "cloudinary_public_id_126",
        fileSize: 150000,
        fileUrl: "https://www.startech.com.bd/image/cache/catalog/earbuds/earfun/free-2s/free-2s-01-500x500.webp",
        fileSecureUrl: "https://secure.example.com/files/wireless-earbuds-front",
        uploadedBy: 3,
        associatedEntityId: 3,
        status: "active",
        createdAt: "2024-08-24T10:00:00Z",
        updatedAt: "2024-08-24T12:00:00Z",
      },
    ],
    categories: [
      {
        id: 5,
        categoryName: "Electronics",
        urlSlug: "electronics",
        parentCategoryId: null,
        level: "Collection",
        categoryImageUrl: "https://example.com/images/electronics.jpg",
        status: "active",
        createdAt: "2024-08-24T09:00:00Z",
        updatedAt: "2024-08-24T09:00:00Z",
        subCategories: [
          {
            id: 6,
            categoryName: "Audio",
            urlSlug: "audio",
            parentCategoryId: 5,
            level: "Category",
            categoryImageUrl: "https://example.com/images/audio.jpg",
            status: "active",
            createdAt: "2024-08-24T09:10:00Z",
            updatedAt: "2024-08-24T09:10:00Z",
          },
        ],
      },
    ],
    attributes: [
      {
        id: 5,
        name: "Color",
        attributeValues: [
          {
            id: 8,
            attributeId: 5,
            value: "Black",
          },
          {
            id: 9,
            attributeId: 5,
            value: "White",
          },
        ],
      },
    ],
    variants: [
      {
        id: 4,
        variantName: "Wireless Earbuds - Black",
        description: "Black Color",
        price: 89.99,
        stockQuantity: 100,
        sku: "EARBUDS-BLK",
        status: "active",
        createdAt: "2024-08-24T10:00:00Z",
        updatedAt: "2024-08-24T12:00:00Z",
        images: [
          {
            id: 4,
            fileName: "wireless-earbuds-black",
            description: "Black color variant of wireless earbuds",
            fileType: "image",
            filePublicId: "cloudinary_public_id_127",
            fileSize: 150000,
            fileUrl: "https://www.startech.com.bd/image/cache/catalog/earbuds/earfun/free-2s/free-2s-01-500x500.webp",
            fileSecureUrl: "https://secure.example.com/files/wireless-earbuds-black",
            uploadedBy: 3,
            associatedEntityId: 4,
            status: "active",
            createdAt: "2024-08-24T10:00:00Z",
            updatedAt: "2024-08-24T12:00:00Z",
          },
        ],
        attributes: [
          {
            id: 5,
            name: "Color",
            attributeValues: [
              {
                id: 8,
                attributeId: 5,
                value: "Black",
              },
            ],
          },
        ],
      },
    ],
    ratingAverage: {
      id: 703,
      productId: 103,
      averageRating: 4.8,
      ratingCount: 5,
      createdAt: "2024-08-24T12:00:00Z",
      updatedAt: "2024-08-24T12:00:00Z",
    },
    reviews: [
      {
        id: 605,
        productId: 103,
        userId: 305,
        rating: 5,
        reviewText: "Great earbuds with amazing sound quality!",
        images: [],
        createdAt: "2024-08-24T12:00:00Z",
        updatedAt: "2024-08-24T12:00:00Z",
      },
      {
        id: 606,
        productId: 103,
        userId: 306,
        rating: 4.6,
        reviewText: "Good value for money. The noise cancellation is effective.",
        images: [],
        createdAt: "2024-08-24T12:00:00Z",
        updatedAt: "2024-08-24T12:00:00Z",
      },
    ],
    tags: [
      {
        id: 504,
        productId: 103,
        name: "Wireless",
        createdAt: "2024-08-24T10:00:00Z",
        updatedAt: "2024-08-24T12:00:00Z",
      },
      {
        id: 505,
        productId: 103,
        name: "Noise Cancelling",
        createdAt: "2024-08-24T10:00:00Z",
        updatedAt: "2024-08-24T12:00:00Z",
      },
    ],
    seller: {
      id: 403,
      userId: 203,
      storeName: "TechGuru",
      storeDescription: "The latest in technology and gadgets.",
      storeLogoUrl: "https://example.com/images/techguru-logo.jpg",
      storeBannerUrl: "https://example.com/images/techguru-banner.jpg",
      businessAddress: "789 Gadget St, San Francisco, CA",
      contactNumber: "555-345-6789",
      status: "active",
      createdAt: "2024-08-15T12:34:56Z",
      updatedAt: "2024-08-20T12:34:56Z",
    },
  },
  {
    id: 4,
    productName: "Smart Watch",
    urlSlug: "smart-watch",
    categoryId: 6,
    brandId: 4,
    description: "Feature-rich smart watch with health tracking capabilities.",
    price: 199.99,
    comparePrice: 210.25,
    stockQuantity: 75,
    lowStockThreshold: 10,
    status: "active",
    createdAt: "2024-08-25T10:00:00Z",
    updatedAt: "2024-08-25T12:00:00Z",
    brand: {
      id: 4,
      name: "Apple",
      description: "Leading technology company specializing in consumer electronics.",
      logo: "https://example.com/images/apple-logo.jpg",
      createdAt: "2024-08-25T12:00:00Z",
      updatedAt: "2024-08-25T12:00:00Z",
    },
    images: [
      {
        id: 5,
        fileName: "smart-watch-front",
        description: "Front view of the smart watch",
        fileType: "image",
        filePublicId: "cloudinary_public_id_128",
        fileSize: 250000,
        fileUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKODD4LTCYKpJTC5ET6TF2_F25yDHGJ6A-xg&s",
        fileSecureUrl: "https://secure.example.com/files/smart-watch-front",
        uploadedBy: 4,
        associatedEntityId: 4,
        status: "active",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
    ],
    categories: [
      {
        id: 6,
        categoryName: "Wearables",
        urlSlug: "wearables",
        parentCategoryId: null,
        level: "Collection",
        categoryImageUrl: "https://example.com/images/wearables.jpg",
        status: "active",
        createdAt: "2024-08-25T09:00:00Z",
        updatedAt: "2024-08-25T09:00:00Z",
        subCategories: [
          {
            id: 7,
            categoryName: "Smart Watches",
            urlSlug: "smart-watches",
            parentCategoryId: 6,
            level: "Category",
            categoryImageUrl: "https://example.com/images/smart-watches.jpg",
            status: "active",
            createdAt: "2024-08-25T09:05:00Z",
            updatedAt: "2024-08-25T09:05:00Z",
          },
        ],
      },
    ],
    attributes: [
      {
        id: 6,
        name: "Color",
        attributeValues: [
          {
            id: 10,
            attributeId: 6,
            value: "Silver",
          },
          {
            id: 11,
            attributeId: 6,
            value: "Space Gray",
          },
        ],
      },
    ],
    variants: [
      {
        id: 5,
        variantName: "Smart Watch - Silver",
        description: "Silver Color",
        price: 199.99,
        stockQuantity: 35,
        sku: "WATCH-SLV",
        status: "active",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
        images: [
          {
            id: 5,
            fileName: "smart-watch-silver",
            description: "Silver color variant of smart watch",
            fileType: "image",
            filePublicId: "cloudinary_public_id_129",
            fileSize: 250000,
            fileUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKODD4LTCYKpJTC5ET6TF2_F25yDHGJ6A-xg&s",
            fileSecureUrl: "https://secure.example.com/files/smart-watch-silver",
            uploadedBy: 4,
            associatedEntityId: 5,
            status: "active",
            createdAt: "2024-08-25T10:00:00Z",
            updatedAt: "2024-08-25T12:00:00Z",
          },
        ],
        attributes: [
          {
            id: 6,
            name: "Color",
            attributeValues: [
              {
                id: 10,
                attributeId: 6,
                value: "Silver",
              },
            ],
          },
        ],
      },
    ],
    ratingAverage: {
      id: 704,
      productId: 104,
      averageRating: 4.9,
      ratingCount: 10,
      createdAt: "2024-08-25T12:00:00Z",
      updatedAt: "2024-08-25T12:00:00Z",
    },
    reviews: [
      {
        id: 607,
        productId: 104,
        userId: 307,
        rating: 5,
        reviewText: "The best smart watch I’ve ever owned. Highly recommend!",
        images: [],
        createdAt: "2024-08-25T12:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
      {
        id: 608,
        productId: 104,
        userId: 308,
        rating: 4.8,
        reviewText: "Great features and performance. A bit expensive, but worth it.",
        images: [],
        createdAt: "2024-08-25T12:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
    ],
    tags: [
      {
        id: 506,
        productId: 104,
        name: "Smart",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
      {
        id: 507,
        productId: 104,
        name: "Fitness Tracking",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T12:00:00Z",
      },
    ],
    seller: {
      id: 404,
      userId: 204,
      storeName: "Apple Store",
      storeDescription: "Official store for Apple products.",
      storeLogoUrl: "https://example.com/images/apple-store-logo.jpg",
      storeBannerUrl: "https://example.com/images/apple-store-banner.jpg",
      businessAddress: "123 Tech Lane, Cupertino, CA",
      contactNumber: "555-456-7890",
      status: "active",
      createdAt: "2024-08-15T12:34:56Z",
      updatedAt: "2024-08-20T12:34:56Z",
    },
  },
  {
    id: 5,
    productName: "Eco-Friendly Yoga Mat",
    urlSlug: "eco-friendly-yoga-mat",
    categoryId: 7,
    brandId: 5,
    description: "A non-toxic, eco-friendly yoga mat made from natural rubber.",
    price: 39.99,
    comparePrice: 45.0,
    stockQuantity: 120,
    lowStockThreshold: 15,
    status: "active",
    createdAt: "2024-08-25T11:00:00Z",
    updatedAt: "2024-08-25T13:00:00Z",
    brand: {
      id: 5,
      name: "EcoLife",
      description: "Sustainable products for a greener planet.",
      logo: "https://example.com/images/ecolife-logo.jpg",
      createdAt: "2024-08-25T13:00:00Z",
      updatedAt: "2024-08-25T13:00:00Z",
    },
    images: [
      {
        id: 6,
        fileName: "eco-friendly-yoga-mat",
        description: "Eco-friendly yoga mat",
        fileType: "image",
        filePublicId: "cloudinary_public_id_130",
        fileSize: 180000,
        fileUrl:
          "https://www.medistorebd.com/wp-content/uploads/2024/01/how-to-clean-yoga-mat-getty-0623-1fda4b0532ea4f9787d5f248bbedaf8d.jpg",
        fileSecureUrl: "https://secure.example.com/files/eco-friendly-yoga-mat",
        uploadedBy: 5,
        associatedEntityId: 5,
        status: "active",
        createdAt: "2024-08-25T11:00:00Z",
        updatedAt: "2024-08-25T13:00:00Z",
      },
    ],
    categories: [
      {
        id: 7,
        categoryName: "Fitness",
        urlSlug: "fitness",
        parentCategoryId: null,
        level: "Collection",
        categoryImageUrl: "https://example.com/images/fitness.jpg",
        status: "active",
        createdAt: "2024-08-25T10:00:00Z",
        updatedAt: "2024-08-25T10:00:00Z",
        subCategories: [
          {
            id: 8,
            categoryName: "Yoga",
            urlSlug: "yoga",
            parentCategoryId: 7,
            level: "Category",
            categoryImageUrl: "https://example.com/images/yoga.jpg",
            status: "active",
            createdAt: "2024-08-25T10:05:00Z",
            updatedAt: "2024-08-25T10:05:00Z",
          },
        ],
      },
    ],
    attributes: [
      {
        id: 7,
        name: "Color",
        attributeValues: [
          {
            id: 12,
            attributeId: 7,
            value: "Green",
          },
          {
            id: 13,
            attributeId: 7,
            value: "Blue",
          },
        ],
      },
    ],
    variants: [
      {
        id: 6,
        variantName: "Eco-Friendly Yoga Mat - Green",
        description: "Green Color",
        price: 39.99,
        stockQuantity: 60,
        sku: "MAT-GRN",
        status: "active",
        createdAt: "2024-08-25T11:00:00Z",
        updatedAt: "2024-08-25T13:00:00Z",
        images: [
          {
            id: 6,
            fileName: "eco-friendly-yoga-mat-green",
            description: "Green color variant of the yoga mat",
            fileType: "image",
            filePublicId: "cloudinary_public_id_131",
            fileSize: 180000,
            fileUrl:
              "https://www.medistorebd.com/wp-content/uploads/2024/01/how-to-clean-yoga-mat-getty-0623-1fda4b0532ea4f9787d5f248bbedaf8d.jpg",
            fileSecureUrl: "https://secure.example.com/files/eco-friendly-yoga-mat-green",
            uploadedBy: 5,
            associatedEntityId: 6,
            status: "active",
            createdAt: "2024-08-25T11:00:00Z",
            updatedAt: "2024-08-25T13:00:00Z",
          },
        ],
        attributes: [
          {
            id: 7,
            name: "Color",
            attributeValues: [
              {
                id: 12,
                attributeId: 7,
                value: "Green",
              },
            ],
          },
        ],
      },
    ],
    ratingAverage: {
      id: 705,
      productId: 105,
      averageRating: 4.7,
      ratingCount: 8,
      createdAt: "2024-08-25T13:00:00Z",
      updatedAt: "2024-08-25T13:00:00Z",
    },
    reviews: [
      {
        id: 609,
        productId: 105,
        userId: 309,
        rating: 5,
        reviewText: "I love this yoga mat! It's eco-friendly and has great grip.",
        images: [],
        createdAt: "2024-08-25T13:00:00Z",
        updatedAt: "2024-08-25T13:00:00Z",
      },
      {
        id: 610,
        productId: 105,
        userId: 310,
        rating: 4.5,
        reviewText: "Great quality mat, but it could use a bit more cushioning.",
        images: [],
        createdAt: "2024-08-25T13:00:00Z",
        updatedAt: "2024-08-25T13:00:00Z",
      },
    ],
    tags: [
      {
        id: 508,
        productId: 105,
        name: "Eco-Friendly",
        createdAt: "2024-08-25T11:00:00Z",
        updatedAt: "2024-08-25T13:00:00Z",
      },
      {
        id: 509,
        productId: 105,
        name: "Yoga",
        createdAt: "2024-08-25T11:00:00Z",
        updatedAt: "2024-08-25T13:00:00Z",
      },
    ],
    seller: {
      id: 405,
      userId: 205,
      storeName: "EcoLife Store",
      storeDescription: "Eco-friendly and sustainable products.",
      storeLogoUrl: "https://example.com/images/ecolife-store-logo.jpg",
      storeBannerUrl: "https://example.com/images/ecolife-store-banner.jpg",
      businessAddress: "456 Green Rd, Portland, OR",
      contactNumber: "555-567-8901",
      status: "active",
      createdAt: "2024-08-15T12:34:56Z",
      updatedAt: "2024-08-20T12:34:56Z",
    },
  },
];
