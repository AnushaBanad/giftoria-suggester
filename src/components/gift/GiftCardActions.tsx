
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
  const iconSize = size === "default" ? "w-4 h-4" : "w-3 h-3";
  const textSize = size === "default" ? "text-sm" : "text-xs";
  const buttonHeight = size === "default" ? "h-9" : "h-8";
  
  // Get wishlist button styles based on state
  const getWishlistStyles = () => {
    return isLiked
      ? 'bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200'
      : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 border-gray-200';
  };
  
  // Get cart button styles based on state
  const getCartStyles = () => {
    return isInCart
      ? 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'
      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-100 border-gray-200';
  };

  return (
    <div className="space-y-2">
      {/* Top row: Save and Cart buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className={`${getWishlistStyles()} ${buttonHeight} flex-1 transition-all duration-200`}
          onClick={() => onAddToWishlist(suggestion)}
        >
          <Heart className={`${isLiked ? 'fill-current' : ''} ${iconSize}`} />
          <span className={`${textSize} ml-1`}>
            {isLiked ? 'Saved' : 'Save'}
          </span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className={`${getCartStyles()} ${buttonHeight} flex-1 transition-all duration-200`}
          onClick={() => onAddToCart(suggestion)}
        >
          <ShoppingBag className={`${isInCart ? 'fill-current' : ''} ${iconSize}`} />
          <span className={`${textSize} ml-1`}>
            {isInCart ? 'Added' : 'Cart'}
          </span>
        </Button>
      </div>
      
      {/* Bottom row: Buy Now button */}
      <a
        href={suggestion.shopLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Button 
          size="sm" 
          className={`bg-emerald-600 hover:bg-emerald-700 text-white ${buttonHeight} w-full transition-colors duration-200`}
        >
          <ExternalLink className={iconSize} />
          <span className={`${textSize} ml-1`}>Buy Now</span>
        </Button>
      </a>
    </div>
  );
};
