
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GiftSuggestion, saveLikedItems, saveCartItems } from "@/utils/userPreferences";
import { generateGiftSuggestions } from "@/utils/giftSuggestion";
import { getInterestBasedGiftSuggestions } from "@/data/giftDatabase";

export const useGiftSuggestions = (likedItems: Set<string>, cartItems: Set<string>) => {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();
  
  const generateSuggestions = async (
    selectedInterests: string[],
    budget: string,
    selectedOccasion: string
  ) => {
    // Reset states
    setHasError(false);
    setErrorMessage("");
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
          if (Array.isArray(interestSuggestions) && interestSuggestions.length > 0) {
            directSuggestions = [...directSuggestions, ...interestSuggestions];
          }
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
        
        // Validate suggestions to ensure they're properly formatted
        newSuggestions = newSuggestions.filter(suggestion => 
          suggestion && 
          typeof suggestion === 'object' && 
          suggestion.name && 
          typeof suggestion.price === 'number'
        );
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
  
  const handleAddToWishlist = (suggestion: GiftSuggestion, setLikedItems: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    if (!suggestion || !suggestion.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid gift item",
      });
      return;
    }

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

  const handleAddToCart = (suggestion: GiftSuggestion, setCartItems: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    if (!suggestion || !suggestion.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid gift item",
      });
      return;
    }

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
    suggestions,
    showSuggestions,
    isLoading,
    hasError,
    errorMessage,
    setSuggestions,
    setShowSuggestions,
    generateSuggestions,
    handleAddToWishlist,
    handleAddToCart
  };
};
