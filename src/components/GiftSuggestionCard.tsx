
import React from "react";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { GiftSuggestion } from "@/utils/userPreferences";
import { GiftImageCarousel } from "./GiftImageCarousel";
import { Badge } from "@/components/ui/badge";
import { GiftBadges } from "./gift/GiftBadges";
import { GiftCardActions } from "./gift/GiftCardActions";

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
  if (!suggestion) {
    console.error("Missing suggestion data in GiftSuggestionCard");
    return null;
  }

  // Ensure we have valid suggestion data
  const safeData = {
    name: suggestion.name || "Gift Item",
    price: typeof suggestion.price === 'number' ? suggestion.price : 0,
    description: suggestion.description || "",
    image: suggestion.image || "",
    additionalImages: Array.isArray(suggestion.additionalImages) ? suggestion.additionalImages : [],
    category: suggestion.category || "",
    shopLink: suggestion.shopLink || "https://www.meesho.com/gift-finder"
  };
  
  // Determine if this is a collection
  const isCollection = safeData.name.includes("Collection");
  
  // Prepare images for the carousel
  const carouselImages = [
    safeData.image,
    ...(safeData.additionalImages || [])
  ].filter(Boolean);

  // Extract special offers from description if available
  const specialOffers = safeData.description?.includes("Special Offer")
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
          name={safeData.name} 
          price={safeData.price} 
        />
      </div>
      
      <div className="p-3 md:p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 line-clamp-2">{safeData.name}</h3>
        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-3">{safeData.description}</p>
        
        <GiftBadges 
          isCollection={isCollection} 
          price={safeData.price}
          specialOffers={specialOffers}
          category={safeData.category}
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
