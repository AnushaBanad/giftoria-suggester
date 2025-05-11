
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ExternalLink } from "lucide-react";
import { GiftSuggestion } from "@/utils/userPreferences";

interface GiftCardActionsProps {
  suggestion: GiftSuggestion;
  isLiked: boolean;
  isInCart: boolean;
  onAddToWishlist: (suggestion: GiftSuggestion) => void;
  onAddToCart: (suggestion: GiftSuggestion) => void;
  size?: "default" | "small";
}

export const GiftCardActions: React.FC<GiftCardActionsProps> = ({
  suggestion,
  isLiked,
  isInCart,
  onAddToWishlist,
  onAddToCart,
  size = "default"
}) => {
  // Define styles based on size
  const iconSize = size === "default" ? "w-4 h-4 mr-1" : "w-3 h-3 mr-1";
  const textSize = size === "default" ? "text-sm" : "text-xs";
  const buttonPadding = size === "default" ? "px-3 py-1.5" : "px-2 py-1";
  
  // Get wishlist button styles based on state
  const getWishlistStyles = () => {
    return isLiked
      ? 'bg-rose-100 text-rose-600 border-rose-200'
      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100';
  };
  
  // Get cart button styles based on state
  const getCartStyles = () => {
    return isInCart
      ? 'bg-blue-100 text-blue-600 border-blue-200'
      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-100';
  };

  return (
    <div className="flex justify-between items-center mt-auto gap-1">
      <Button
        variant="outline"
        size="sm"
        className={`${getWishlistStyles()} ${buttonPadding} h-auto transition-colors`}
        onClick={() => onAddToWishlist(suggestion)}
      >
        <Heart className={`${isLiked ? 'fill-current' : ''} ${iconSize}`} />
        <span className={textSize}>Save</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className={`${getCartStyles()} ${buttonPadding} h-auto transition-colors`}
        onClick={() => onAddToCart(suggestion)}
      >
        <ShoppingBag className={`${isInCart ? 'fill-current' : ''} ${iconSize}`} />
        <span className={textSize}>Cart</span>
      </Button>
      
      <a
        href={suggestion.shopLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >
        <Button 
          size="sm" 
          className={`bg-emerald-600 hover:bg-emerald-700 ${buttonPadding} h-auto transition-colors`}
        >
          <ExternalLink className={iconSize} />
          <span className={textSize}>Buy Now</span>
        </Button>
      </a>
    </div>
  );
};
