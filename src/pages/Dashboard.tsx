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
    }
  ]
};

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
  
  // Add interest-based suggestions
  interests.forEach(interest => {
    if (giftDatabase[interest]) {
      console.log("Found gifts for interest:", interest);
      const categoryGifts = giftDatabase[interest];
      const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
      suggestions.push(...affordableGifts);
    }
  });

  // If no interest-based suggestions, try to get generic suggestions
  if (suggestions.length === 0) {
    console.log("No interest-based suggestions found, adding generic suggestions");
    Object.values(giftDatabase).forEach(categoryGifts => {
      const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
      suggestions.push(...affordableGifts);
    });
  }

  // Remove duplicates and sort by price
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(item => [item.name, item])).values()
  );

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
    
    if (newSuggestions.length === 0) {
      toast({
        variant: "destructive",
        title: "No matches found",
        description: "Try adjusting your budget or selecting different interests",
      });
      return;
    }

    setSuggestions(newSuggestions);
    setShowSuggestions(true);

    toast({
      title: "Perfect gifts found!",
      description: `Found ${newSuggestions.length} gift suggestions for you.`,
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
                <h2 className="text-xl font-semibold">Set Your Budget</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Amount (₹)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget in Rupees"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="0"
                    className="max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold">Select Occasion</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((occasion) => (
                    <Button
                      key={occasion}
                      type="button"
                      variant={selectedOccasion === occasion ? "default" : "outline"}
                      onClick={() => setSelectedOccasion(occasion)}
                      className={`rounded-full ${
                        selectedOccasion === occasion
                          ? "bg-theme-sage text-gray-800"
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
              className="w-full bg-theme-rose hover:bg-theme-sage text-gray-800 py-6 text-lg transition-all duration-300"
            >
              <Search className="mr-2" />
              Find Gift Recommendations
            </Button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/10 mt-8 animate-fadeIn">
              <CardHeader>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-theme-rose" />
                  Recommended Gifts
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestions.map((suggestion, index) => (
                    <a
                      key={index}
                      href={suggestion.shopLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="rounded-lg overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                        <div className="relative h-48">
                          <img
                            src={suggestion.image}
                            alt={suggestion.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-theme-rose">
                            {suggestion.name}
                          </h3>
                          <p className="text-sm text-gray-300 mb-2">
                            {suggestion.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-theme-rose font-semibold">
                              ₹{suggestion.price.toLocaleString()}
                            </span>
                            <Button
                              size="sm"
                              className="bg-theme-rose hover:bg-theme-sage text-white"
                            >
                              Shop Now <ExternalLink className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
