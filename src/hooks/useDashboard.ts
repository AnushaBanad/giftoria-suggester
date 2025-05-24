
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    
    // Reset states
    setHasError(false);
    setErrorMessage("");
    
    // Validate form inputs
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

    console.log("Form submitted with:", {
      interests: selectedInterests,
      budget,
      occasion: selectedOccasion
    });
    
    // Show loading state
    setIsLoading(true);
    setShowSuggestions(true);
    setSuggestions([]);
    
    try {
      // Simulate network delay to show loading state (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get interest-specific suggestions directly first
      let directSuggestions: GiftSuggestion[] = [];
      selectedInterests.forEach(interest => {
        try {
          const interestSuggestions = getInterestBasedGiftSuggestions(
            interest, 
            Number(budget), 
            selectedOccasion
          );
          directSuggestions = [...directSuggestions, ...interestSuggestions];
        } catch (error) {
          console.error(`Error getting suggestions for ${interest}:`, error);
        }
      });

      // If we don't have enough direct suggestions, use the fallback generator
      let newSuggestions: GiftSuggestion[] = [];
      
      try {
        newSuggestions = directSuggestions.length >= 3 
          ? directSuggestions 
          : generateGiftSuggestions(selectedInterests, Number(budget), selectedOccasion);
      } catch (error) {
        console.error("Error generating suggestions:", error);
        setHasError(true);
        setErrorMessage("Failed to generate suggestions. Please try different criteria.");
        
        toast({
          variant: "destructive",
          title: "Error generating suggestions",
          description: "Please try different criteria or try again later.",
        });
        
        // Even with error, try to show any direct suggestions we managed to get
        newSuggestions = directSuggestions;
      }

      console.log("Generated suggestions:", newSuggestions);
      
      setSuggestions(newSuggestions);

      if (newSuggestions.length === 0) {
        toast({
          variant: "destructive",
          title: "No exact matches found",
          description: "We're showing alternative shopping options within your budget",
        });
      } else {
        toast({
          title: "Perfect gifts found!",
          description: `Found ${newSuggestions.length} gift suggestions for ${selectedOccasion}`,
        });
      }
    } catch (error) {
      console.error("Error in gift suggestion process:", error);
      setHasError(true);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load gift suggestions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = (suggestion: GiftSuggestion) => {
    try {
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
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
      });
    }
  };

  const handleAddToCart = (suggestion: GiftSuggestion) => {
    try {
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
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update cart. Please try again.",
      });
    }
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
    isLoading,
    hasError,
    errorMessage,
    handleInterestClick,
    handleBudgetSliderChange,
    handleBudgetInputChange,
    handleOccasionClick,
    handleSubmit,
    handleAddToWishlist,
    handleAddToCart
  };
};
