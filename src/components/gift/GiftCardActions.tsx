
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
  const iconSize = size === "default" ? "w-3 h-3" : "w-3 h-3";
  const textSize = size === "default" ? "text-xs" : "text-xs";
  const buttonPadding = size === "default" ? "px-2 py-1" : "px-1 py-1";
  
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
    <div className="flex flex-col sm:flex-row justify-between items-stretch mt-auto gap-2 w-full">
      <div className="flex gap-1 flex-1">
        <Button
          variant="outline"
          size="sm"
          className={`${getWishlistStyles()} ${buttonPadding} h-8 flex-1 min-w-0 transition-colors`}
          onClick={() => onAddToWishlist(suggestion)}
        >
          <Heart className={`${isLiked ? 'fill-current' : ''} ${iconSize} flex-shrink-0`} />
          <span className={`${textSize} truncate ml-1`}>Save</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className={`${getCartStyles()} ${buttonPadding} h-8 flex-1 min-w-0 transition-colors`}
          onClick={() => onAddToCart(suggestion)}
        >
          <ShoppingBag className={`${isInCart ? 'fill-current' : ''} ${iconSize} flex-shrink-0`} />
          <span className={`${textSize} truncate ml-1`}>Cart</span>
        </Button>
      </div>
      
      <a
        href={suggestion.shopLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <Button 
          size="sm" 
          className={`bg-emerald-600 hover:bg-emerald-700 ${buttonPadding} h-8 w-full sm:w-auto transition-colors`}
        >
          <ExternalLink className={`${iconSize} flex-shrink-0`} />
          <span className={`${textSize} ml-1 whitespace-nowrap`}>Buy Now</span>
        </Button>
      </a>
    </div>
  );
};
