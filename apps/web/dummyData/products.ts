const products = [
  {
    id: "apparel-001",
    name: "Men's Casual T-Shirt",
    category: {
      main: "Apparel & Accessories",
      subcategories: ["Men's Clothing", "T-Shirts"],
    },
    description: "A comfortable and stylish casual t-shirt for everyday wear.",
    images: [
      {
        url: "https://example.com/images/tshirt_main.jpg",
        alt: "Main image of Men's Casual T-Shirt",
      },
      {
        url: "https://example.com/images/tshirt_1.jpg",
        alt: "Side view of Men's Casual T-Shirt",
      },
    ],
    videos: [
      {
        url: "https://example.com/videos/tshirt_demo.mp4",
        type: "promo",
      },
    ],
    brand: "FashionBrand",
    price: 29.99,
    currency: "USD",
    discount: {
      percentage: 10,
      validUntil: "2025-12-31",
    },
    stock: {
      quantity: 150,
      lowStockThreshold: 10,
      stockStatus: "In Stock",
    },
    tags: ["New Arrival", "Summer Collection"],
    sku: "TSHIRT-001",
    upc: "123456789012",
    manufacturer: "ClothingCo",
    manufactureDate: "2024-01-01",
    expiryDate: "2025-01-01",
    returnPolicy: "30-day return policy",
    warrantyDetails: "No warranty",
    attributes: {
      Size: ["S", "M", "L", "XL"],
      Color: ["Black", "White", "Grey"],
      Material: "Cotton",
      Fit: "Regular",
      CareInstructions: "Machine wash cold.",
    },
    variants: [
      {
        id: "variant-001",
        attributes: {
          Color: "Black",
          Size: "M",
        },
        price: 29.99,
        stock: 50,
      },
      {
        id: "variant-002",
        attributes: {
          Color: "White",
          Size: "L",
        },
        price: 27.99,
        stock: 30,
      },
    ],
    ratings: {
      average: 4.2,
      count: 250,
      reviews: [
        {
          id: "review-001",
          user: "user123",
          rating: 5,
          comment: "Great t-shirt, very comfortable!",
          date: "2024-06-01",
        },
        {
          id: "review-002",
          user: "user456",
          rating: 4,
          comment: "Good quality but runs a bit small.",
          date: "2024-05-15",
        },
      ],
    },
    shipping: {
      weight: "200g",
      dimensions: {
        length: "30 cm",
        width: "25 cm",
        height: "5 cm",
      },
      options: ["Standard Shipping", "Express Shipping"],
      freeShipping: true,
      deliveryTime: "5-7 business days",
      availability: {
        countries: ["US", "Canada", "UK"],
      },
    },
    promotions: {
      bundleOffers: ["Buy 2 Get 1 Free"],
      limitedTimeOffer: "10% off on first purchase.",
    },
    ecoFriendly: true,
    certifications: ["Fair Trade Certified"],
    legalDisclaimer: "For sizing information, refer to the size chart.",
    compliance: ["OEKO-TEX"],
    customerSupport: {
      contactEmail: "support@fashionbrand.com",
      contactPhone: "+1234567890",
      supportHours: "Mon-Fri 9am-5pm",
    },
    customizationOptions: {
      engraving: false,
      customMessage: false,
    },
    analytics: {
      viewCount: 5000,
      purchaseCount: 1000,
    },
    relatedProducts: ["apparel-002", "apparel-003"],
    questionsAndAnswers: [
      {
        questionId: "qa1",
        question: "Is this t-shirt pre-shrunk?",
        answers: [
          {
            answerId: "answer1",
            user: "seller123",
            answer: "Yes, this t-shirt is pre-shrunk.",
          },
        ],
      },
    ],
    communityPosts: ["community-post-001"],
    digitalGoodsInfo: {
      fileFormat: "N/A",
      licenseType: "N/A",
      downloadLink: "N/A",
    },
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
      id: "seller-001",
      name: "Fashion Seller",
      rating: 4.8,
    },
  },
  {
    id: "electronics-001",
    name: "Wireless Headphones",
    category: {
      main: "Electronics",
      subcategories: ["Audio & Headphones"],
    },
    description: "High-quality wireless headphones with noise-cancellation feature.",
    images: [
      {
        url: "https://example.com/images/headphones_main.jpg",
        alt: "Main image of Wireless Headphones",
      },
      {
        url: "https://example.com/images/headphones_side.jpg",
        alt: "Side view of Wireless Headphones",
      },
    ],
    videos: [
      {
        url: "https://example.com/videos/headphones_demo.mp4",
        type: "promo",
      },
    ],

    brand: "TechBrand",
    price: 149.99,
    currency: "USD",
    discount: {
      percentage: 15,
      validUntil: "2025-12-31",
    },
    stock: {
      quantity: 75,
      lowStockThreshold: 10,
      stockStatus: "In Stock",
    },
    tags: ["Best Seller", "New Arrival"],
    sku: "HEADPHONES-001",
    upc: "987654321098",
    manufacturer: "ElectroCo",
    manufactureDate: "2024-02-01",
    expiryDate: "N/A",
    returnPolicy: "30-day return policy",
    warrantyDetails: "1-year warranty",
    attributes: {
      Model: "WH-1000XM4",
      Color: ["Black", "Silver"],
      BatteryLife: "30 hours",
      Connectivity: ["Bluetooth", "Wired"],
      NoiseCancellation: "Active",
      SoundQuality: "Hi-Fi",
    },
    variants: [
      {
        id: "variant-001",
        attributes: {
          Color: "Black",
        },
        price: 149.99,
        stock: 40,
      },
      {
        id: "variant-002",
        attributes: {
          Color: "Silver",
        },
        price: 159.99,
        stock: 35,
      },
    ],
    ratings: {
      average: 4.7,
      count: 500,
      reviews: [
        {
          id: "review-001",
          user: "user789",
          rating: 5,
          comment: "Excellent sound quality and comfort.",
          date: "2024-07-01",
        },
        {
          id: "review-002",
          user: "user012",
          rating: 4,
          comment: "Great headphones but a bit pricey.",
          date: "2024-06-15",
        },
      ],
    },
    shipping: {
      weight: "250g",
      dimensions: {
        length: "20 cm",
        width: "20 cm",
        height: "10 cm",
      },
      options: ["Standard Shipping", "Express Shipping"],
      freeShipping: false,
      deliveryTime: "3-5 business days",
      availability: {
        countries: ["US", "Canada", "UK"],
      },
    },
    promotions: {
      bundleOffers: ["Buy one, get 10% off on accessories"],
      limitedTimeOffer: "Free shipping on orders over $100.",
    },
    ecoFriendly: true,
    certifications: ["CE", "FCC"],
    legalDisclaimer: "For detailed specifications, please refer to the user manual.",
    compliance: ["CE", "FCC"],
    customerSupport: {
      contactEmail: "support@techbrand.com",
      contactPhone: "+1234567890",
      supportHours: "Mon-Fri 9am-6pm",
    },
    customizationOptions: {
      engraving: false,
      customMessage: false,
    },
    analytics: {
      viewCount: 8000,
      purchaseCount: 1500,
    },
    relatedProducts: ["electronics-002", "electronics-003"],
    questionsAndAnswers: [
      {
        questionId: "qa2",
        question: "Does it come with a carrying case?",
        answers: [
          {
            answerId: "answer2",
            user: "seller456",
            answer: "Yes, a carrying case is included.",
          },
        ],
      },
    ],
    communityPosts: ["community-post-002"],
    digitalGoodsInfo: {
      fileFormat: "N/A",
      licenseType: "N/A",
      downloadLink: "N/A",
    },
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
      id: "seller-002",
      name: "Tech Seller",
      rating: 4.9,
    },
  },
  {
    id: "beauty-001",
    name: "Hydrating Facial Serum",
    category: {
      main: "Beauty & Health",
      subcategories: ["Skincare", "Serums"],
    },
    description: "A nourishing serum that hydrates and revitalizes the skin.",
    images: [
      {
        url: "https://example.com/images/serum_main.jpg",
        alt: "Main image of Hydrating Facial Serum",
      },
    ],
    price: 49.99,
    currency: "USD",
    brand: "BeautyBrand",
    ingredients: ["Hyaluronic Acid", "Vitamin C"],
    skinType: ["All", "Dry", "Sensitive"],
    benefits: ["Hydrating", "Anti-aging"],
    expiryDate: "2025-01-01",
    stock: {
      quantity: 200,
      lowStockThreshold: 20,
      stockStatus: "In Stock",
    },
    tags: ["New Arrival", "Best Seller"],
    sku: "SERUM-001",
    manufacturer: "BeautyCo",
    manufactureDate: "2024-01-01",
    returnPolicy: "30-day return policy",
    warrantyDetails: "No warranty",
    attributes: {
      Size: "30ml",
      Packaging: "Glass Bottle",
      Fragrance: "Fragrance-Free",
    },
    variants: [],
    ratings: {
      average: 4.5,
      count: 300,
      reviews: [
        {
          id: "review-003",
          user: "user345",
          rating: 5,
          comment: "My skin feels amazing after using this serum!",
          date: "2024-07-15",
        },
        {
          id: "review-004",
          user: "user678",
          rating: 4,
          comment: "Great serum, but a bit pricey.",
          date: "2024-06-10",
        },
      ],
    },
    shipping: {
      weight: "100g",
      dimensions: {
        length: "10 cm",
        width: "5 cm",
        height: "5 cm",
      },
      options: ["Standard Shipping", "Express Shipping"],
      freeShipping: true,
      deliveryTime: "5-7 business days",
      availability: {
        countries: ["US", "Canada", "Australia"],
      },
    },
    promotions: {
      bundleOffers: ["Buy 2, get 1 free"],
      limitedTimeOffer: "20% off on first purchase.",
    },
    ecoFriendly: true,
    certifications: ["Cruelty-Free", "Organic"],
    legalDisclaimer: "For external use only.",
    compliance: ["FDA"],
    customerSupport: {
      contactEmail: "support@beautybrand.com",
      contactPhone: "+1234567890",
      supportHours: "Mon-Fri 9am-5pm",
    },
    customizationOptions: {
      engraving: false,
      customMessage: false,
    },
    analytics: {
      viewCount: 6000,
      purchaseCount: 1200,
    },
    relatedProducts: ["beauty-002", "beauty-003"],
    questionsAndAnswers: [
      {
        questionId: "qa3",
        question: "Is this serum suitable for oily skin?",
        answers: [
          {
            answerId: "answer3",
            user: "seller789",
            answer: "Yes, this serum is suitable for all skin types, including oily skin.",
          },
        ],
      },
    ],
    communityPosts: ["community-post-003"],
    digitalGoodsInfo: {
      fileFormat: "N/A",
      licenseType: "N/A",
      downloadLink: "N/A",
    },
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
      id: "seller-003",
      name: "Beauty Seller",
      rating: 4.7,
    },
  },
  {
    id: "food-001",
    name: "Organic Almond Butter",
    category: {
      main: "Food & Beverage",
      subcategories: ["Snacks", "Nut Butters"],
    },
    description: "Smooth and creamy almond butter made from organic almonds.",
    images: [
      {
        url: "https://example.com/images/almond_butter_main.jpg",
        alt: "Main image of Organic Almond Butter",
      },
    ],
    price: 12.99,
    currency: "USD",
    brand: "NutBrand",
    ingredients: ["Organic Almonds", "Salt"],
    nutritionalInfo: {
      Calories: 200,
      Protein: "7g",
      Fat: "18g",
      Carbohydrates: "6g",
    },
    allergenWarnings: "Contains nuts.",
    expiryDate: "2025-06-01",
    stock: {
      quantity: 300,
      lowStockThreshold: 30,
      stockStatus: "In Stock",
    },
    tags: ["Organic", "Vegan"],
    sku: "ALMOND-001",
    manufacturer: "NutCo",
    manufactureDate: "2024-01-01",
    returnPolicy: "30-day return policy",
    warrantyDetails: "No warranty",
    attributes: {
      Size: "250g",
      Packaging: "Glass Jar",
      Flavor: "Original",
    },
    variants: [],
    ratings: {
      average: 4.8,
      count: 150,
      reviews: [
        {
          id: "review-005",
          user: "user901",
          rating: 5,
          comment: "Best almond butter I've ever tasted!",
          date: "2024-07-20",
        },
        {
          id: "review-006",
          user: "user234",
          rating: 4,
          comment: "Very good, but a bit expensive.",
          date: "2024-06-05",
        },
      ],
    },
    shipping: {
      weight: "300g",
      dimensions: {
        length: "12 cm",
        width: "8 cm",
        height: "8 cm",
      },
      options: ["Standard Shipping", "Express Shipping"],
      freeShipping: false,
      deliveryTime: "5-7 business days",
      availability: {
        countries: ["US", "Canada", "Mexico"],
      },
    },
    promotions: {
      bundleOffers: ["Buy 3, get 1 free"],
      limitedTimeOffer: "Free shipping on orders over $50.",
    },
    ecoFriendly: true,
    certifications: ["Organic", "Non-GMO"],
    legalDisclaimer: "Keep in a cool, dry place.",
    compliance: ["FDA"],
    customerSupport: {
      contactEmail: "support@nutbrand.com",
      contactPhone: "+1234567890",
      supportHours: "Mon-Fri 9am-5pm",
    },
    customizationOptions: {
      engraving: false,
      customMessage: false,
    },
    analytics: {
      viewCount: 7000,
      purchaseCount: 1100,
    },
    relatedProducts: ["food-002", "food-003"],
    questionsAndAnswers: [
      {
        questionId: "qa4",
        question: "Is this almond butter raw or roasted?",
        answers: [
          {
            answerId: "answer4",
            user: "seller012",
            answer: "This almond butter is made from roasted almonds.",
          },
        ],
      },
    ],
    communityPosts: ["community-post-004"],
    digitalGoodsInfo: {
      fileFormat: "N/A",
      licenseType: "N/A",
      downloadLink: "N/A",
    },
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
      id: "seller-004",
      name: "Nut Seller",
      rating: 4.9,
    },
  },
  {
    id: "home-001",
    name: "Stainless Steel Blender",
    category: {
      main: "Home & Kitchen",
      subcategories: ["Kitchen Appliances", "Blenders"],
    },
    description: "A powerful stainless steel blender with multiple speed settings.",
    images: [
      {
        url: "https://example.com/images/blender_main.jpg",
        alt: "Main image of Stainless Steel Blender",
      },
    ],
    price: 89.99,
    currency: "USD",
    brand: "HomeBrand",
    wattage: "1000W",
    capacity: "1.5L",
    material: "Stainless Steel",
    features: ["Multiple Speed Settings", "Pulse Function"],
    expiryDate: "N/A",
    stock: {
      quantity: 50,
      lowStockThreshold: 5,
      stockStatus: "In Stock",
    },
    tags: ["Top Seller", "New Arrival"],
    sku: "BLENDER-001",
    manufacturer: "HomeAppliancesCo",
    manufactureDate: "2024-03-01",
    returnPolicy: "30-day return policy",
    warrantyDetails: "2-year warranty",
    attributes: {
      Dimensions: "30 x 20 x 20 cm",
      Weight: "2kg",
      Color: "Silver",
    },
    variants: [],
    ratings: {
      average: 4.6,
      count: 200,
      reviews: [
        {
          id: "review-007",
          user: "user567",
          rating: 5,
          comment: "Very powerful and easy to clean!",
          date: "2024-07-25",
        },
        {
          id: "review-008",
          user: "user890",
          rating: 4,
          comment: "Good blender, but a bit noisy.",
          date: "2024-06-20",
        },
      ],
    },
    shipping: {
      weight: "2.5kg",
      dimensions: {
        length: "35 cm",
        width: "25 cm",
        height: "25 cm",
      },
      options: ["Standard Shipping", "Express Shipping"],
      freeShipping: true,
      deliveryTime: "5-7 business days",
      availability: {
        countries: ["US", "Canada", "UK"],
      },
    },
    promotions: {
      bundleOffers: ["Buy 2, get 10% off"],
      limitedTimeOffer: "Free shipping on all orders.",
    },
    ecoFriendly: true,
    certifications: ["CE"],
    legalDisclaimer: "Use according to the user manual.",
    compliance: ["CE"],
    customerSupport: {
      contactEmail: "support@homebrand.com",
      contactPhone: "+1234567890",
      supportHours: "Mon-Fri 9am-6pm",
    },
    customizationOptions: {
      engraving: false,
      customMessage: false,
    },
    analytics: {
      viewCount: 4000,
      purchaseCount: 800,
    },
    relatedProducts: ["home-002", "home-003"],
    questionsAndAnswers: [
      {
        questionId: "qa5",
        question: "Can this blender crush ice?",
        answers: [
          {
            answerId: "answer5",
            user: "seller345",
            answer: "Yes, this blender can crush ice with ease.",
          },
        ],
      },
    ],
    communityPosts: ["community-post-005"],
    digitalGoodsInfo: {
      fileFormat: "N/A",
      licenseType: "N/A",
      downloadLink: "N/A",
    },
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
      id: "seller-005",
      name: "Home Seller",
      rating: 4.8,
    },
  },
];
