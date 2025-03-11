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
  // Expanded gift database with more accurate Meesho links
  // ... (same as original code)
};

const alternativeShops: Record<string, Record<string, string>> = {
  // ... (same as original code)
};

const interestToOccasions: Record<string, string[]> = {
  "Technology": ["Birthday", "Graduation", "New Job", "Thank You", "Diwali", "Christmas", "New Year"],
  "Books": ["Birthday", "Graduation", "New Job", "Thank You", "Get Well Soon", "Christmas", "New Year"],
  "Fashion": ["Birthday", "Anniversary", "Wedding", "Graduation", "Engagement", "Valentine's Day", "Diwali", "Karwa Chauth"],
  "Music": ["Birthday", "Graduation", "Thank You", "New Year", "Valentine's Day"],
  "Gaming": ["Birthday", "Graduation", "New Job", "Thank You", "Christmas", "New Year"],
  "Beauty": ["Birthday", "Anniversary", "Wedding", "Engagement", "Valentine's Day", "Mother's Day"],
  "Sports": ["Birthday", "Graduation", "Father's Day", "Thank You", "New Year"],
  "Art": ["Birthday", "Graduation", "Housewarming", "Thank You", "Diwali", "Christmas"],
  "Home Decor": ["Wedding", "Housewarming", "Anniversary", "Diwali", "Christmas", "New Year"],
  "Photography": ["Birthday", "Graduation", "New Job", "Wedding", "Travel"],
  "Cooking": ["Housewarming", "Wedding", "Anniversary", "Mother's Day", "Father's Day"],
  "Outdoor": ["Birthday", "Father's Day", "New Year", "Travel"],
  "Fitness": ["Birthday", "New Year", "Thank You", "Father's Day"]
};

const interests = [
  "Technology", "Fashion", "Sports", "Books", "Music", 
  "Art", "Cooking", "Gaming", "Outdoor", "Fitness",
  "Travel", "Home Decor", "Photography", "Movies", "DIY",
  "Gardening", "Pets", "Beauty", "Coffee & Tea", "Wine & Spirits",
  "Jewelry", "Wellness", "Eco-Friendly", "Stationery", "Collectibles",
  "Cars", "Science", "Languages", "History", "Nature"
];

const allOccasions = [
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
          image: `https://images.meesho.com/images/products/207082345/jw3uy_512.jpg`,
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
            image: `https://images.meesho.com/images/products/98765432/kydpw_512.jpg`,
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
      image: "https://images.meesho.com/images/products/123456789/srzyx_512.jpg",
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
  }, [selectedInterests]);

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
                      <a 
                        key={index}
                        href={suggestion.shopLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-emerald-300 hover:bg-emerald-50/30"
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img 
                            src={suggestion.image}
                            alt={suggestion.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.meesho.com/images/products/207082345/jw3uy_512.jpg";
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ₹{suggestion.price}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-lg mb-2">{suggestion.name}</h3>
                          <p className="text-gray-600 text-sm flex-grow">{suggestion.description}</p>
                          <div className="mt-4 text-sm font-medium text-emerald-600 hover:underline">
                            View on Meesho
                          </div>
                        </div>
                      </a>
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
