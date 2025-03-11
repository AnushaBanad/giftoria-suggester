
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Search, Heart, ShoppingBag, DollarSign, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface GiftSuggestion {
  name: string;
  price: number;
  image: string;
  description: string;
  shopLink: string;
}

const giftDatabase: Record<string, GiftSuggestion[]> = {
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

const alternativeShops: Record<string, Record<string, string>> = {
  "Low Budget": {
    "Technology": "https://www.meesho.com/tech-gadgets-under-500",
    "Books": "https://www.meesho.com/books-under-500",
    "Fashion": "https://www.meesho.com/fashion-under-500",
    "Music": "https://www.meesho.com/music-under-500",
    "Gaming": "https://www.meesho.com/gaming-under-500",
    "Beauty": "https://www.meesho.com/beauty-under-500",
    "Jewelry": "https://www.meesho.com/jewelry-under-500",
    "Home Decor": "https://www.meesho.com/home-decor-under-500"
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

const interestToOccasions: Record<string, string[]> = {
  "Technology": ["Birthday", "Anniversary", "Graduation", "Housewarming", "Corporate Gifts"],
  "Books": ["Birthday", "Graduation", "Retirement", "Holiday", "Corporate Gifts"],
  "Fashion": ["Birthday", "Anniversary", "Wedding", "Holiday", "Graduation"],
  "Music": ["Birthday", "Anniversary", "Graduation", "Holiday"],
  "Gaming": ["Birthday", "Graduation", "Holiday", "Friendship Day"],
  "Beauty": ["Birthday", "Anniversary", "Valentine's Day", "Mother's Day", "Wedding"],
  "Jewelry": ["Birthday", "Anniversary", "Valentine's Day", "Mother's Day", "Wedding"],
  "Home Decor": ["Housewarming", "Wedding", "Anniversary", "Holiday", "Retirement"]
};

const interests = [
  "Technology", "Books", "Fashion", "Music", "Gaming", "Beauty", "Jewelry", "Home Decor"
];

const allOccasions = [
  "Birthday", "Anniversary", "Wedding", "Graduation", "Housewarming", 
  "Valentine's Day", "Mother's Day", "Father's Day", "Holiday", 
  "Retirement", "Corporate Gifts", "Friendship Day", "Baby Shower"
];

// Enhanced gift image mapping based on categories and budget
const giftImagesByCategory: Record<string, Record<string, string[]>> = {
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

// Helper function to get relevant gift image based on budget and category
const getRelevantGiftImage = (price: number, interests: string[]): string => {
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

const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  interests.forEach(interest => {
    if (giftDatabase[interest]) {
      console.log("Found gifts for interest:", interest);
      const categoryGifts = giftDatabase[interest];
      const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
      
      if (affordableGifts.length === 0 && alternativeShops[budgetCategory] && alternativeShops[budgetCategory][interest]) {
        const altShopLink = alternativeShops[budgetCategory][interest];
        suggestions.push({
          name: `Affordable ${interest} Items`,
          price: budget,
          image: getRelevantGiftImage(budget, [interest]),
          description: `Find affordable ${interest.toLowerCase()} items within your budget`,
          shopLink: altShopLink
        });
      } else {
        suggestions.push(...affordableGifts);
      }
    }
  });

  if (suggestions.length === 0) {
    console.log("No interest-based suggestions found, adding generic suggestions");
    
    let foundAffordableGift = false;
    Object.entries(giftDatabase).forEach(([category, categoryGifts]) => {
      const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
      if (affordableGifts.length > 0) {
        foundAffordableGift = true;
        suggestions.push(...affordableGifts);
      }
    });
    
    if (!foundAffordableGift) {
      const randomInterests = Object.keys(alternativeShops[budgetCategory] || {}).slice(0, 3);
      randomInterests.forEach(interest => {
        if (alternativeShops[budgetCategory][interest]) {
          suggestions.push({
            name: `Budget-Friendly ${interest} Gift`,
            price: budget,
            image: getRelevantGiftImage(budget, [interest]),
            description: `Special selection of ${interest.toLowerCase()} items within your budget range`,
            shopLink: alternativeShops[budgetCategory][interest]
          });
        }
      });
    }
  }

  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(item => [item.name, item])).values()
  );

  if (uniqueSuggestions.length === 0) {
    return [{
      name: "Custom Gift Finder",
      price: budget,
      image: getRelevantGiftImage(budget, interests),
      description: `We'll help you find the perfect gift within your ₹${budget} budget`,
      shopLink: "https://www.meesho.com/gift-finder"
    }];
  }

  const filteredSuggestions = uniqueSuggestions
    .filter(gift => gift.price <= budget)
    .sort((a, b) => a.price - b.price)
    .slice(0, 6);

  console.log("Final suggestions:", filteredSuggestions);
  return filteredSuggestions;
};

const Dashboard = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOccasions, setFilteredOccasions] = useState<string[]>(allOccasions);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (selectedInterests.length === 0) {
      setFilteredOccasions(allOccasions);
    } else {
      let relevantOccasions = new Set<string>();
      selectedInterests.forEach(interest => {
        if (interestToOccasions[interest]) {
          interestToOccasions[interest].forEach(occasion => {
            relevantOccasions.add(occasion);
          });
        }
      });

      if (selectedOccasion && !relevantOccasions.has(selectedOccasion)) {
        setSelectedOccasion("");
      }

      setFilteredOccasions(Array.from(relevantOccasions).sort());
    }
  }, [selectedInterests, selectedOccasion]);

  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      interests: selectedInterests,
      budget,
      occasion: selectedOccasion
    });
    
    if (!selectedOccasion) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an occasion",
      });
      return;
    }

    if (!budget || Number(budget) <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid budget",
      });
      return;
    }

    if (selectedInterests.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one interest",
      });
      return;
    }

    const newSuggestions = generateGiftSuggestions(
      selectedInterests,
      Number(budget),
      selectedOccasion
    );

    console.log("Generated suggestions:", newSuggestions);
    
    // Each suggestion already has its image properly set in generateGiftSuggestions
    setSuggestions(newSuggestions);
    setShowSuggestions(true);

    if (newSuggestions.length === 0) {
      toast({
        variant: "destructive",
        title: "No exact matches found",
        description: "We're showing alternative shopping options within your budget",
      });
    } else {
      toast({
        title: "Perfect gifts found!",
        description: `Found ${newSuggestions.length} gift suggestions for you.`,
      });
    }
  };

  const handleAddToWishlist = (suggestion: GiftSuggestion) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(suggestion.name)) {
        newSet.delete(suggestion.name);
        toast({
          title: "Removed from wishlist",
          description: `${suggestion.name} has been removed from your wishlist`
        });
      } else {
        newSet.add(suggestion.name);
        toast({
          title: "Added to wishlist",
          description: `${suggestion.name} has been added to your wishlist`
        });
      }
      return newSet;
    });
  };

  const handleAddToCart = (suggestion: GiftSuggestion) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(suggestion.name)) {
        newSet.delete(suggestion.name);
        toast({
          title: "Removed from cart",
          description: `${suggestion.name} has been removed from your cart`
        });
      } else {
        newSet.add(suggestion.name);
        toast({
          title: "Added to cart",
          description: `${suggestion.name} has been added to your cart`
        });
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 12}s infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <div 
            className={`w-8 h-8 rounded-lg opacity-20`}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
              backgroundColor: [
                "#FFE4E6", "#E7EFE6", "#FFF1E6", "#E5DEFF", 
                "#FFDEE2", "#FDE1D3", "#D3E4FD", "#F2FCE2",
                "#FEF7CD", "#FEC6A1", "#F1F0FB"
              ][i % 11]
            }}>
          </div>
        </div>
      ))}

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Gift className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">Personalize Your Gifts</h1>
            </div>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Select Your Interests
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      onClick={() => handleInterestClick(interest)}
                      className={`rounded-full transition-all hover:scale-105 ${
                        selectedInterests.includes(interest)
                          ? "bg-emerald-600 text-white"
                          : ""
                      }`}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Set Your Budget
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="budget">Budget (in ₹)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="focus:ring-2 focus:ring-emerald-500 transition-all hover:border-emerald-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Gift className="w-5 h-5 text-violet-500" />
                  Select the Occasion
                  {selectedInterests.length > 0 && (
                    <span className="text-sm text-gray-500 font-normal">
                      (filtered by your interests)
                    </span>
                  )}
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {filteredOccasions.map((occasion) => (
                    <Button
                      key={occasion}
                      type="button"
                      variant={selectedOccasion === occasion ? "default" : "outline"}
                      onClick={() => setSelectedOccasion(occasion)}
                      className={`transition-all hover:scale-105 ${
                        selectedOccasion === occasion
                          ? "bg-violet-600 text-white"
                          : ""
                      }`}
                    >
                      {occasion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all hover:scale-[1.02] shadow-lg"
            >
              <Search className="mr-2" /> Find Perfect Gifts
            </Button>
          </form>

          {showSuggestions && (
            <div className="mt-8">
              <Card className="backdrop-blur-sm bg-white/90">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-emerald-600" />
                    Gift Suggestions
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestions.map((suggestion, index) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img 
                            src={suggestion.image}
                            alt={suggestion.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const fallbackImages = [
                                "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
                                "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500",
                                "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500"
                              ];
                              (e.target as HTMLImageElement).src = fallbackImages[index % fallbackImages.length];
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ₹{suggestion.price}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2">{suggestion.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
                          <div className="flex justify-between items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className={`${
                                likedItems.has(suggestion.name) 
                                  ? 'bg-rose-100 text-rose-600 border-rose-200' 
                                  : 'text-gray-600'
                              }`}
                              onClick={() => handleAddToWishlist(suggestion)}
                            >
                              <Heart className={`${likedItems.has(suggestion.name) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`${
                                cartItems.has(suggestion.name)
                                  ? 'bg-blue-100 text-blue-600 border-blue-200'
                                  : 'text-gray-600'
                              }`}
                              onClick={() => handleAddToCart(suggestion)}
                            >
                              <ShoppingBag className={`${cartItems.has(suggestion.name) ? 'fill-current' : ''}`} />
                            </Button>
                            <a
                              href={suggestion.shopLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center"
                            >
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                Buy Now
                              </Button>
                            </a>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
