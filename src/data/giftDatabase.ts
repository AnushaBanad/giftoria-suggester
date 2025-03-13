
export interface GiftSuggestion {
  name: string;
  price: number;
  image: string;
  description: string;
  shopLink: string;
}

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

// Enhanced gift image mapping based on categories and budget
export const giftImagesByCategory: Record<string, Record<string, string[]>> = {
  "Low Budget": {
    "Technology": [
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Books": [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Fashion": [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1511652022419-a9419f74343d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Music": [
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Gaming": [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586182987320-4f17e36370b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Beauty": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Jewelry": [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603050927325-baf630505e27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1576022162028-7808c0a9d6bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Sports": [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Cooking": [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "default": [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  "Medium Budget": {
    "Technology": [
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Fashion": [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Home Decor": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Jewelry": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630019852942-7a3592136ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "default": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  "High Budget": {
    "Technology": [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603644448048-73b66334408f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Jewelry": [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599459182050-2d60fc4aa12f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "Fashion": [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    "default": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  "default": {
    "default": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  }
};

// Gift database with expanded options
export const giftDatabase: Record<string, GiftSuggestion[]> = {
  "Technology": [
    {
      name: "Wireless Earbuds",
      price: 1200,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "High-quality wireless earbuds with noise cancellation",
      shopLink: "https://www.meesho.com/tech"
    },
    {
      name: "Smart Watch",
      price: 2500,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Fitness tracking smart watch with heart rate monitor",
      shopLink: "https://www.meesho.com/tech"
    },
    {
      name: "Tech Accessory Bundle",
      price: 499,
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Affordable bundle of tech accessories including cables and adapters",
      shopLink: "https://www.meesho.com/tech-accessories"
    }
  ],
  "Books": [
    {
      name: "Best-selling Novel",
      price: 350,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Award-winning fiction novel by a renowned author",
      shopLink: "https://www.meesho.com/books"
    },
    {
      name: "Self-Help Book",
      price: 450,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Bestselling self-improvement book for personal growth",
      shopLink: "https://www.meesho.com/books"
    }
  ],
  "Fashion": [
    {
      name: "Designer Wallet",
      price: 1200,
      image: "https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Stylish leather wallet with multiple compartments",
      shopLink: "https://www.meesho.com/fashion"
    },
    {
      name: "Scarf Set",
      price: 500,
      image: "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Elegant scarf set for all occasions",
      shopLink: "https://www.meesho.com/fashion"
    }
  ],
  "Music": [
    {
      name: "Portable Bluetooth Speaker",
      price: 800,
      image: "https://images.unsplash.com/photo-1589003077984-894e133f8885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Compact speaker with excellent sound quality",
      shopLink: "https://www.meesho.com/music"
    },
    {
      name: "Vinyl Record Collection",
      price: 1500,
      image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Curated collection of classic vinyl records",
      shopLink: "https://www.meesho.com/music"
    }
  ],
  "Gaming": [
    {
      name: "Gaming Mouse",
      price: 750,
      image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "High-precision gaming mouse with RGB lighting",
      shopLink: "https://www.meesho.com/gaming"
    },
    {
      name: "Gaming Headset",
      price: 1200,
      image: "https://images.unsplash.com/photo-1591105575633-922c8897af9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Comfortable headset with surround sound for immersive gaming",
      shopLink: "https://www.meesho.com/gaming"
    }
  ],
  "Beauty": [
    {
      name: "Luxury Skincare Set",
      price: 1800,
      image: "https://images.unsplash.com/photo-1615760134953-e9d1cc1cb1a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Premium skincare collection for radiant skin",
      shopLink: "https://www.meesho.com/beauty"
    },
    {
      name: "Makeup Palette",
      price: 900,
      image: "https://images.unsplash.com/photo-1612878010854-1250dfc5000a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Versatile makeup palette with essential colors",
      shopLink: "https://www.meesho.com/beauty"
    }
  ],
  "Jewelry": [
    {
      name: "Silver Pendant Necklace",
      price: 650,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Elegant silver pendant on a delicate chain",
      shopLink: "https://www.meesho.com/jewelry"
    },
    {
      name: "Pearl Earrings",
      price: 450,
      image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Classic pearl earrings for any occasion",
      shopLink: "https://www.meesho.com/jewelry"
    },
    {
      name: "Birthstone Bracelet",
      price: 350,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Personalized bracelet with birthstone charms",
      shopLink: "https://www.meesho.com/jewelry"
    },
    {
      name: "Gemstone Ring",
      price: 250,
      image: "https://images.unsplash.com/photo-1603050927325-baf630505e27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Affordable gemstone ring with elegant design",
      shopLink: "https://www.meesho.com/jewelry/rings"
    },
    {
      name: "Beaded Necklace",
      price: 180,
      image: "https://images.unsplash.com/photo-1576022162028-7808c0a9d6bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Colorful beaded necklace for casual wear",
      shopLink: "https://www.meesho.com/jewelry/necklaces"
    }
  ],
  "Home Decor": [
    {
      name: "Scented Candle Set",
      price: 600,
      image: "https://images.unsplash.com/photo-1603913996638-c01100417b4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Set of luxurious scented candles for a cozy atmosphere",
      shopLink: "https://www.meesho.com/homedecor"
    },
    {
      name: "Decorative Cushions",
      price: 550,
      image: "https://images.unsplash.com/photo-1540730930991-a9286a5f5020?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "Set of stylish cushions to enhance your living space",
      shopLink: "https://www.meesho.com/homedecor"
    }
  ]
};

// Alternative shops based on budget
export const alternativeShops: Record<string, Record<string, string>> = {
  "Low Budget": {
    "Technology": "https://www.meesho.com/tech-gadgets-under-500",
    "Books": "https://www.meesho.com/books-under-500",
    "Fashion": "https://www.meesho.com/fashion-under-500",
    "Music": "https://www.meesho.com/music-under-500",
    "Gaming": "https://www.meesho.com/gaming-under-500",
    "Beauty": "https://www.meesho.com/beauty-under-500",
    "Jewelry": "https://www.meesho.com/jewelry-under-500",
    "Home Decor": "https://www.meesho.com/home-decor-under-500",
    "Sports": "https://www.meesho.com/sports-under-500",
    "Cooking": "https://www.meesho.com/cooking-under-500"
  },
  "Medium Budget": {
    "Technology": "https://www.meesho.com/tech-gadgets-under-2000",
    "Fashion": "https://www.meesho.com/fashion-under-2000",
    "Home Decor": "https://www.meesho.com/home-decor-under-2000",
    "Jewelry": "https://www.meesho.com/jewelry-under-2000"
  },
  "High Budget": {
    "Technology": "https://www.meesho.com/premium-tech",
    "Jewelry": "https://www.meesho.com/premium-jewelry",
    "Fashion": "https://www.meesho.com/premium-fashion"
  }
};

// Helper function to get relevant gift image based on budget and category
export const getRelevantGiftImage = (price: number, interests: string[]): string => {
  const budgetCategory = price < 500 ? "Low Budget" : (price < 5000 ? "Medium Budget" : "High Budget");
  
  // Try to find a matching image for the first matching interest
  for (const interest of interests) {
    if (giftImagesByCategory[budgetCategory]?.[interest]) {
      const images = giftImagesByCategory[budgetCategory][interest];
      return images[Math.floor(Math.random() * images.length)];
    }
  }
  
  // If no matching interest, use the default for the budget category
  if (giftImagesByCategory[budgetCategory]?.["default"]) {
    const defaultImages = giftImagesByCategory[budgetCategory]["default"];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }
  
  // Ultimate fallback
  return giftImagesByCategory["default"]["default"][0];
};
