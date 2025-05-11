
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, alternativeShops, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better relevance
export const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  // Process primary interests first: Technology, Books, and Fashion
  const priorityInterests = ["Technology", "Books", "Fashion"];
  const primaryInterests = interests.filter(interest => priorityInterests.includes(interest));
  const otherInterests = interests.filter(interest => !priorityInterests.includes(interest));
  
  // Combined ordered interests list with priority interests first
  const orderedInterests = [...primaryInterests, ...otherInterests];
  
  // First try to get highly relevant gifts based on the ordered interests and occasion
  if (orderedInterests.length > 0) {
    for (const interest of orderedInterests) {
      console.log(`Looking for suggestions for interest: ${interest}, budget: ${budget}, occasion: ${occasion}`);
      const interestSuggestions = getInterestBasedGiftSuggestions(interest, budget, occasion);
      
      if (interestSuggestions && interestSuggestions.length > 0) {
        console.log(`Found ${interestSuggestions.length} suggestions for interest: ${interest}`);
        // Ensure we have images for each suggestion
        const enhancedSuggestions = interestSuggestions.map(suggestion => ({
          ...suggestion,
          // Ensure image exists, fallback to getRelevantGiftImage if not
          image: suggestion.image || getRelevantGiftImage(budget, [interest]),
          // Make sure we have additional images
          additionalImages: suggestion.additionalImages && suggestion.additionalImages.length > 0 
            ? suggestion.additionalImages 
            : [getRelevantGiftImage(budget, [interest]), getRelevantGiftImage(budget, [interest])]
        }));
        
        suggestions = [...suggestions, ...enhancedSuggestions];
      }
      
      // Break once we have enough suggestions
      if (suggestions.length >= 6) break;
    }
  }

  // If we still don't have enough suggestions, try the fallback approach
  if (suggestions.length === 0) {
    console.log("No interest-based suggestions found, adding generic suggestions");
    
    orderedInterests.forEach(interest => {
      if (alternativeShops[budgetCategory]?.[interest]) {
        console.log(`Adding alternative shop suggestion for ${interest}`);
        suggestions.push({
          name: `${interest} Gift Collection`,
          price: budget * 0.9, // Slightly less than budget to make it attractive
          image: getRelevantGiftImage(budget, [interest]),
          description: `Specially curated ${interest.toLowerCase()} items perfect for ${occasion}`,
          shopLink: alternativeShops[budgetCategory][interest] || "https://www.meesho.com/gift-finder",
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
        price: budget * 0.95,
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
    .filter(gift => gift.price <= budget * 1.1) // Allow slightly over budget to show more options
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
