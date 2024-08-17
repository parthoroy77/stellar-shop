[
  {
    id: "clothing-product-001",
    name: "Premium Cotton T-Shirt",
    category: {
      main: "Clothing",
      subcategories: ["Men", "T-Shirts"],
    },
    description: "A high-quality, 100% cotton t-shirt that is comfortable and stylish. Perfect for everyday wear.",
    images: [
      {
        url: "https://example.com/images/tshirt_main.jpg",
        alt: "Main image of Premium Cotton T-Shirt",
      },
      {
        url: "https://example.com/images/tshirt_1.jpg",
        alt: "Additional view of Premium Cotton T-Shirt",
      },
    ],
    videos: [
      {
        url: "https://example.com/videos/tshirt_demo.mp4",
        type: "promo",
      },
    ],
    "3dView": "https://example.com/3dview/tshirt",
    brand: "FashionBrand",
    price: 29.99,
    currency: "USD",
    discount: {
      percentage: 15,
      validUntil: "2024-12-31",
    },
    stock: {
      quantity: 200,
      lowStockThreshold: 10,
      stockStatus: "In Stock",
    },
    tags: ["New Arrival", "Best Seller"],
    sku: "TSHIRT2024",
    upc: "987654321098",
    manufacturer: "FashionCo",
    manufactureDate: "2024-05-01",
    expiryDate: "2025-05-01",
    returnPolicy: "30-day return policy.",
    warrantyDetails: "1-year warranty on manufacturing defects.",
    attributes: {
      Size: ["S", "M", "L", "XL"],
      Color: ["Black", "White", "Gray"],
      Material: "100% Cotton",
      Fit: "Regular",
      CareInstructions: "Machine wash cold, tumble dry low.",
    },
    variants: [
      {
        id: "variant-id-001",
        attributes: {
          Color: "Black",
          Size: "M",
        },
        price: 29.99,
        stock: 80,
      },
      {
        id: "variant-id-002",
        attributes: {
          Color: "White",
          Size: "L",
        },
        price: 29.99,
        stock: 60,
      },
    ],
    ratings: {
      average: 4.7,
      count: 500,
      reviews: [
        {
          id: "review-id-001",
          user: "fashionLover123",
          rating: 5,
          comment: "Excellent quality and fit!",
          date: "2024-06-15",
        },
        {
          id: "review-id-002",
          user: "styleGuru456",
          rating: 4,
          comment: "Very comfortable, but wish there were more color options.",
          date: "2024-07-01",
        },
      ],
    },
    shipping: {
      weight: "200g",
      dimensions: {
        length: "25 cm",
        width: "20 cm",
        height: "5 cm",
      },
      options: ["Standard Shipping", "Express Shipping"],
      freeShipping: true,
      deliveryTime: "2-4 business days",
      availability: {
        countries: ["US", "Canada", "UK"],
      },
    },
    promotions: {
      bundleOffers: ["Buy 2 Get 1 Free"],
      limitedTimeOffer: "Free shipping on orders over $50.",
    },
    ecoFriendly: true,
    certifications: ["Organic Cotton Certified"],
    legalDisclaimer: "Color may vary slightly from images.",
    compliance: ["OEKO-TEX"],
    customerSupport: {
      contactEmail: "support@fashionbrand.com",
      contactPhone: "+1234567890",
      supportHours: "Mon-Fri 9am-6pm",
    },
    customizationOptions: {
      engraving: false,
      customMessage: true,
    },
    analytics: {
      viewCount: 12000,
      purchaseCount: 3000,
    },
    relatedProducts: ["related-tshirt-id-001", "related-tshirt-id-002"],
    questionsAndAnswers: [
      {
        questionId: "qa-tshirt-001",
        question: "Is this t-shirt pre-shrunk?",
        answers: [
          {
            answerId: "answer-tshirt-001",
            user: "fashionExpert",
            answer: "Yes, this t-shirt is pre-shrunk to maintain its size after washing.",
          },
        ],
      },
    ],
    communityPosts: ["community-post-tshirt-id-001", "community-post-tshirt-id-002"],
    digitalGoodsInfo: null,
    options: [
      {
        type: "wishlist",
        available: true,
      },
      {
        type: "share",
        available: true,
      },
    ],
    seller: {
      id: "seller-id-456",
      name: "FashionStore",
      rating: 4.9,
    },
  },
];
