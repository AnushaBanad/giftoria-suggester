
import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, alternativeShops, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better budget handling
export const generateGiftSuggestions = (interests: string[], budget: number, occasion: string): GiftSuggestion[] => {
  console.log("Generating suggestions for:", { interests, budget, occasion });
  let suggestions: GiftSuggestion[] = [];
  
  // Define budget categories with a new "Very Low Budget" tier
  const budgetCategory = 
    budget < 100 ? "Very Low Budget" : 
    budget < 500 ? "Low Budget" : 
    budget < 5000 ? "Medium Budget" : 
    "High Budget";
  
  console.log("Budget category:", budgetCategory);
  
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

  // If we still don't have enough suggestions, add interest-specific low-budget options
  if (suggestions.length < 3) {
    console.log("Not enough interest-based suggestions found, adding specific low-budget product suggestions");
    
    // Add interest-specific product recommendations for each interest
    for (const interest of interests) {
      // Only add if we don't already have too many suggestions
      if (suggestions.length >= 6) break;
      
      if (interest === "Technology") {
        suggestions.push({
          name: budget < 100 ? "USB Cable" : (budget < 500 ? "USB Flash Drive" : "Tech Accessory Bundle"),
          price: Math.min(budget, budget < 100 ? 99 : (budget < 500 ? 299 : 499)),
          image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: budget < 100 ? "Reliable USB charging cable for your devices" : 
                       (budget < 500 ? "Portable USB storage for all your files" : "Affordable bundle of tech accessories"),
          shopLink: "https://www.meesho.com/tech-accessories",
          additionalImages: [
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1600080971135-5c76b6bbe76f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Books") {
        suggestions.push({
          name: budget < 100 ? "Pocket Book" : (budget < 500 ? "Bestselling Novel" : "Book Collection"),
          price: Math.min(budget, budget < 100 ? 75 : (budget < 500 ? 350 : 1200)),
          image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: budget < 100 ? "Compact pocket-sized book perfect for on-the-go reading" : 
                       (budget < 500 ? "Popular fiction novel by a renowned author" : "Curated collection of must-read books"),
          shopLink: "https://www.meesho.com/books",
          additionalImages: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Fashion") {
        suggestions.push({
          name: budget < 100 ? "Stylish Socks" : (budget < 500 ? "Fashion Accessories Set" : "Trendy Scarf"),
          price: Math.min(budget, budget < 100 ? 99 : (budget < 500 ? 399 : 500)),
          image: "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: budget < 100 ? "Colorful socks to add a pop of style to any outfit" : 
                       (budget < 500 ? "Set of fashion accessories to complete your look" : "Elegant scarf for all occasions"),
          shopLink: "https://www.meesho.com/fashion",
          additionalImages: [
            "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Music") {
        suggestions.push({
          name: budget < 100 ? "Guitar Picks Set" : (budget < 500 ? "Wired Earphones" : "Portable Bluetooth Speaker"),
          price: Math.min(budget, budget < 100 ? 99 : (budget < 500 ? 400 : 800)),
          image: "https://images.unsplash.com/photo-1598295893369-1918ffaf2972?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: budget < 100 ? "Colorful guitar picks for the musician in your life" : 
                       (budget < 500 ? "Quality wired earphones for music enjoyment" : "Compact speaker with excellent sound quality"),
          shopLink: "https://www.meesho.com/music",
          additionalImages: [
            "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
      
      if (interest === "Gaming") {
        suggestions.push({
          name: budget < 100 ? "Game Stickers Pack" : (budget < 500 ? "Gaming Mousepad" : "Gaming Mouse"),
          price: Math.min(budget, budget < 100 ? 99 : (budget < 500 ? 399 : 750)),
          image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          description: budget < 100 ? "Cool gaming-themed stickers for laptops and devices" : 
                       (budget < 500 ? "Smooth gaming mousepad for precision gameplay" : "High-precision gaming mouse with RGB lighting"),
          shopLink: "https://www.meesho.com/gaming",
          additionalImages: [
            "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1603381782058-ada3d95bca98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          ]
        });
      }
    }
  }

  // If we have no suggestions at all after trying everything, add ultra-budget options
  if (suggestions.length === 0) {
    console.log("No suggestions found, adding ultra-budget options");
    
    return [
      {
        name: "Digital Gift Card",
        price: budget,
        image: "https://images.unsplash.com/photo-1612539332055-fe7e54d4cebd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        description: `Digital gift card valued at ₹${budget} - perfect for any occasion`,
        shopLink: "https://www.meesho.com/gift-cards",
        additionalImages: [
          "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1671630773593-77ee0c542e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        ]
      }
    ];
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
