
import { useToast } from "@/components/ui/use-toast";
import { useUserPreferences } from "./useUserPreferences";
import { useGiftSuggestions } from "./useGiftSuggestions";
import { useWishlistAndCart } from "./useWishlistAndCart";

export const useDashboard = () => {
  const { toast } = useToast();
  
  const {
    selectedInterests,
    budget,
    selectedOccasion,
    likedItems,
    cartItems,
    handleInterestClick,
    handleBudgetSliderChange,
    handleBudgetInputChange,
    handleOccasionClick,
    updateLikedItems,
    updateCartItems
  } = useUserPreferences();

  const {
    suggestions,
    showSuggestions,
    filteredOccasions,
    interests,
    generateSuggestions
  } = useGiftSuggestions(selectedInterests, selectedOccasion);

  const { handleAddToWishlist, handleAddToCart } = useWishlistAndCart(
    likedItems,
    cartItems,
    updateLikedItems,
    updateCartItems
  );

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

    await generateSuggestions(selectedInterests, Number(budget), selectedOccasion);
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
