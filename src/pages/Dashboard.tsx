
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Search, Heart, ShoppingBag, DollarSign, ExternalLink, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GiftSuggestion {
  name: string;
  price: number;
  image: string;
  description: string;
  shopLink: string;
}

// Expanded gift database with more affordable options and direct Meesho links
const giftDatabase: Record<string, GiftSuggestion[]> = {
  Technology: [
    {
      name: "Smart Watch Pro",
      price: 15999,
      image: "https://images.meesho.com/images/products/266650767/m33ea_512.jpg",
      description: "Premium smartwatch with health tracking features",
      shopLink: "https://www.meesho.com/smart-watches-men/p/5dfvg7"
    },
    {
      name: "Wireless Earbuds",
      price: 8999,
      image: "https://images.meesho.com/images/products/288171825/qnl5p_512.jpg",
      description: "High-quality wireless earbuds with noise cancellation",
      shopLink: "https://www.meesho.com/wireless-earbuds/p/3ft5b8"
    },
    {
      name: "Budget Phone Stand",
      price: 299,
      image: "https://images.meesho.com/images/products/134724058/lqlsj_512.jpg",
      description: "Adjustable phone stand for desk or bedside use",
      shopLink: "https://www.meesho.com/mobile-phone-stand/p/2r5y4n"
    },
    {
      name: "USB LED Light",
      price: 149,
      image: "https://images.meesho.com/images/products/41392459/dzxcj_512.jpg",
      description: "Flexible USB light for laptops and portable use",
      shopLink: "https://www.meesho.com/usb-light/p/7tg4b9"
    }
  ],
  Books: [
    {
      name: "Premium Book Collection",
      price: 4999,
      image: "https://images.meesho.com/images/products/219166248/wbqao_512.jpg",
      description: "Curated collection of bestselling books",
      shopLink: "https://www.meesho.com/books-collection/p/2c9k4l"
    },
    {
      name: "E-Reader Ultimate",
      price: 12999,
      image: "https://images.meesho.com/images/products/147729391/rqjwx_512.jpg",
      description: "Latest e-reader with backlight and weeks of battery life",
      shopLink: "https://www.meesho.com/e-reader/p/1d5g8t"
    },
    {
      name: "Budget Bestseller",
      price: 199,
      image: "https://images.meesho.com/images/products/187629345/wrypc_512.jpg",
      description: "Paperback edition of current bestselling novel",
      shopLink: "https://www.meesho.com/bestseller/p/9f3v2n"
    },
    {
      name: "Pocket Dictionary",
      price: 99,
      image: "https://images.meesho.com/images/products/153620156/ebqsh_512.jpg",
      description: "Compact dictionary for students and travelers",
      shopLink: "https://www.meesho.com/dictionary/p/4t6y8i"
    }
  ],
  Fashion: [
    {
      name: "Designer Watch Collection",
      price: 24999,
      image: "https://images.meesho.com/images/products/256720223/wkmba_512.jpg",
      description: "Elegant designer watch for any occasion",
      shopLink: "https://www.meesho.com/designer-watch/p/8c3d6v"
    },
    {
      name: "Premium Fashion Set",
      price: 9999,
      image: "https://images.meesho.com/images/products/229487177/xrbln_512.jpg",
      description: "Trendy fashion collection for the style-conscious",
      shopLink: "https://www.meesho.com/fashion-set/p/5s7v9b"
    },
    {
      name: "Casual Cotton Scarf",
      price: 299,
      image: "https://images.meesho.com/images/products/109245393/krhkc_512.jpg",
      description: "Stylish scarf for daily wear in multiple colors",
      shopLink: "https://www.meesho.com/cotton-scarf/p/3g6h9j"
    },
    {
      name: "Fashion Wrist Band",
      price: 99,
      image: "https://images.meesho.com/images/products/152075602/myvkq_512.jpg",
      description: "Trendy wristband with modern design",
      shopLink: "https://www.meesho.com/wristband/p/7k8l9p"
    }
  ],
  Music: [
    {
      name: "Premium Headphones",
      price: 19999,
      image: "https://images.meesho.com/images/products/168207322/xebtm_512.jpg",
      description: "High-end headphones with superior sound quality",
      shopLink: "https://www.meesho.com/headphones/p/7k98j2"
    },
    {
      name: "Smart Speaker",
      price: 7999,
      image: "https://images.meesho.com/images/products/209846193/tnzqr_512.jpg",
      description: "Wireless speaker with voice control",
      shopLink: "https://www.meesho.com/smart-speaker/p/3d5f7g"
    },
    {
      name: "Budget Earphones",
      price: 199,
      image: "https://images.meesho.com/images/products/165498501/dbwit_512.jpg",
      description: "Reliable earphones with good sound quality",
      shopLink: "https://www.meesho.com/budget-earphones/p/5j7k9l"
    },
    {
      name: "Mini Speaker",
      price: 499,
      image: "https://images.meesho.com/images/products/115432979/zzgvo_512.jpg",
      description: "Portable speaker with Bluetooth connectivity",
      shopLink: "https://www.meesho.com/mini-speaker/p/2n4m6b"
    }
  ],
  Gaming: [
    {
      name: "Gaming Console Pro",
      price: 49999,
      image: "https://images.meesho.com/images/products/180429121/gqsul_512.jpg",
      description: "Latest gaming console with 4K graphics",
      shopLink: "https://www.meesho.com/gaming-console/p/1q3w5e"
    },
    {
      name: "Gaming Headset",
      price: 7999,
      image: "https://images.meesho.com/images/products/228706438/rlkgu_512.jpg",
      description: "Professional gaming headset with surround sound",
      shopLink: "https://www.meesho.com/gaming-headset/p/9i7u5y"
    },
    {
      name: "Mobile Game Controller",
      price: 999,
      image: "https://images.meesho.com/images/products/125693822/hrgdu_512.jpg",
      description: "Clip-on controller for mobile gaming",
      shopLink: "https://www.meesho.com/mobile-game-controller/p/7j9k1l"
    },
    {
      name: "Gaming Mouse Pad",
      price: 149,
      image: "https://images.meesho.com/images/products/149827470/sjgwz_512.jpg",
      description: "Anti-slip mouse pad with smooth surface",
      shopLink: "https://www.meesho.com/gaming-mousepad/p/3b5n7m"
    }
  ],
  Beauty: [
    {
      name: "Luxury Skincare Set",
      price: 5999,
      image: "https://images.meesho.com/images/products/131442120/dnsrz_512.jpg",
      description: "Complete skincare routine with premium products",
      shopLink: "https://www.meesho.com/skincare-set/p/4d6f8g"
    },
    {
      name: "Premium Makeup Kit",
      price: 8999,
      image: "https://images.meesho.com/images/products/197520042/d8hwd_512.jpg",
      description: "Professional makeup kit with all essentials",
      shopLink: "https://www.meesho.com/makeup-kit/p/2q4w6e"
    },
    {
      name: "Moisturizer Cream",
      price: 249,
      image: "https://images.meesho.com/images/products/54775878/wbskx_512.jpg",
      description: "Hydrating face cream for daily use",
      shopLink: "https://www.meesho.com/face-moisturizer/p/8h0j2k"
    },
    {
      name: "Lip Balm Set",
      price: 99,
      image: "https://images.meesho.com/images/products/170764532/guywd_512.jpg",
      description: "Set of flavored lip balms for dry lips",
      shopLink: "https://www.meesho.com/lip-balm-set/p/5g7h9j"
    }
  ],
  Sports: [
    {
      name: "Smart Fitness Watch",
      price: 12999,
      image: "https://images.meesho.com/images/products/249517554/qc4ve_512.jpg",
      description: "Advanced fitness tracker with heart rate monitoring",
      shopLink: "https://www.meesho.com/fitness-watch/p/1a3s5d"
    },
    {
      name: "Premium Yoga Set",
      price: 3999,
      image: "https://images.meesho.com/images/products/82546021/qd1gs_512.jpg",
      description: "Complete yoga kit with mat and accessories",
      shopLink: "https://www.meesho.com/yoga-set/p/7z9x1c"
    },
    {
      name: "Fitness Resistance Bands",
      price: 299,
      image: "https://images.meesho.com/images/products/95865403/bqqct_512.jpg",
      description: "Set of resistance bands for home workouts",
      shopLink: "https://www.meesho.com/resistance-bands/p/3v5b7n"
    },
    {
      name: "Sports Water Bottle",
      price: 149,
      image: "https://images.meesho.com/images/products/41159175/vxbgu_512.jpg",
      description: "Leak-proof bottle for sports and outdoor activities",
      shopLink: "https://www.meesho.com/sports-bottle/p/9m1n3b"
    }
  ],
  "Art": [
    {
      name: "Professional Art Set",
      price: 4999,
      image: "https://images.meesho.com/images/products/152075341/dcqsd_512.jpg",
      description: "Complete art supplies kit for professionals",
      shopLink: "https://www.meesho.com/art-set/p/2w4e6r"
    },
    {
      name: "Digital Drawing Tablet",
      price: 8999,
      image: "https://images.meesho.com/images/products/128479541/gq7io_512.jpg",
      description: "High-precision drawing tablet for digital artists",
      shopLink: "https://www.meesho.com/drawing-tablet/p/8i0o2p"
    },
    {
      name: "Sketch Book",
      price: 149,
      image: "https://images.meesho.com/images/products/69077553/cvwxs_512.jpg",
      description: "Quality sketchbook with acid-free paper",
      shopLink: "https://www.meesho.com/sketchbook/p/4f6g8h"
    },
    {
      name: "Basic Drawing Pencil Set",
      price: 99,
      image: "https://images.meesho.com/images/products/8189654/iwoqn_512.jpg",
      description: "Set of graphite pencils for beginners",
      shopLink: "https://www.meesho.com/pencil-set/p/6j8k0l"
    }
  ],
  "Home Decor": [
    {
      name: "Smart LED Lighting Set",
      price: 6999,
      image: "https://images.meesho.com/images/products/117835417/ypdgv_512.jpg",
      description: "Customizable LED lighting for modern homes",
      shopLink: "https://www.meesho.com/led-lights/p/2x4z6c"
    },
    {
      name: "Premium Wall Art Collection",
      price: 12999,
      image: "https://images.meesho.com/images/products/181724051/nrpvq_512.jpg",
      description: "Curated collection of elegant wall art pieces",
      shopLink: "https://www.meesho.com/wall-art/p/8v0b2n"
    },
    {
      name: "Decorative Cushion Covers",
      price: 299,
      image: "https://images.meesho.com/images/products/86014462/aivpg_512.jpg",
      description: "Set of trendy cushion covers for living room",
      shopLink: "https://www.meesho.com/cushion-covers/p/4d6f8g"
    },
    {
      name: "Table Plant Pot",
      price: 149,
      image: "https://images.meesho.com/images/products/97843119/hwykv_512.jpg",
      description: "Ceramic pot for small indoor plants",
      shopLink: "https://www.meesho.com/plant-pot/p/7h9j1k"
    }
  ],
  "Photography": [
    {
      name: "Camera Accessories Kit",
      price: 15999,
      image: "https://images.meesho.com/images/products/145983602/gzifq_512.jpg",
      description: "Essential accessories for photography enthusiasts",
      shopLink: "https://www.meesho.com/camera-kit/p/3s5d7f"
    },
    {
      name: "Mini Photo Printer",
      price: 7999,
      image: "https://images.meesho.com/images/products/202398765/hnswt_512.jpg",
      description: "Portable printer for instant photo prints",
      shopLink: "https://www.meesho.com/photo-printer/p/9l1m3n"
    },
    {
      name: "Phone Camera Lens Kit",
      price: 799,
      image: "https://images.meesho.com/images/products/67890215/ywqaz_512.jpg",
      description: "Clip-on lenses for smartphone photography",
      shopLink: "https://www.meesho.com/camera-lens/p/5g7h9j"
    },
    {
      name: "Mini Tripod",
      price: 299,
      image: "https://images.meesho.com/images/products/28763451/pcvrq_512.jpg",
      description: "Portable tripod for smartphones and small cameras",
      shopLink: "https://www.meesho.com/mini-tripod/p/1q3w5e"
    }
  ],
  "Cooking": [
    {
      name: "Premium Kitchen Set",
      price: 9999,
      image: "https://images.meesho.com/images/products/142963785/oknzj_512.jpg",
      description: "High-quality cookware and utensils set",
      shopLink: "https://www.meesho.com/kitchen-set/p/7r9t1y"
    },
    {
      name: "Smart Kitchen Scale",
      price: 2999,
      image: "https://images.meesho.com/images/products/118756349/lofhc_512.jpg",
      description: "Digital scale with multiple measurement units",
      shopLink: "https://www.meesho.com/kitchen-scale/p/3u5i7o"
    },
    {
      name: "Silicone Cooking Spoons",
      price: 299,
      image: "https://images.meesho.com/images/products/59328764/vdqwt_512.jpg",
      description: "Heat-resistant non-stick cooking utensils",
      shopLink: "https://www.meesho.com/silicone-spoons/p/9k1l3m"
    },
    {
      name: "Kitchen Timer",
      price: 99,
      image: "https://images.meesho.com/images/products/31782945/sjgwz_512.jpg",
      description: "Manual timer for precise cooking time",
      shopLink: "https://www.meesho.com/kitchen-timer/p/5v7b9n"
    }
  ],
  "Outdoor": [
    {
      name: "Camping Tent Set",
      price: 8999,
      image: "https://images.meesho.com/images/products/179063428/qwcsp_512.jpg",
      description: "Complete tent set for outdoor adventures",
      shopLink: "https://www.meesho.com/camping-tent/p/2d4f6g"
    },
    {
      name: "Hiking Backpack",
      price: 3999,
      image: "https://images.meesho.com/images/products/125794680/fwesx_512.jpg",
      description: "Durable backpack with multiple compartments",
      shopLink: "https://www.meesho.com/hiking-backpack/p/8j0k2l"
    },
    {
      name: "Outdoor Torch Light",
      price: 499,
      image: "https://images.meesho.com/images/products/87623415/kbizg_512.jpg",
      description: "Waterproof torch for camping and night activities",
      shopLink: "https://www.meesho.com/torch-light/p/4h6j8k"
    },
    {
      name: "Portable Compass",
      price: 149,
      image: "https://images.meesho.com/images/products/46925738/jiszt_512.jpg",
      description: "Reliable compass for navigation outdoors",
      shopLink: "https://www.meesho.com/compass/p/0m2n4b"
    }
  ],
  "Fitness": [
    {
      name: "Home Gym Set",
      price: 24999,
      image: "https://images.meesho.com/images/products/174069853/esnkd_512.jpg",
      description: "Complete home workout equipment",
      shopLink: "https://www.meesho.com/home-gym/p/1x3z5c"
    },
    {
      name: "Smart Scale",
      price: 5999,
      image: "https://images.meesho.com/images/products/151892047/xdfso_512.jpg",
      description: "Digital scale with body composition analysis",
      shopLink: "https://www.meesho.com/smart-scale/p/7v9b1n"
    },
    {
      name: "Jump Rope",
      price: 299,
      image: "https://images.meesho.com/images/products/48372651/lryns_512.jpg",
      description: "Adjustable rope for cardio workouts",
      shopLink: "https://www.meesho.com/jump-rope/p/3g5h7j"
    },
    {
      name: "Fitness Gloves",
      price: 199,
      image: "https://images.meesho.com/images/products/95843762/wmhkl_512.jpg",
      description: "Protective gloves for weight training",
      shopLink: "https://www.meesho.com/fitness-gloves/p/9q1w3e"
    }
  ]
};

// Website alternatives with Meesho links for different budget ranges
const alternativeShops: Record<string, Record<string, string>> = {
  "Low Budget": { // Below 500
    "Technology": "https://www.meesho.com/tech-accessories/pl/e7u9i0",
    "Books": "https://www.meesho.com/books/pl/f5r2q1",
    "Fashion": "https://www.meesho.com/budget-fashion/pl/j8m3n6",
    "Music": "https://www.meesho.com/headphones-earphones/pl/p2o8i7",
    "Gaming": "https://www.meesho.com/gaming-accessories/pl/c5v9b1",
    "Beauty": "https://www.meesho.com/beauty-products/pl/z3x5c1",
    "Sports": "https://www.meesho.com/fitness-accessories/pl/q3w7e9",
    "Art": "https://www.meesho.com/stationery/pl/g5h8j2",
    "Home Decor": "https://www.meesho.com/home-decor/pl/f4d6s1",
    "Photography": "https://www.meesho.com/camera-accessories/pl/u8i2o4",
    "Cooking": "https://www.meesho.com/kitchen-tools/pl/x3c7v9",
    "Outdoor": "https://www.meesho.com/outdoor-accessories/pl/b4n8m2",
    "Fitness": "https://www.meesho.com/fitness-equipment/pl/t7r3e9"
  },
  "Medium Budget": { // 500-5000
    "Technology": "https://www.meesho.com/electronics/pl/r5t8y1",
    "Books": "https://www.meesho.com/premium-books/pl/w2e6r9",
    "Fashion": "https://www.meesho.com/fashion/pl/a4s7d2",
    "Music": "https://www.meesho.com/speakers-headphones/pl/z6x4c8",
    "Gaming": "https://www.meesho.com/gaming/pl/q9w5e3",
    "Beauty": "https://www.meesho.com/beauty-products/pl/r4t6y2",
    "Sports": "https://www.meesho.com/sports-equipment/pl/f8g5h3",
    "Art": "https://www.meesho.com/art-supplies/pl/j9k3l7",
    "Home Decor": "https://www.meesho.com/home-furnishing/pl/p9o3i5",
    "Photography": "https://www.meesho.com/photography/pl/l3k8j5",
    "Cooking": "https://www.meesho.com/kitchen-appliances/pl/t6r9e3",
    "Outdoor": "https://www.meesho.com/camping-hiking/pl/c8v2b5",
    "Fitness": "https://www.meesho.com/gym-equipment/pl/m2n5b7"
  }
};

// Define list of interests and occasions
const interests = [
  "Technology", "Fashion", "Sports", "Books", "Music", 
  "Art", "Cooking", "Gaming", "Outdoor", "Fitness",
  "Travel", "Home Decor", "Photography", "Movies", "DIY",
  "Gardening", "Pets", "Beauty", "Coffee & Tea", "Wine & Spirits",
  "Jewelry", "Wellness", "Eco-Friendly", "Stationery", "Collectibles",
  "Cars", "Science", "Languages", "History", "Nature"
];

const occasions = [
  "Birthday", "Anniversary", "Wedding", "Graduation",
  "Housewarming", "Baby Shower", "Retirement", "New Job",
  "Thank You", "Get Well Soon", "Engagement",
  
  "Diwali", "Holi", "Raksha Bandhan", "Eid",
  "Navratri", "Durga Puja", "Ganesh Chaturthi",
  "Karwa Chauth", "Bhai Dooj", "Pongal",
  "Onam", "Lohri", "Makar Sankranti",
  
  "Christmas", "New Year", "Valentine's Day",
  "Mother's Day", "Father's Day", "Easter",
  "Halloween", "Thanksgiving"
];

const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  // Add interest-based suggestions
  interests.forEach(interest => {
    if (giftDatabase[interest]) {
      console.log("Found gifts for interest:", interest);
      const categoryGifts = giftDatabase[interest];
      const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
      
      // If no affordable gifts found within budget, use alternative shopping sites
      if (affordableGifts.length === 0 && alternativeShops[budgetCategory] && alternativeShops[budgetCategory][interest]) {
        const altShopLink = alternativeShops[budgetCategory][interest];
        suggestions.push({
          name: `Affordable ${interest} Items`,
          price: budget,
          image: `https://images.meesho.com/images/products/207082345/jw3uy_512.jpg`,
          description: `Find affordable ${interest.toLowerCase()} items within your budget`,
          shopLink: altShopLink
        });
      } else {
        suggestions.push(...affordableGifts);
      }
    }
  });

  // If no interest-based suggestions, try to get generic suggestions
  if (suggestions.length === 0) {
    console.log("No interest-based suggestions found, adding generic suggestions");
    
    // Try to find any affordable gift from any category
    let foundAffordableGift = false;
    Object.entries(giftDatabase).forEach(([category, categoryGifts]) => {
      const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
      if (affordableGifts.length > 0) {
        foundAffordableGift = true;
        suggestions.push(...affordableGifts);
      }
    });
    
    // If still no affordable gifts, suggest alternatives based on budget
    if (!foundAffordableGift) {
      const randomInterests = Object.keys(alternativeShops[budgetCategory] || {}).slice(0, 3);
      randomInterests.forEach(interest => {
        if (alternativeShops[budgetCategory][interest]) {
          suggestions.push({
            name: `Budget-Friendly ${interest} Gift`,
            price: budget,
            image: `https://images.meesho.com/images/products/98765432/kydpw_512.jpg`,
            description: `Special selection of ${interest.toLowerCase()} items within your budget range`,
            shopLink: alternativeShops[budgetCategory][interest]
          });
        }
      });
    }
  }

  // Remove duplicates and sort by price
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(item => [item.name, item])).values()
  );

  // We need to ensure we return something even if no exact matches
  if (uniqueSuggestions.length === 0) {
    return [{
      name: "Custom Gift Finder",
      price: budget,
      image: "https://images.meesho.com/images/products/123456789/srzyx_512.jpg",
      description: `We'll help you find the perfect gift within your ₹${budget} budget`,
      shopLink: "https://www.meesho.com/gift-finder"
    }];
  }

  // Sort by price (affordable first) and limit to 6 suggestions
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
  const { toast } = useToast();

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
    
    // Always show suggestions, even if limited
    setSuggestions(newSuggestions);
    setShowSuggestions(true);

    // Customize toast message based on results
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      {/* Floating decoration elements */}
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
          {/* Header */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Gift className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Personalize Your Gifts</h1>
          </div>

          {/* About this app section */}
          <Card className="backdrop-blur-sm bg-white/80 mb-4">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                About This App
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                This gift suggestion app is built with React, TypeScript, Tailwind CSS, and Shadcn UI. 
                It helps you find personalized gifts on Meesho within your budget by considering your 
                interests and the occasion.
              </p>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Interests selection */}
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

            {/* Budget input */}
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

            {/* Occasions selection */}
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Gift className="w-5 h-5 text-violet-500" />
                  Select the Occasion
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {occasions.map((occasion) => (
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

            {/* Submit button */}
            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all hover:scale-[1.02] shadow-lg"
            >
              <Search className="mr-2" /> Find Perfect Gifts
            </Button>
          </form>

          {/* Gift suggestions */}
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
                      <div 
                        key={index}
                        className="flex flex-col rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-emerald-300 hover:bg-emerald-50/30"
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img 
                            src={suggestion.image} 
                            alt={suggestion.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ₹{suggestion.price}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-lg mb-2">{suggestion.name}</h3>
                          <p className="text-gray-600 text-sm flex-grow">{suggestion.description}</p>
                          <a 
                            href={suggestion.shopLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center gap-2 bg-[#FB4E69] hover:bg-[#e63f58] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                          >
                            Shop on Meesho <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
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
