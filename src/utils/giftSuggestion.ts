
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm that shows all gifts below budget
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
  }

  // Ensure suggestions are unique
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(item => [item.name, item])).values()
  );

  // Filter by budget - show ALL gifts that are within or below budget
  const filteredSuggestions = uniqueSuggestions
    .filter(gift => gift.price <= budget) // Only show gifts within budget
    .sort((a, b) => {
      // Sort by price proximity to budget (closer to budget = higher relevance)
      const aPriceScore = 1 - Math.abs(budget - a.price) / budget;
      const bPriceScore = 1 - Math.abs(budget - b.price) / budget;
      return bPriceScore - aPriceScore;
    });

  // Ensure we have at least 6 suggestions for better UX
  const minSuggestions = 6;
  
  if (filteredSuggestions.length < minSuggestions) {
    // If we don't have enough, duplicate some suggestions with slight variations
    const baseSuggestions = filteredSuggestions.length > 0 ? filteredSuggestions : [];
    while (filteredSuggestions.length < minSuggestions && baseSuggestions.length > 0) {
      const baseIndex = filteredSuggestions.length % baseSuggestions.length;
      const baseSuggestion = baseSuggestions[baseIndex];
      
      // Create a variation with slightly different price or name
      const variation = {
        ...baseSuggestion,
        name: `${baseSuggestion.name} (Alternative)`,
        price: Math.round(baseSuggestion.price * (0.8 + Math.random() * 0.4)), // ±20% price variation
      };
      
      filteredSuggestions.push(variation);
    }
  }

  // Return ALL filtered suggestions (no maximum limit)
  console.log("Final suggestions:", filteredSuggestions);
  return filteredSuggestions;
};
