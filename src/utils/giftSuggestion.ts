
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, alternativeShops, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better relevance
export const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  
  // Handle empty interests array
  if (!interests || interests.length === 0) {
    console.log("No interests provided, using generic suggestions");
    return getGenericSuggestions(budget, occasion);
  }
  
  // Process each interest to get suggestions
  for (const interest of interests) {
    console.log(`Looking for suggestions for interest: ${interest}, budget: ${budget}, occasion: ${occasion}`);
    const interestSuggestions = getInterestBasedGiftSuggestions(interest, budget, occasion);
    
    if (interestSuggestions && interestSuggestions.length > 0) {
      console.log(`Found ${interestSuggestions.length} suggestions for interest: ${interest}`);
      // Ensure we have valid images for each suggestion
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
            ]
      }));
      
      suggestions = [...suggestions, ...enhancedSuggestions];
    }
    
    // Break once we have enough suggestions
    if (suggestions.length >= 6) break;
  }

  // If we don't have enough suggestions, add some from alternative shops
  if (suggestions.length < 3) {
    console.log("Not enough interest-based suggestions, adding from alternative shops");
    const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
    
    interests.forEach(interest => {
      if (alternativeShops[budgetCategory]?.[interest]) {
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
  }

  // If we still don't have enough suggestions, add generic gifts
  if (suggestions.length < 3) {
    console.log("Still not enough suggestions, adding generic gifts");
    const genericSuggestions = getGenericSuggestions(budget, occasion);
    suggestions = [...suggestions, ...genericSuggestions];
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

// Helper function to generate generic suggestions
const getGenericSuggestions = (budget: number, occasion: string): GiftSuggestion[] => {
  return [
    {
      name: "Personalized Gift Experience",
      price: budget * 0.95,
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
      description: `Custom gift experience for ${occasion}`,
      shopLink: "https://www.meesho.com/gift-finder",
      additionalImages: [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
      ]
    },
    {
      name: "Premium Gift Card",
      price: budget * 0.9,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop",
      description: `Let them choose their perfect gift for ${occasion}`,
      shopLink: "https://www.meesho.com/gift-cards",
      additionalImages: [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop"
      ]
    },
    {
      name: "Luxury Gift Basket",
      price: budget,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
      description: `Curated luxury items perfect for ${occasion}`,
      shopLink: "https://www.meesho.com/gift-baskets",
      additionalImages: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop"
      ]
    }
  ];
};
