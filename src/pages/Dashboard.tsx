
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Search, Heart, ShoppingBag, DollarSign, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GiftSuggestion {
  name: string;
  price: number;
  image: string;
  description: string;
  shopLink: string;
}

// Expanded gift database with more affordable options
const giftDatabase: Record<string, GiftSuggestion[]> = {
  Technology: [
    {
      name: "Smart Watch Pro",
      price: 15999,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description: "Premium smartwatch with health tracking features",
      shopLink: "https://amazon.in/smartwatch-pro"
    },
    {
      name: "Wireless Earbuds",
      price: 8999,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      description: "High-quality wireless earbuds with noise cancellation",
      shopLink: "https://amazon.in/wireless-earbuds"
    },
    {
      name: "Budget Phone Stand",
      price: 299,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
      description: "Adjustable phone stand for desk or bedside use",
      shopLink: "https://flipkart.com/phone-stand"
    },
    {
      name: "USB LED Light",
      price: 149,
      image: "https://images.unsplash.com/photo-1573921539234-a058e9d3db8c",
      description: "Flexible USB light for laptops and portable use",
      shopLink: "https://myntra.com/usb-light"
    }
  ],
  Books: [
    {
      name: "Premium Book Collection",
      price: 4999,
      image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090",
      description: "Curated collection of bestselling books",
      shopLink: "https://amazon.in/book-collection"
    },
    {
      name: "E-Reader Ultimate",
      price: 12999,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
      description: "Latest e-reader with backlight and weeks of battery life",
      shopLink: "https://amazon.in/e-reader"
    },
    {
      name: "Budget Bestseller",
      price: 199,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      description: "Paperback edition of current bestselling novel",
      shopLink: "https://flipkart.com/bestseller"
    },
    {
      name: "Pocket Dictionary",
      price: 99,
      image: "https://images.unsplash.com/photo-1595351298020-0f2c394c90ee",
      description: "Compact dictionary for students and travelers",
      shopLink: "https://meesho.com/dictionary"
    }
  ],
  Fashion: [
    {
      name: "Designer Watch Collection",
      price: 24999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      description: "Elegant designer watch for any occasion",
      shopLink: "https://amazon.in/designer-watch"
    },
    {
      name: "Premium Fashion Set",
      price: 9999,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      description: "Trendy fashion collection for the style-conscious",
      shopLink: "https://amazon.in/fashion-set"
    },
    {
      name: "Casual Cotton Scarf",
      price: 299,
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c",
      description: "Stylish scarf for daily wear in multiple colors",
      shopLink: "https://myntra.com/cotton-scarf"
    },
    {
      name: "Fashion Wrist Band",
      price: 99,
      image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584",
      description: "Trendy wristband with modern design",
      shopLink: "https://meesho.com/wristband"
    }
  ],
  Music: [
    {
      name: "Premium Headphones",
      price: 19999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      description: "High-end headphones with superior sound quality",
      shopLink: "https://amazon.in/premium-headphones"
    },
    {
      name: "Smart Speaker",
      price: 7999,
      image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc",
      description: "Wireless speaker with voice control",
      shopLink: "https://amazon.in/smart-speaker"
    },
    {
      name: "Budget Earphones",
      price: 199,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      description: "Reliable earphones with good sound quality",
      shopLink: "https://flipkart.com/budget-earphones"
    },
    {
      name: "Mini Speaker",
      price: 499,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      description: "Portable speaker with Bluetooth connectivity",
      shopLink: "https://croma.com/mini-speaker"
    }
  ],
  Gaming: [
    {
      name: "Gaming Console Pro",
      price: 49999,
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
      description: "Latest gaming console with 4K graphics",
      shopLink: "https://amazon.in/gaming-console"
    },
    {
      name: "Gaming Headset",
      price: 7999,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
      description: "Professional gaming headset with surround sound",
      shopLink: "https://amazon.in/gaming-headset"
    },
    {
      name: "Mobile Game Controller",
      price: 999,
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
      description: "Clip-on controller for mobile gaming",
      shopLink: "https://flipkart.com/game-controller"
    },
    {
      name: "Gaming Mouse Pad",
      price: 149,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
      description: "Anti-slip mouse pad with smooth surface",
      shopLink: "https://snapdeal.com/mousepad"
    }
  ],
  Beauty: [
    {
      name: "Luxury Skincare Set",
      price: 5999,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
      description: "Complete skincare routine with premium products",
      shopLink: "https://amazon.in/luxury-skincare"
    },
    {
      name: "Premium Makeup Kit",
      price: 8999,
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
      description: "Professional makeup kit with all essentials",
      shopLink: "https://amazon.in/makeup-kit"
    },
    {
      name: "Moisturizer Cream",
      price: 249,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
      description: "Hydrating face cream for daily use",
      shopLink: "https://nykaa.com/moisturizer"
    },
    {
      name: "Lip Balm Set",
      price: 99,
      image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3",
      description: "Set of flavored lip balms for dry lips",
      shopLink: "https://firstcry.com/lip-balm"
    }
  ],
  Sports: [
    {
      name: "Smart Fitness Watch",
      price: 12999,
      image: "https://images.unsplash.com/photo-1557166983-5939644443f5",
      description: "Advanced fitness tracker with heart rate monitoring",
      shopLink: "https://amazon.in/fitness-watch"
    },
    {
      name: "Premium Yoga Set",
      price: 3999,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      description: "Complete yoga kit with mat and accessories",
      shopLink: "https://amazon.in/yoga-set"
    },
    {
      name: "Fitness Resistance Bands",
      price: 299,
      image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c",
      description: "Set of resistance bands for home workouts",
      shopLink: "https://decathlon.in/resistance-bands"
    },
    {
      name: "Sports Water Bottle",
      price: 149,
      image: "https://images.unsplash.com/photo-1523362289600-a70b4a0e09aa",
      description: "Leak-proof bottle for sports and outdoor activities",
      shopLink: "https://myntra.com/water-bottle"
    }
  ],
  "Art": [
    {
      name: "Professional Art Set",
      price: 4999,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
      description: "Complete art supplies kit for professionals",
      shopLink: "https://amazon.in/art-set"
    },
    {
      name: "Digital Drawing Tablet",
      price: 8999,
      image: "https://images.unsplash.com/photo-1559336197-ded8aaa244bc",
      description: "High-precision drawing tablet for digital artists",
      shopLink: "https://amazon.in/drawing-tablet"
    },
    {
      name: "Sketch Book",
      price: 149,
      image: "https://images.unsplash.com/photo-1602734846297-9299fc2d4703",
      description: "Quality sketchbook with acid-free paper",
      shopLink: "https://flipkart.com/sketchbook"
    },
    {
      name: "Basic Drawing Pencil Set",
      price: 99,
      image: "https://images.unsplash.com/photo-1600050528109-370377e4e5f6",
      description: "Set of graphite pencils for beginners",
      shopLink: "https://meesho.com/pencil-set"
    }
  ],
  "Home Decor": [
    {
      name: "Smart LED Lighting Set",
      price: 6999,
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
      description: "Customizable LED lighting for modern homes",
      shopLink: "https://amazon.in/led-lights"
    },
    {
      name: "Premium Wall Art Collection",
      price: 12999,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6",
      description: "Curated collection of elegant wall art pieces",
      shopLink: "https://amazon.in/wall-art"
    },
    {
      name: "Decorative Cushion Covers",
      price: 299,
      image: "https://images.unsplash.com/photo-1540730930991-a9286a5f5055",
      description: "Set of trendy cushion covers for living room",
      shopLink: "https://ajio.com/cushion-covers"
    },
    {
      name: "Table Plant Pot",
      price: 149,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
      description: "Ceramic pot for small indoor plants",
      shopLink: "https://pepperfry.com/plant-pot"
    }
  ],
  "Photography": [
    {
      name: "Camera Accessories Kit",
      price: 15999,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      description: "Essential accessories for photography enthusiasts",
      shopLink: "https://amazon.in/camera-kit"
    },
    {
      name: "Mini Photo Printer",
      price: 7999,
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6",
      description: "Portable printer for instant photo prints",
      shopLink: "https://amazon.in/photo-printer"
    },
    {
      name: "Phone Camera Lens Kit",
      price: 799,
      image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e",
      description: "Clip-on lenses for smartphone photography",
      shopLink: "https://croma.com/camera-lens"
    },
    {
      name: "Mini Tripod",
      price: 299,
      image: "https://images.unsplash.com/photo-1615552238672-a96cb5eedde4",
      description: "Portable tripod for smartphones and small cameras",
      shopLink: "https://flipkart.com/mini-tripod"
    }
  ],
  "Cooking": [
    {
      name: "Premium Kitchen Set",
      price: 9999,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      description: "High-quality cookware and utensils set",
      shopLink: "https://amazon.in/kitchen-set"
    },
    {
      name: "Smart Kitchen Scale",
      price: 2999,
      image: "https://images.unsplash.com/photo-1591261730799-ee4e6c5262b5",
      description: "Digital scale with multiple measurement units",
      shopLink: "https://flipkart.com/kitchen-scale"
    },
    {
      name: "Silicone Cooking Spoons",
      price: 299,
      image: "https://images.unsplash.com/photo-1594172411052-704e32d2f61e",
      description: "Heat-resistant non-stick cooking utensils",
      shopLink: "https://myntra.com/cooking-spoons"
    },
    {
      name: "Kitchen Timer",
      price: 99,
      image: "https://images.unsplash.com/photo-1532635248-cdd2d399f49c",
      description: "Manual timer for precise cooking time",
      shopLink: "https://meesho.com/kitchen-timer"
    }
  ],
  "Outdoor": [
    {
      name: "Camping Tent Set",
      price: 8999,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
      description: "Complete tent set for outdoor adventures",
      shopLink: "https://amazon.in/camping-tent"
    },
    {
      name: "Hiking Backpack",
      price: 3999,
      image: "https://images.unsplash.com/photo-1501554728187-ce583db33af7",
      description: "Durable backpack with multiple compartments",
      shopLink: "https://decathlon.in/backpack"
    },
    {
      name: "Outdoor Torch Light",
      price: 499,
      image: "https://images.unsplash.com/photo-1550353127-b0da3aeaa0ca",
      description: "Waterproof torch for camping and night activities",
      shopLink: "https://flipkart.com/torch-light"
    },
    {
      name: "Portable Compass",
      price: 149,
      image: "https://images.unsplash.com/photo-1522506209496-4536d9020ec4",
      description: "Reliable compass for navigation outdoors",
      shopLink: "https://snapdeal.com/compass"
    }
  ],
  "Fitness": [
    {
      name: "Home Gym Set",
      price: 24999,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      description: "Complete home workout equipment",
      shopLink: "https://amazon.in/home-gym"
    },
    {
      name: "Smart Scale",
      price: 5999,
      image: "https://images.unsplash.com/photo-1578496479531-32dc6a281214",
      description: "Digital scale with body composition analysis",
      shopLink: "https://flipkart.com/smart-scale"
    },
    {
      name: "Jump Rope",
      price: 299,
      image: "https://images.unsplash.com/photo-1612957693117-da0ed128437d",
      description: "Adjustable rope for cardio workouts",
      shopLink: "https://myntra.com/jump-rope"
    },
    {
      name: "Fitness Gloves",
      price: 199,
      image: "https://images.unsplash.com/photo-1593793616440-5dfe90fcf312",
      description: "Protective gloves for weight training",
      shopLink: "https://decathlon.in/fitness-gloves"
    }
  ]
};

// Website alternatives for different budget ranges
const alternativeShops: Record<string, Record<string, string>> = {
  "Low Budget": { // Below 500
    "Technology": "https://meesho.com/tech-accessories",
    "Books": "https://storytel.in/budget-reads",
    "Fashion": "https://www.myntra.com/budget-fashion",
    "Music": "https://flipkart.com/budget-audio",
    "Gaming": "https://snapdeal.com/gaming-accessories",
    "Beauty": "https://purplle.com/budget-beauty",
    "Sports": "https://decathlon.in/affordable-fitness",
    "Art": "https://stationaryshop.in/budget-art",
    "Home Decor": "https://pepperfry.com/budget-decor",
    "Photography": "https://olx.in/camera-accessories",
    "Cooking": "https://bigbasket.com/kitchen-tools",
    "Outdoor": "https://decathlon.in/outdoor-basics",
    "Fitness": "https://decathlon.in/fitness-essentials"
  },
  "Medium Budget": { // 500-5000
    "Technology": "https://croma.com/mid-range-tech",
    "Books": "https://bookswagon.com/collections",
    "Fashion": "https://ajio.com/trending-fashion",
    "Music": "https://reliance-digital.com/audio",
    "Gaming": "https://gamestop.in/accessories",
    "Beauty": "https://nykaa.com/beauty-products",
    "Sports": "https://sportsadda.com/equipment",
    "Art": "https://itsupp.ly/art-supplies",
    "Home Decor": "https://homecentre.in/decor-items",
    "Photography": "https://imagineonline.store/accessories",
    "Cooking": "https://wonderchef.com/cooking-tools",
    "Outdoor": "https://adventureworx.in/gear",
    "Fitness": "https://cult.fit/equipment"
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
          image: `https://images.unsplash.com/photo-1607082349566-187342175e2f`,
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
            image: `https://images.unsplash.com/photo-1549465220-1a8b9238cd48`,
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
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f",
      description: `We'll help you find the perfect gift within your ₹${budget} budget`,
      shopLink: "https://giftfinder.in/custom-budget"
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
            className={`w-8 h-8 rounded-lg opacity-20 rotate-${Math.random() * 360}`}
            style={{
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
        <div className="flex flex-col space-y-6 animate-fadeIn py-8">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Gift className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Personalize Your Gifts</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-theme-rose" />
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
                      className={`rounded-full ${
                        selectedInterests.includes(interest)
                          ? "bg-theme-sage text-gray-800"
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
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Set Your Budget
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Label htmlFor="budget">Budget (₹)</Label>
                    <div className="relative mt-1">
                      <Input
                        id="budget"
                        type="number"
                        placeholder="Enter your budget in rupees"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="pl-8"
                      />
                      <DollarSign className="w-4 h-4 absolute left-2.5 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                  Select Occasion
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {occasions.map((occasion) => (
                    <Button
                      key={occasion}
                      type="button"
                      variant={selectedOccasion === occasion ? "default" : "outline"}
                      onClick={() => setSelectedOccasion(occasion)}
                      className={`rounded-full ${
                        selectedOccasion === occasion
                          ? "bg-theme-lavender text-gray-800"
                          : ""
                      }`}
                    >
                      {occasion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Find Gift Recommendations
              </Button>
            </div>
          </form>

          {showSuggestions && (
            <div className="mt-10 space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <ShoppingBag className="w-7 h-7 text-white" />
                <h2 className="text-2xl font-bold text-white">Gift Suggestions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((gift, index) => (
                  <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{gift.name}</h3>
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ₹{gift.price}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{gift.description}</p>
                      <a
                        href={gift.shopLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                      >
                        Visit Shop
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
