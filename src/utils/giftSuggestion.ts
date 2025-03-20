
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, alternativeShops, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better relevance and specific products
export const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  const budgetCategory = budget < 500 ? "Low Budget" : (budget < 5000 ? "Medium Budget" : "High Budget");
  
  // First try to get highly relevant gifts based on the primary interest and occasion
  if (interests.length > 0) {
    // Try to get suggestions for each interest, starting with the primary one
    for (const interest of interests) {
      const interestSuggestions = getInterestBasedGiftSuggestions(interest, budget, occasion);
      if (interestSuggestions.length > 0) {
        // Add a relevance indicator if it's not the primary interest
        const enhancedSuggestions = interest !== interests[0] 
          ? interestSuggestions.map(suggestion => ({
              ...suggestion,
              description: `${suggestion.description} (Perfect for ${interest} enthusiasts)`
            }))
          : interestSuggestions;
          
        suggestions = [...suggestions, ...enhancedSuggestions];
        console.log(`Found ${interestSuggestions.length} suggestions for interest: ${interest}`);
        
        // If we have enough suggestions from the high-priority interests, stop adding more
        if (suggestions.length >= 6) break;
      }
    }
  }

  // If we still don't have enough suggestions, try the fallback approach
  if (suggestions.length < 3) {
    console.log("Not enough interest-based suggestions found, adding specific product suggestions");
    
    // Add interest-specific product recommendations for each interest
    for (const interest of interests) {
      // Only add if we don't already have too many suggestions
      if (suggestions.length >= 6) break;
      
      if (interest === "Art") {
        suggestions.push({
          name: "Premium Sketchbook Set",
          price: Math.min(budget, 1200),
          image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "High-quality sketchbook with premium paper for artists",
          shopLink: "https://www.meesho.com/art-supplies",
          additionalImages: [
            "https://images.unsplash.com/photo-1602934585418-f588bea4215c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Photography") {
        suggestions.push({
          name: "Camera Lens Kit",
          price: Math.min(budget, 2500),
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Versatile camera lens kit for photography enthusiasts",
          shopLink: "https://www.meesho.com/photography",
          additionalImages: [
            "https://images.unsplash.com/photo-1617891879945-8814243a03c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1520549233664-03f65c1d1327?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Stationery") {
        suggestions.push({
          name: "Personalized Journal Set",
          price: Math.min(budget, 800),
          image: "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Elegant personalized journal with pen set for daily writing",
          shopLink: "https://www.meesho.com/stationery",
          additionalImages: [
            "https://images.unsplash.com/photo-1518688248740-7c31f1a945c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Technology") {
        suggestions.push({
          name: "Smart Home Device",
          price: Math.min(budget, 3000),
          image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Voice-controlled smart home assistant with advanced features",
          shopLink: "https://www.meesho.com/tech-gadgets",
          additionalImages: [
            "https://images.unsplash.com/photo-1556982257-3994f885e9e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1544428571-fae2ca763c0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Books") {
        suggestions.push({
          name: "Curated Book Collection",
          price: Math.min(budget, 1500),
          image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: `Handpicked collection of bestselling books perfect for ${occasion}`,
          shopLink: "https://www.meesho.com/books",
          additionalImages: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Music") {
        suggestions.push({
          name: "Wireless Headphones",
          price: Math.min(budget, 2000),
          image: "https://images.unsplash.com/photo-1618329075509-cc4725bf10f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: "Premium noise-cancelling headphones for music lovers",
          shopLink: "https://www.meesho.com/music-accessories",
          additionalImages: [
            "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
    }
  }

  // If we have no suggestions at all after trying everything, add a custom gift finder
  if (suggestions.length === 0) {
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
  const filteredSuggestions = suggestions
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
