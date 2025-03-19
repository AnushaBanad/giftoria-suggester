
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Gift } from "lucide-react";
import { GiftSuggestion } from "@/utils/userPreferences";
import { GiftImageCarousel } from "./GiftImageCarousel";
import { Badge } from "@/components/ui/badge";

interface GiftSuggestionCardProps {
  suggestion: GiftSuggestion;
  isLiked: boolean;
  isInCart: boolean;
  onAddToWishlist: (suggestion: GiftSuggestion) => void;
  onAddToCart: (suggestion: GiftSuggestion) => void;
}

export const GiftSuggestionCard: React.FC<GiftSuggestionCardProps> = ({
  suggestion,
  isLiked,
  isInCart,
  onAddToWishlist,
  onAddToCart,
}) => {
  // Prepare images for carousel - use additionalImages if available or just the main image
  const carouselImages = suggestion.additionalImages && suggestion.additionalImages.length > 0
    ? [suggestion.image, ...suggestion.additionalImages]
    : [suggestion.image];

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
      <div className="absolute top-2 left-2 z-10">
        <Badge variant="secondary" className="bg-violet-100 text-violet-800 flex items-center gap-1">
          <Gift className="w-3 h-3" />
          Gift Idea
        </Badge>
      </div>
      
      <GiftImageCarousel 
        images={carouselImages} 
        name={suggestion.name} 
        price={suggestion.price} 
      />
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{suggestion.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            ₹{suggestion.price}
          </Badge>
          {suggestion.name.includes("Collection") && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Collection
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className={`${
              isLiked
                ? 'bg-rose-100 text-rose-600 border-rose-200' 
                : 'text-gray-600'
            }`}
            onClick={() => onAddToWishlist(suggestion)}
          >
            <Heart className={`${isLiked ? 'fill-current' : ''} mr-1`} />
            <span className="text-xs">Save</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className={`${
              isInCart
                ? 'bg-blue-100 text-blue-600 border-blue-200'
                : 'text-gray-600'
            }`}
            onClick={() => onAddToCart(suggestion)}
          >
            <ShoppingBag className={`${isInCart ? 'fill-current' : ''} mr-1`} />
            <span className="text-xs">Cart</span>
          </Button>
          
          <a
            href={suggestion.shopLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Buy Now
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};
