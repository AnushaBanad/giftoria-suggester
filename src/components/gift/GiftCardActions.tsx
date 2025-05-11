
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { GiftSuggestion } from "@/utils/userPreferences";

interface GiftCardActionsProps {
  suggestion: GiftSuggestion;
  isLiked: boolean;
  isInCart: boolean;
  onAddToWishlist: (suggestion: GiftSuggestion) => void;
  onAddToCart: (suggestion: GiftSuggestion) => void;
}

export const GiftCardActions: React.FC<GiftCardActionsProps> = ({
  suggestion,
  isLiked,
  isInCart,
  onAddToWishlist,
  onAddToCart,
}) => {
  return (
    <div className="flex justify-between items-center mt-auto gap-1">
      <Button
        variant="outline"
        size="sm"
        className={`${
          isLiked
            ? 'bg-rose-100 text-rose-600 border-rose-200' 
            : 'text-gray-600'
        } px-2 py-1 h-auto`}
        onClick={() => onAddToWishlist(suggestion)}
      >
        <Heart className={`${isLiked ? 'fill-current' : ''} w-3 h-3 mr-1 md:w-4 md:h-4`} />
        <span className="text-xs">Save</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className={`${
          isInCart
            ? 'bg-blue-100 text-blue-600 border-blue-200'
            : 'text-gray-600'
        } px-2 py-1 h-auto`}
        onClick={() => onAddToCart(suggestion)}
      >
        <ShoppingBag className={`${isInCart ? 'fill-current' : ''} w-3 h-3 mr-1 md:w-4 md:h-4`} />
        <span className="text-xs">Cart</span>
      </Button>
      
      <a
        href={suggestion.shopLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 px-2 py-1 h-auto">
          <span className="text-xs">Buy Now</span>
        </Button>
      </a>
    </div>
  );
};
