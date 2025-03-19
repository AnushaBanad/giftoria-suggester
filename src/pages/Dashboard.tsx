import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Search, Heart, ShoppingBag, DollarSign, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { 
  interests, 
  interestToOccasions, 
  allOccasions, 
  giftDatabase, 
  alternativeShops, 
  getRelevantGiftImage,
  getInterestBasedGiftSuggestions
} from "@/data/giftDatabase";
import { 
  getUserPreferences, 
  saveUserPreferences, 
  saveLikedItems, 
  saveCartItems,
  GiftSuggestion
} from "@/utils/userPreferences";
import { GiftSuggestionCard } from "@/components/GiftSuggestionCard";

const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  // First try to get highly relevant gifts based on the primary interest
  if (interests.length > 0) {
    const primaryInterest = interests[0];
    const interestSuggestions = getInterestBasedGiftSuggestions(primaryInterest, budget);
    if (interestSuggestions.length > 0) {
      suggestions = [...interestSuggestions];
      console.log(`Found ${interestSuggestions.length} suggestions for primary interest: ${primaryInterest}`);
    }
  }
  
  // If we didn't get enough suggestions from the primary interest, look at other interests
  if (suggestions.length < 3 && interests.length > 1) {
    for (let i = 1; i < interests.length; i++) {
      const interest = interests[i];
      const interestSuggestions = getInterestBasedGiftSuggestions(interest, budget);
      if (interestSuggestions.length > 0) {
        suggestions = [...suggestions, ...interestSuggestions];
        console.log(`Added ${interestSuggestions.length} suggestions for interest: ${interest}`);
      }
      if (suggestions.length >= 6) break;
    }
  }

  // If we still don't have enough suggestions, try the fallback approach
  if (suggestions.length === 0) {
    console.log("No interest-based suggestions found, adding generic suggestions");
    
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
  // Load user preferences from localStorage
  const userPrefs = getUserPreferences();
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userPrefs.selectedInterests);
  const [budget, setBudget] = useState(userPrefs.budget);
  const [selectedOccasion, setSelectedOccasion] = useState(userPrefs.selectedOccasion);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOccasions, setFilteredOccasions] = useState<string[]>(allOccasions);
  const [likedItems, setLikedItems] = useState<Set<string>>(userPrefs.likedItems);
  const [cartItems, setCartItems] = useState<Set<string>>(userPrefs.cartItems);
  const { toast } = useToast();

  // Save current selections to localStorage whenever they change
  useEffect(() => {
    saveUserPreferences(selectedInterests, budget, selectedOccasion, likedItems, cartItems);
  }, [selectedInterests, budget, selectedOccasion, likedItems, cartItems]);

  // Filter occasions based on selected interests
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
      // Save the updated liked items to localStorage
      saveLikedItems(newSet);
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
      // Save the updated cart items to localStorage
      saveCartItems(newSet);
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
                      <GiftSuggestionCard
                        key={`${suggestion.name}-${index}`}
                        suggestion={suggestion}
                        isLiked={likedItems.has(suggestion.name)}
                        isInCart={cartItems.has(suggestion.name)}
                        onAddToWishlist={handleAddToWishlist}
                        onAddToCart={handleAddToCart}
                      />
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
