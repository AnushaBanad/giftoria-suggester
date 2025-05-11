
import React from "react";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { GiftSuggestion } from "@/utils/userPreferences";
import { GiftImageCarousel } from "./GiftImageCarousel";
import { Badge } from "@/components/ui/badge";
import { GiftBadges } from "./gift/GiftBadges";
import { GiftCardActions } from "./gift/GiftCardActions";
import { prepareCarouselImages } from "./gift/ImageUtils";

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
  // Determine if this is a collection
  const isCollection = suggestion.name.includes("Collection");
  
  // Prepare images for the carousel using our utility function
  const carouselImages = prepareCarouselImages(suggestion.image, suggestion.additionalImages);

  // Extract special offers from description if available
  const specialOffers = suggestion.description?.includes("Special Offer")
    ? ["Special Offer"]
    : [];

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
      <div className="absolute top-2 left-2 z-10">
        <Badge variant="secondary" className="bg-violet-100 text-violet-800 flex items-center gap-1">
          <Gift className="w-3 h-3" />
          Gift Idea
        </Badge>
      </div>
      
      <div className="w-full">
        <GiftImageCarousel 
          images={carouselImages} 
          name={suggestion.name} 
          price={suggestion.price} 
        />
      </div>
      
      <div className="p-3 md:p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 line-clamp-2">{suggestion.name}</h3>
        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-3">{suggestion.description}</p>
        
        <GiftBadges 
          isCollection={isCollection} 
          price={suggestion.price}
          specialOffers={specialOffers}
          category={suggestion.category}
        />
        
        <GiftCardActions
          suggestion={suggestion}
          isLiked={isLiked}
          isInCart={isInCart}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
          size="default"
        />
      </div>
    </Card>
  );
};
