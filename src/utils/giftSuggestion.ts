
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better relevance
export const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  
  // Handle empty interests array
  if (!interests || interests.length === 0) {
    console.log("No interests provided, returning empty array");
    return [];
  }
  
  // Process each interest to get suggestions
  for (const interest of interests) {
    console.log(`Looking for suggestions for interest: ${interest}, budget: ${budget}, occasion: ${occasion}`);
    const interestSuggestions = getInterestBasedGiftSuggestions(interest, budget, occasion);
    
    if (interestSuggestions && interestSuggestions.length > 0) {
      console.log(`Found ${interestSuggestions.length} suggestions for interest: ${interest}`);
      // Ensure we have valid images and categories for each suggestion
      const enhancedSuggestions = interestSuggestions.map(suggestion => ({
        ...suggestion,
        // Ensure image exists, fallback to getRelevantGiftImage if not
        image: suggestion.image || getRelevantGiftImage(budget, [interest]),
        // Make sure we have valid additional images
        additionalImages: (suggestion.additionalImages && suggestion.additionalImages.length > 0) 
          ? suggestion.additionalImages.filter(img => img && img.length > 0)
          : [
              getRelevantGiftImage(budget, [interest]), 
              getRelevantGiftImage(budget, [interest])
            ],
        // Ensure category exists, default to interest if not provided
        category: suggestion.category || interest
      }));
      
      suggestions = [...suggestions, ...enhancedSuggestions];
    }
    
    // Break once we have enough suggestions
    if (suggestions.length >= 6) break;
  }

  // Ensure suggestions are unique
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(item => [item.name, item])).values()
  );

  // Filter by budget and sort by relevance
  const filteredSuggestions = uniqueSuggestions
    .filter(gift => gift.price <= budget * 1.2) // Allow slightly over budget to show more options
    .sort((a, b) => {
      // Sort by price proximity to budget (closer to budget = higher relevance)
      const aPriceScore = 1 - Math.abs(budget - a.price) / budget;
      const bPriceScore = 1 - Math.abs(budget - b.price) / budget;
      return bPriceScore - aPriceScore;
    })
    .slice(0, 6);

  console.log("Final suggestions:", filteredSuggestions);
  return filteredSuggestions;
};
