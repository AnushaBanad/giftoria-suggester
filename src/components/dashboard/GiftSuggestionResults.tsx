
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { GiftSuggestionCard } from "@/components/GiftSuggestionCard";
import { GiftSuggestion } from "@/utils/userPreferences";

interface GiftSuggestionResultsProps {
  suggestions: GiftSuggestion[];
  selectedOccasion: string;
  budget: string;
  selectedInterests: string[];
  likedItems: Set<string>;
  cartItems: Set<string>;
  onAddToWishlist: (suggestion: GiftSuggestion) => void;
  onAddToCart: (suggestion: GiftSuggestion) => void;
}

export const GiftSuggestionResults: React.FC<GiftSuggestionResultsProps> = ({
  suggestions,
  selectedOccasion,
  budget,
  selectedInterests,
  likedItems,
  cartItems,
  onAddToWishlist,
  onAddToCart
}) => {
  return (
    <div className="mt-6 sm:mt-8">
      <Card className="backdrop-blur-sm bg-white/90">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              <span className="break-words">Gift Ideas for {selectedOccasion}</span>
            </h2>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs sm:text-sm">
                Budget: ₹{budget}
              </Badge>
              {selectedInterests.length > 0 && (
                <Badge variant="outline" className="bg-violet-50 text-violet-700 text-xs sm:text-sm">
                  Interests: {selectedInterests.slice(0, 2).join(", ")}
                  {selectedInterests.length > 2 && "..."}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {suggestions.map((suggestion, index) => (
              <GiftSuggestionCard
                key={`${suggestion.name}-${index}`}
                suggestion={suggestion}
                isLiked={likedItems.has(suggestion.name)}
                isInCart={cartItems.has(suggestion.name)}
                onAddToWishlist={onAddToWishlist}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
