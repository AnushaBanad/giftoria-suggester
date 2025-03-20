
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Gift, User } from "lucide-react";
import { 
  getUserPreferences, 
  saveUserPreferences, 
  saveLikedItems, 
  saveCartItems,
  GiftSuggestion
} from "@/utils/userPreferences";
import { generateGiftSuggestions } from "@/utils/giftSuggestion";
import { AnimatedBackground } from "@/components/dashboard/AnimatedBackground";
import { GiftFinderForm } from "@/components/dashboard/GiftFinderForm";
import { GiftSuggestionDisplay } from "@/components/dashboard/GiftSuggestionDisplay";

const Dashboard = () => {
  // Load user preferences from localStorage
  const userPrefs = getUserPreferences();
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userPrefs.selectedInterests);
  const [budget, setBudget] = useState(userPrefs.budget || "1000");
  const [selectedOccasion, setSelectedOccasion] = useState(userPrefs.selectedOccasion);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(userPrefs.likedItems);
  const [cartItems, setCartItems] = useState<Set<string>>(userPrefs.cartItems);
  const { toast } = useToast();

  // Save current selections to localStorage whenever they change
  useEffect(() => {
    saveUserPreferences(selectedInterests, budget, selectedOccasion, likedItems, cartItems);
  }, [selectedInterests, budget, selectedOccasion, likedItems, cartItems]);

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

  return (
    <AnimatedBackground>
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

        <GiftFinderForm
          selectedInterests={selectedInterests}
          budget={budget}
          selectedOccasion={selectedOccasion}
          onInterestChange={setSelectedInterests}
          onBudgetChange={setBudget}
          onOccasionChange={setSelectedOccasion}
          onSubmit={handleSubmit}
        />

        {showSuggestions && (
          <div className="mt-8">
            <GiftSuggestionDisplay
              suggestions={suggestions}
              selectedOccasion={selectedOccasion}
              budget={budget}
              selectedInterests={selectedInterests}
              likedItems={likedItems}
              cartItems={cartItems}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
};

export default Dashboard;
