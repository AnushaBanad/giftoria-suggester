
import { GiftSuggestion } from "@/utils/userPreferences";

// Expanded list of interests
export const interests = [
  "Technology", "Books", "Fashion", "Music", "Gaming", 
  "Beauty", "Jewelry", "Home Decor", "Sports", "Cooking", 
  "Travel", "Art", "Fitness", "Photography", "Gardening",
  "DIY Crafts", "Pets", "Outdoors", "Collectibles", "Stationery"
];

// Mapping interests to relevant occasions
export const interestToOccasions: Record<string, string[]> = {
  "Technology": ["Birthday", "Anniversary", "Graduation", "Housewarming", "Corporate Gifts", "Christmas", "New Year"],
  "Books": ["Birthday", "Graduation", "Retirement", "Holiday", "Corporate Gifts", "Mother's Day", "Father's Day"],
  "Fashion": ["Birthday", "Anniversary", "Wedding", "Holiday", "Graduation", "Valentine's Day"],
  "Music": ["Birthday", "Anniversary", "Graduation", "Holiday", "Valentine's Day", "Christmas"],
  "Gaming": ["Birthday", "Graduation", "Holiday", "Friendship Day", "Christmas", "New Year"],
  "Beauty": ["Birthday", "Anniversary", "Valentine's Day", "Mother's Day", "Wedding", "Holiday Party"],
  "Jewelry": ["Birthday", "Anniversary", "Valentine's Day", "Mother's Day", "Wedding", "Engagement", "Christmas"],
  "Home Decor": ["Housewarming", "Wedding", "Anniversary", "Holiday", "Retirement", "New Home"],
  "Sports": ["Birthday", "Father's Day", "Friendship Day", "Christmas", "Achievement Celebration"],
  "Cooking": ["Housewarming", "Wedding", "Anniversary", "Holiday", "Mother's Day", "Christmas"],
  "Travel": ["Anniversary", "Retirement", "Graduation", "Wedding", "Honeymoon", "Birthday"],
  "Art": ["Birthday", "Housewarming", "Wedding", "Anniversary", "Graduation", "Christmas"],
  "Fitness": ["Birthday", "New Year", "Achievement Celebration", "Holiday", "Father's Day"],
  "Photography": ["Birthday", "Graduation", "Anniversary", "Holiday", "Travel Celebration"],
  "Gardening": ["Housewarming", "Birthday", "Mother's Day", "Retirement", "Spring Celebration"],
  "DIY Crafts": ["Birthday", "Holiday", "Mother's Day", "Kids Birthday", "Teacher Appreciation"],
  "Pets": ["Birthday", "New Pet", "Holiday", "Anniversary", "Pet Birthday"],
  "Outdoors": ["Birthday", "Father's Day", "Summer Celebration", "Graduation", "Retirement"],
  "Collectibles": ["Birthday", "Anniversary", "Holiday", "Graduation", "Achievement Celebration"],
  "Stationery": ["Graduation", "Back to School", "New Job", "Birthday", "Teacher Appreciation"]
};

// All possible occasions
export const allOccasions = [
  "Birthday", "Anniversary", "Wedding", "Graduation", "Housewarming", 
  "Valentine's Day", "Mother's Day", "Father's Day", "Holiday", 
  "Retirement", "Corporate Gifts", "Friendship Day", "Baby Shower",
  "Christmas", "New Year", "Engagement", "New Home", "Achievement Celebration",
  "Holiday Party", "New Pet", "Kids Birthday", "Teacher Appreciation",
  "Spring Celebration", "Summer Celebration", "Back to School", "New Job",
  "Travel Celebration", "Pet Birthday", "Honeymoon"
];

// Helper function to get interest-based gift suggestions
export const getInterestBasedGiftSuggestions = (interest: string, budget: number, occasion: string): GiftSuggestion[] => {
  if (!giftDatabase[interest]) return [];
  
  return giftDatabase[interest].filter(gift => 
    gift.price <= budget && 
    interestToOccasions[interest]?.includes(occasion)
  );
};

// Helper function to get relevant gift images based on budget and interests
export const getRelevantGiftImage = (budget: number, interests: string[]): string => {
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  // Try to find an image for the primary interest
  if (interests.length > 0) {
    const primaryInterest = interests[0];
    if (giftImagesByCategory[budgetCategory]?.[primaryInterest]?.length > 0) {
      const images = giftImagesByCategory[budgetCategory][primaryInterest];
      return images[Math.floor(Math.random() * images.length)];
    }
  }
  
  // Fallback to default images for the budget category
  if (giftImagesByCategory[budgetCategory]?.default?.length > 0) {
    const defaultImages = giftImagesByCategory[budgetCategory].default;
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }
  
  // Final fallback to generic default images
  return giftImagesByCategory.default.default[Math.floor(Math.random() * giftImagesByCategory.default.default.length)];
};

// Alternative shops based on budget categories
export const alternativeShops: Record<string, Record<string, string>> = {
  "Low Budget": {
    "Technology": "https://www.meesho.com/tech-gadgets-under-500",
    "Books": "https://www.meesho.com/books-under-500",
    "Fashion": "https://www.meesho.com/fashion-under-500",
    "Music": "https://www.meesho.com/music-accessories-under-500",
    "Gaming": "https://www.meesho.com/gaming-accessories-under-500",
    "Beauty": "https://www.meesho.com/beauty-products-under-500",
    "Jewelry": "https://www.meesho.com/jewelry-under-500",
    "Home Decor": "https://www.meesho.com/home-decor-under-500",
    "Sports": "https://www.meesho.com/sports-accessories-under-500",
    "Cooking": "https://www.meesho.com/kitchen-accessories-under-500"
  },
  "Medium Budget": {
    "Technology": "https://www.meesho.com/tech-gadgets-under-5000",
    "Books": "https://www.meesho.com/premium-books-collections",
    "Fashion": "https://www.meesho.com/fashion-under-5000",
    "Music": "https://www.meesho.com/music-accessories-premium",
    "Gaming": "https://www.meesho.com/gaming-accessories-premium",
    "Beauty": "https://www.meesho.com/beauty-products-premium",
    "Jewelry": "https://www.meesho.com/jewelry-under-5000",
    "Home Decor": "https://www.meesho.com/home-decor-premium",
    "Sports": "https://www.meesho.com/sports-accessories-premium",
    "Cooking": "https://www.meesho.com/kitchen-accessories-premium"
  },
  "High Budget": {
    "Technology": "https://www.meesho.com/tech-gadgets-premium",
    "Books": "https://www.meesho.com/luxury-book-collections",
    "Fashion": "https://www.meesho.com/fashion-premium",
    "Music": "https://www.meesho.com/music-accessories-luxury",
    "Gaming": "https://www.meesho.com/gaming-accessories-luxury",
    "Beauty": "https://www.meesho.com/beauty-products-luxury",
    "Jewelry": "https://www.meesho.com/jewelry-premium",
    "Home Decor": "https://www.meesho.com/home-decor-luxury",
    "Sports": "https://www.meesho.com/sports-accessories-luxury",
    "Cooking": "https://www.meesho.com/kitchen-accessories-luxury"
  }
};

// Enhanced gift image mapping based on categories and budget
export const giftImagesByCategory: Record<string, Record<string, string[]>> = {
  "Low Budget": {
    "Technology": [
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Books": [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Fashion": [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1511652022419-a9419f74343d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Music": [
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Gaming": [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586182987320-4f17e36370b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Beauty": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Jewelry": [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603050927325-baf630505e27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576022162028-7808c0a9d6bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Sports": [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Cooking": [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "default": [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ]
  },
  "Medium Budget": {
    "Technology": [
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Fashion": [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Home Decor": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Jewelry": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630019852942-7a3592136ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "default": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ]
  },
  "High Budget": {
    "Technology": [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603644448048-73b66334408f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Jewelry": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599459182050-2d60fc4aa12f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "Fashion": [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    "default": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ]
  },
  "default": {
    "default": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ]
  }
};

// Gift database with expanded options and multiple images
export const giftDatabase: Record<string, GiftSuggestion[]> = {
  "Technology": [
    {
      name: "Wireless Earbuds",
      price: 1200,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "High-quality wireless earbuds with noise cancellation",
      shopLink: "https://www.meesho.com/tech",
      additionalImages: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Smart Watch",
      price: 2500,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Fitness tracking smart watch with heart rate monitor",
      shopLink: "https://www.meesho.com/tech",
      additionalImages: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Tech Accessory Bundle",
      price: 499,
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Affordable bundle of tech accessories including cables and adapters",
      shopLink: "https://www.meesho.com/tech-accessories",
      additionalImages: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600080971135-5c76b6bbe76f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Books": [
    {
      name: "Best-selling Novel",
      price: 350,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Award-winning fiction novel by a renowned author",
      shopLink: "https://www.meesho.com/books",
      additionalImages: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Self-Help Book",
      price: 450,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Bestselling self-improvement book for personal growth",
      shopLink: "https://www.meesho.com/books",
      additionalImages: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Fashion": [
    {
      name: "Designer Wallet",
      price: 1200,
      image: "https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Stylish leather wallet with multiple compartments",
      shopLink: "https://www.meesho.com/fashion",
      additionalImages: [
        "https://images.unsplash.com/photo-1585504156745-95a1e1f49cfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1559478405-583afdc82291?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Scarf Set",
      price: 500,
      image: "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Elegant scarf set for all occasions",
      shopLink: "https://www.meesho.com/fashion",
      additionalImages: [
        "https://images.unsplash.com/photo-1586953936333-366880552526?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Trendy Sunglasses",
      price: 450,
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Fashion-forward sunglasses with UV protection",
      shopLink: "https://www.meesho.com/fashion/accessories",
      additionalImages: [
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1550686041-366ad85a1355?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Designer Watch",
      price: 1800,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Elegant timepiece for the fashion-conscious individual",
      shopLink: "https://www.meesho.com/fashion/watches",
      additionalImages: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1619134778706-7015bea8e407?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Music": [
    {
      name: "Portable Bluetooth Speaker",
      price: 800,
      image: "https://images.unsplash.com/photo-1589003077984-894e133f8885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Compact speaker with excellent sound quality",
      shopLink: "https://www.meesho.com/music",
      additionalImages: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Vinyl Record Collection",
      price: 1500,
      image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Curated collection of classic vinyl records",
      shopLink: "https://www.meesho.com/music",
      additionalImages: [
        "https://images.unsplash.com/photo-1603048588665-791ca91d0e98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1601643157091-ce5c665179ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Gaming": [
    {
      name: "Gaming Mouse",
      price: 750,
      image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "High-precision gaming mouse with RGB lighting",
      shopLink: "https://www.meesho.com/gaming",
      additionalImages: [
        "https://images.unsplash.com/photo-1629429408209-1f6f43827828?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1603381782058-ada3d95bca98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Gaming Headset",
      price: 1200,
      image: "https://images.unsplash.com/photo-1591105575633-922c8897af9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Comfortable headset with surround sound for immersive gaming",
      shopLink: "https://www.meesho.com/gaming",
      additionalImages: [
        "https://images.unsplash.com/photo-1607016284318-d1384f89cb3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Beauty": [
    {
      name: "Luxury Skincare Set",
      price: 1800,
      image: "https://images.unsplash.com/photo-1615760134953-e9d1cc1cb1a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Premium skincare collection for radiant skin",
      shopLink: "https://www.meesho.com/beauty",
      additionalImages: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Makeup Palette",
      price: 900,
      image: "https://images.unsplash.com/photo-1612878010854-1250dfc5000a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Versatile makeup palette with essential colors",
      shopLink: "https://www.meesho.com/beauty",
      additionalImages: [
        "https://images.unsplash.com/photo-1596704017254-9759221a48f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Fragrance Collection",
      price: 1200,
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Exquisite collection of premium fragrances",
      shopLink: "https://www.meesho.com/beauty/fragrance",
      additionalImages: [
        "https://images.unsplash.com/photo-1592842232655-e5d3dff2496c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1558386619-d39e4a28518b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Premium Hair Care Kit",
      price: 850,
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Complete hair care regimen for healthy, shiny hair",
      shopLink: "https://www.meesho.com/beauty/hair",
      additionalImages: [
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1643704329576-e479d718ad21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Jewelry": [
    {
      name: "Silver Pendant Necklace",
      price: 650,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Elegant silver pendant necklace perfect for any occasion",
      shopLink: "https://www.meesho.com/jewelry",
      additionalImages: [
        "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Gold Bracelet",
      price: 2200,
      image: "https://images.unsplash.com/photo-1602752250015-52b8f9649f54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Stunning gold bracelet with intricate design",
      shopLink: "https://www.meesho.com/jewelry/bracelets",
      additionalImages: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Pearl Earrings",
      price: 900,
      image: "https://images.unsplash.com/photo-1573227895226-66130a1cb638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Classic pearl earrings that add elegance to any outfit",
      shopLink: "https://www.meesho.com/jewelry/earrings",
      additionalImages: [
        "https://images.unsplash.com/photo-1630019852942-7a3592136ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Home Decor": [
    {
      name: "Decorative Throw Pillows",
      price: 600,
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Set of stylish throw pillows to enhance your living space",
      shopLink: "https://www.meesho.com/home-decor",
      additionalImages: [
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Scented Candle Set",
      price: 450,
      image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Collection of premium scented candles for ambiance",
      shopLink: "https://www.meesho.com/home-decor/candles",
      additionalImages: [
        "https://images.unsplash.com/photo-1602307362817-f28070951546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1603807021874-f8f9fb920808?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ],
  "Sports": [
    {
      name: "Yoga Mat",
      price: 700,
      image: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "High-quality non-slip yoga mat for comfortable practice",
      shopLink: "https://www.meesho.com/sports/yoga",
      additionalImages: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      name: "Sports Water Bottle",
      price: 350,
      image: "https://images.unsplash.com/photo-1570088838015-92cd028dc4b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Durable sports water bottle with leak-proof design",
      shopLink: "https://www.meesho.com/sports/accessories",
      additionalImages: [
        "https://images.unsplash.com/photo-1550505095-81378a674395?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1585155784229-aff921ccfa10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ]
};
