
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, alternativeShops, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better relevance
export const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  // First try to get highly relevant gifts based on the primary interest and occasion
  if (interests.length > 0) {
    const primaryInterest = interests[0];
    const interestSuggestions = getInterestBasedGiftSuggestions(primaryInterest, budget, occasion);
    if (interestSuggestions.length > 0) {
      suggestions = [...interestSuggestions];
      console.log(`Found ${interestSuggestions.length} suggestions for primary interest: ${primaryInterest}`);
    }
  }
  
  // If we didn't get enough suggestions from the primary interest, look at other interests
  if (suggestions.length < 4 && interests.length > 1) {
    for (let i = 1; i < interests.length; i++) {
      const interest = interests[i];
      const interestSuggestions = getInterestBasedGiftSuggestions(interest, budget, occasion);
      if (interestSuggestions.length > 0) {
        // Add a relevance indicator to the description
        const enhancedSuggestions = interestSuggestions.map(suggestion => ({
          ...suggestion,
          description: `Based on ${interest} interest: ${suggestion.description}`
        }));
        suggestions = [...suggestions, ...enhancedSuggestions];
        console.log(`Added ${interestSuggestions.length} suggestions for interest: ${interest}`);
      }
      if (suggestions.length >= 6) break;
    }
  }

  // If we still don't have enough suggestions, try the fallback approach
  if (suggestions.length === 0) {
    console.log("No interest-based suggestions found, adding generic suggestions");
    
    interests.forEach(interest => {
      if (alternativeShops[budgetCategory]?.[interest]) {
        console.log(`Adding alternative shop suggestion for ${interest}`);
        suggestions.push({
          name: `${interest} Gift Collection`,
          price: budget,
          image: getRelevantGiftImage(budget, [interest]),
          description: `Specially curated ${interest.toLowerCase()} items perfect for ${occasion}`,
          shopLink: alternativeShops[budgetCategory][interest],
          additionalImages: [
            getRelevantGiftImage(budget, [interest]),
            getRelevantGiftImage(budget, [interest])
          ]
        });
      }
    });

    if (suggestions.length === 0) {
      // If we still don't have suggestions, add some universal gift options
      suggestions.push({
        name: "Personalized Gift Experience",
        price: budget,
        image: getRelevantGiftImage(budget, interests),
        description: `Custom gift experience for ${occasion} based on their interests in ${interests.slice(0, 3).join(", ")}`,
        shopLink: "https://www.meesho.com/gift-finder",
        additionalImages: [
          getRelevantGiftImage(budget, interests),
          getRelevantGiftImage(budget, interests)
        ]
      });
      
      // Add a gift card option as a safe fallback
      suggestions.push({
        name: "Premium Gift Card",
        price: budget,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Let them choose their perfect gift for ${occasion}`,
        shopLink: "https://www.meesho.com/gift-cards",
        additionalImages: [
          "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ]
      });
    }
  }

  // Ensure suggestions are unique
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(item => [item.name, item])).values()
  );

  // If we have no suggestions at all, add a custom gift finder
  if (uniqueSuggestions.length === 0) {
    return [{
      name: "Custom Gift Finder",
      price: budget,
      image: getRelevantGiftImage(budget, interests),
      description: `We'll help you find the perfect gift for ${occasion} within your ₹${budget} budget`,
      shopLink: "https://www.meesho.com/gift-finder",
      additionalImages: [
        getRelevantGiftImage(budget, interests),
        getRelevantGiftImage(budget, interests)
      ]
    }];
  }

  // Filter by budget and sort by relevance
  const filteredSuggestions = uniqueSuggestions
    .filter(gift => gift.price <= budget)
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
