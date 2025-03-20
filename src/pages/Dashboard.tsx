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
  getInterestBasedGiftSuggestions
} from "@/data/giftDatabase";
import { 
  getUserPreferences, 
  saveUserPreferences, 
  saveLikedItems, 
  saveCartItems,
  GiftSuggestion
} from "@/utils/userPreferences";
import { generateGiftSuggestions } from "@/utils/giftSuggestion";
import { GiftSuggestionCard } from "@/components/GiftSuggestionCard";
import { Badge } from "@/components/ui/badge"; 
import { Slider } from "@/components/ui/slider";

const Dashboard = () => {
  // Load user preferences from localStorage
  const userPrefs = getUserPreferences();
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userPrefs.selectedInterests);
  const [budget, setBudget] = useState(userPrefs.budget || "1000");
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
    
    // Allow any budget value, even very low ones
    if (!budget || Number(budget) <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid budget (must be greater than 0)",
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

    // For very low budgets, use our enhanced gift suggestions
    const parsedBudget = Number(budget);
    console.log("Parsed budget:", parsedBudget);
    
    // Prioritize key interests even if occasion is not selected
    let effectiveOccasion = selectedOccasion;
    if (!effectiveOccasion && selectedInterests.some(i => ["Technology", "Books", "Fashion", "Music", "Gaming"].includes(i))) {
      effectiveOccasion = "Birthday"; // Use a default occasion if not specified
      console.log("Using default occasion for key interests:", effectiveOccasion);
    }
    
    // Generate suggestions directly using our enhanced algorithm
    const newSuggestions = generateGiftSuggestions(
      selectedInterests, 
      parsedBudget,
      effectiveOccasion || "Birthday"
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
        description: `Found ${newSuggestions.length} gift suggestions${selectedOccasion ? ` for ${selectedOccasion}` : ""}`,
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

  // Handle budget slider changes
  const handleBudgetSliderChange = (value: number[]) => {
    setBudget(value[0].toString());
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
                  Select Their Interests
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
                <div className="flex flex-col space-y-6">
                  <div>
                    <Label htmlFor="budget" className="mb-2 block">Budget (in ₹): {budget}</Label>
                    <Slider 
                      value={[Number(budget)]} 
                      onValueChange={handleBudgetSliderChange} 
                      max={10000} 
                      step={100}
                      className="my-4"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budgetInput">Or enter exact amount:</Label>
                    <Input
                      id="budgetInput"
                      type="number"
                      placeholder="Enter your budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="focus:ring-2 focus:ring-emerald-500 transition-all hover:border-emerald-300 mt-2"
                    />
                  </div>
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
                      (filtered by their interests)
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <ShoppingBag className="w-6 h-6 text-emerald-600" />
                      Gift Ideas for {selectedOccasion}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Budget: ₹{budget}
                      </Badge>
                      {selectedInterests.length > 0 && (
                        <Badge variant="outline" className="bg-violet-50 text-violet-700">
                          Interests: {selectedInterests.slice(0, 2).join(", ")}
                          {selectedInterests.length > 2 && "..."}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
