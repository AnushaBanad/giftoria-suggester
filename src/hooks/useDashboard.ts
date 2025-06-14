import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
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

export const useDashboard = () => {
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

  const handleBudgetSliderChange = (value: number[]) => {
    setBudget(value[0].toString());
  };

  const handleBudgetInputChange = (value: string) => {
    setBudget(value);
  };

  const handleOccasionClick = (occasion: string) => {
    setSelectedOccasion(occasion);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Get interest-specific suggestions from both Supabase and local data
      const newSuggestions = await generateGiftSuggestions(selectedInterests, Number(budget), selectedOccasion);

      console.log("Generated suggestions:", newSuggestions);
      
      setSuggestions(newSuggestions);
      setShowSuggestions(true);

      if (newSuggestions.length === 0) {
        toast({
          variant: "destructive",
          title: "No gifts found",
          description: "No gift suggestions found for the selected interests and budget. Try adjusting your selections or increasing your budget.",
        });
      } else {
        toast({
          title: "Perfect gifts found!",
          description: `Found ${newSuggestions.length} gift suggestions for ${selectedOccasion}`,
        });
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate gift suggestions. Please try again.",
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

  return {
    selectedInterests,
    budget,
    selectedOccasion,
    suggestions,
    showSuggestions,
    filteredOccasions,
    likedItems,
    cartItems,
    interests,
    handleInterestClick,
    handleBudgetSliderChange,
    handleBudgetInputChange,
    handleOccasionClick,
    handleSubmit,
    handleAddToWishlist,
    handleAddToCart
  };
};
