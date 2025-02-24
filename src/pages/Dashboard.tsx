
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: "Premium smartwatch with health tracking features",
      shopLink: "https://amazon.in/smartwatch-pro"
    },
    {
      name: "Wireless Earbuds",
      price: 8999,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      description: "High-quality wireless earbuds with noise cancellation",
      shopLink: "https://amazon.in/wireless-earbuds"
    }
  ],
  Books: [
    {
      name: "Premium Book Collection",
      price: 4999,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      description: "Curated collection of bestselling books",
      shopLink: "https://amazon.in/book-collection"
    },
    {
      name: "E-Reader Ultimate",
      price: 12999,
      image: "https://images.unsplash.com/photo-1618558087827-c19f0b08bb07",
      description: "Latest e-reader with backlight and weeks of battery life",
      shopLink: "https://amazon.in/e-reader"
    }
  ],
  Fashion: [
    {
      name: "Designer Watch Collection",
      price: 24999,
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e",
      description: "Elegant designer watch for any occasion",
      shopLink: "https://amazon.in/designer-watch"
    },
    {
      name: "Premium Fashion Set",
      price: 9999,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      description: "Trendy fashion collection for the style-conscious",
      shopLink: "https://amazon.in/fashion-set"
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
  const suggestions: GiftSuggestion[] = [];
  
  interests.forEach(interest => {
    const categoryGifts = giftDatabase[interest] || [];
    const affordableGifts = categoryGifts.filter(gift => gift.price <= budget);
    suggestions.push(...affordableGifts);
  });

  switch (occasion) {
    case "Diwali":
      suggestions.push({
        name: "Premium Dry Fruits Gift Box",
        price: 2499,
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
        description: "Luxurious assortment of dry fruits in a beautiful gift box",
        shopLink: "https://amazon.in/dry-fruits-box"
      });
      break;
  }

  return Array.from(new Set(suggestions))
    .filter(gift => gift.price <= budget)
    .slice(0, 6);
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
    
    if (!selectedOccasion) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an occasion",
      });
      return;
    }

    if (!budget) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your budget",
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

    const newSuggestions = generateGiftSuggestions(selectedInterests, Number(budget), selectedOccasion);
    setSuggestions(newSuggestions);
    setShowSuggestions(true);

    toast({
      title: "Perfect gifts found!",
      description: "Click on any gift to view shopping options.",
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

