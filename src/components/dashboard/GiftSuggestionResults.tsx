
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
    <div className="mt-8">
      <Card className="backdrop-blur-sm bg-white/90">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
              Gift Ideas for {selectedOccasion}
            </h2>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Budget: ₹{budget}
              </Badge>
              {selectedInterests.length > 0 && (
                <Badge variant="outline" className="bg-violet-50 text-violet-700">
                  Interests: {selectedInterests.slice(0, 2).join(", ")}
                  {selectedInterests.length > 2 && "..."}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
