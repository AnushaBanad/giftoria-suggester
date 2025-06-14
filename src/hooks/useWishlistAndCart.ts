
import { useToast } from "@/components/ui/use-toast";
import { GiftSuggestion } from "@/utils/userPreferences";

export const useWishlistAndCart = (
  likedItems: Set<string>,
  cartItems: Set<string>,
  updateLikedItems: (items: Set<string>) => void,
  updateCartItems: (items: Set<string>) => void
) => {
  const { toast } = useToast();

  const handleAddToWishlist = (suggestion: GiftSuggestion) => {
    const newSet = new Set(likedItems);
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
    updateLikedItems(newSet);
  };

  const handleAddToCart = (suggestion: GiftSuggestion) => {
    const newSet = new Set(cartItems);
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
    updateCartItems(newSet);
  };

  return {
    handleAddToWishlist,
    handleAddToCart
  };
};
