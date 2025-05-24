
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { saveUserPreferences } from "@/utils/userPreferences";
import { useInterests } from "./useInterests";
import { useBudget } from "./useBudget";
import { useOccasions } from "./useOccasions";
import { useGiftSuggestions } from "./useGiftSuggestions";
import { useUserPreferences } from "./useUserPreferences";

export const useDashboard = () => {
  // Load user preferences from localStorage
  const userPrefs = getUserPreferences();
  
  // Use our new hooks to manage state
  const { selectedInterests, handleInterestClick, availableInterests } = 
    useInterests(userPrefs.selectedInterests || []);
    
  const { budget, handleBudgetSliderChange, handleBudgetInputChange } = 
    useBudget(userPrefs.budget || "1000");
    
  const { selectedOccasion, filteredOccasions, handleOccasionClick } = 
    useOccasions(selectedInterests, userPrefs.selectedOccasion || "");
    
  const { likedItems, cartItems, setLikedItems, setCartItems } = 
    useUserPreferences();
    
  const { 
    suggestions, 
    showSuggestions, 
    isLoading, 
    hasError, 
    errorMessage,
    setShowSuggestions,
    generateSuggestions,
    handleAddToWishlist: baseHandleAddToWishlist,
    handleAddToCart: baseHandleAddToCart
  } = useGiftSuggestions(likedItems, cartItems);

  const { toast } = useToast();

  // Save current selections to localStorage whenever they change
  useEffect(() => {
    saveUserPreferences(selectedInterests, budget, selectedOccasion, likedItems, cartItems);
  }, [selectedInterests, budget, selectedOccasion, likedItems, cartItems]);

  const handleAddToWishlist = (suggestion) => {
    baseHandleAddToWishlist(suggestion, setLikedItems);
  };

  const handleAddToCart = (suggestion) => {
    baseHandleAddToCart(suggestion, setCartItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    // Generate suggestions
    await generateSuggestions(selectedInterests, budget, selectedOccasion);
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
    interests: availableInterests,
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

// Fix missing import
import { getUserPreferences } from "@/utils/userPreferences";
