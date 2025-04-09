import { GiftSuggestion } from "@/utils/userPreferences";
import { getInterestBasedGiftSuggestions, alternativeShops, getRelevantGiftImage } from "@/data/giftDatabase";

// Enhanced gift suggestion algorithm with better interest and image matching
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
    // Try to get suggestions for each interest, starting with the primary ones (Technology, Books, Fashion)
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

  // Special handling for Technology, Books, and Fashion
  const priorityInterests = ["Technology", "Books", "Fashion"].filter(interest => 
    interests.includes(interest)
  );
  
  // If we don't have enough suggestions and the user selected priority interests, add more for those
  if (suggestions.length < 3 && priorityInterests.length > 0) {
    console.log("Adding more suggestions for priority interests:", priorityInterests);
    
    // Add additional interest-specific products for each priority interest
    for (const interest of priorityInterests) {
      // Only add if we don't already have too many suggestions
      if (suggestions.length >= 6) break;
      
      if (interest === "Technology") {
        // Technology gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "USB Cable Set",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500",
            description: "Essential USB cable set for charging and data transfer",
            shopLink: "https://www.meesho.com/tech-accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
              "https://images.unsplash.com/photo-1600080971135-5c76b6bbe76f?w=500",
              "https://images.unsplash.com/photo-1570983996101-be36d96ca58d?w=500"
            ]
          });
          
          suggestions.push({
            name: "Phone Stand",
            price: Math.min(budget, 89),
            image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500",
            description: "Adjustable phone stand for hands-free viewing",
            shopLink: "https://www.meesho.com/tech-accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=500",
              "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500",
              "https://images.unsplash.com/photo-1563210173-c8e9be9e0c19?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Wireless Mouse",
            price: Math.min(budget, 299),
            image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500",
            description: "Ergonomic wireless mouse for comfortable computer use",
            shopLink: "https://www.meesho.com/tech-accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
              "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500",
              "https://images.unsplash.com/photo-1629949009765-80c5874ae346?w=500"
            ]
          });
          
          suggestions.push({
            name: "Portable Power Bank",
            price: Math.min(budget, 399),
            image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
            description: "Compact power bank for charging devices on the go",
            shopLink: "https://www.meesho.com/tech-accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1619098792662-7f0ea27a55d9?w=500",
              "https://images.unsplash.com/photo-1618411640018-972400a01458?w=500",
              "https://images.unsplash.com/photo-1585535740059-260a8a52d4f9?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Bluetooth Speaker",
            price: Math.min(budget, 999),
            image: "https://images.unsplash.com/photo-1589003077984-894e133f8885?w=500",
            description: "Portable Bluetooth speaker with rich sound quality",
            shopLink: "https://www.meesho.com/tech",
            additionalImages: [
              "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
              "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500",
              "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500"
            ]
          });
          
          suggestions.push({
            name: "Smart Fitness Tracker",
            price: Math.min(budget, 1299),
            image: "https://images.unsplash.com/photo-1575311373937-040b8e97429e?w=500",
            description: "Track your health metrics with this sleek fitness wearable",
            shopLink: "https://www.meesho.com/tech",
            additionalImages: [
              "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500",
              "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500",
              "https://images.unsplash.com/photo-1555487505-8603a1a69755?w=500"
            ]
          });
        }
      }
      
      if (interest === "Books") {
        // Books gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Pocket Poetry Book",
            price: Math.min(budget, 75),
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
            description: "Compact collection of inspiring poems to carry anywhere",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
              "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=500"
            ]
          });
          
          suggestions.push({
            name: "Mini Journal",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1598618356794-eb1720430eb4?w=500",
            description: "Small notebook perfect for jotting down thoughts and ideas",
            shopLink: "https://www.meesho.com/stationery",
            additionalImages: [
              "https://images.unsplash.com/photo-1519485554604-29453df75233?w=500",
              "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500",
              "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Bestselling Novel",
            price: Math.min(budget, 350),
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
            description: "Popular fiction novel by a renowned author",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
              "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500"
            ]
          });
          
          suggestions.push({
            name: "Illustrated Coffee Table Book",
            price: Math.min(budget, 499),
            image: "https://images.unsplash.com/photo-1467951591042-f388365db261?w=500",
            description: "Beautiful book featuring stunning photography and artwork",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1553714198-c9d2ecdfc8f6?w=500",
              "https://images.unsplash.com/photo-1544133782-76957fdd5854?w=500",
              "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Premium Book Collection",
            price: Math.min(budget, 1200),
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
            description: "Curated collection of must-read books in a beautiful box set",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
              "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500"
            ]
          });
          
          suggestions.push({
            name: "E-reader Device",
            price: Math.min(budget, 1999),
            image: "https://images.unsplash.com/photo-1544116507-4510492c9614?w=500",
            description: "Digital reading device for accessing thousands of books",
            shopLink: "https://www.meesho.com/tech",
            additionalImages: [
              "https://images.unsplash.com/photo-1510101097459-eff93c0f0216?w=500",
              "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500",
              "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=500"
            ]
          });
        }
      }
      
      if (interest === "Fashion") {
        // Fashion gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Stylish Socks Set",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1586953936333-366880552526?w=500",
            description: "Colorful patterned socks to add a pop of style to any outfit",
            shopLink: "https://www.meesho.com/fashion",
            additionalImages: [
              "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500",
              "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
              "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"
            ]
          });
          
          suggestions.push({
            name: "Fashion Wristbands",
            price: Math.min(budget, 89),
            image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500",
            description: "Trendy wristbands that complement any casual outfit",
            shopLink: "https://www.meesho.com/fashion/accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=500",
              "https://images.unsplash.com/photo-1573227895226-66130a1cb638?w=500",
              "https://images.unsplash.com/photo-1576022162028-7808c0a9d6bf?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Fashion Accessories Set",
            price: Math.min(budget, 399),
            image: "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
            description: "Complete set of fashion accessories to elevate any outfit",
            shopLink: "https://www.meesho.com/fashion",
            additionalImages: [
              "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500",
              "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500",
              "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"
            ]
          });
          
          suggestions.push({
            name: "Designer Belt",
            price: Math.min(budget, 499),
            image: "https://images.unsplash.com/photo-1631160299919-6a6988739d8a?w=500",
            description: "Stylish belt that adds a polished touch to any outfit",
            shopLink: "https://www.meesho.com/fashion/accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=500",
              "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Premium Scarf Collection",
            price: Math.min(budget, 899),
            image: "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500",
            description: "Luxurious scarves in various designs and fabrics",
            shopLink: "https://www.meesho.com/fashion",
            additionalImages: [
              "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
              "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500",
              "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500"
            ]
          });
          
          suggestions.push({
            name: "Designer Wallet",
            price: Math.min(budget, 1200),
            image: "https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?w=500",
            description: "Stylish leather wallet with multiple compartments",
            shopLink: "https://www.meesho.com/fashion/accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1585504156745-95a1e1f49cfe?w=500",
              "https://images.unsplash.com/photo-1559478405-583afdc82291?w=500",
              "https://images.unsplash.com/photo-1601648863653-7706a7d88cb5?w=500"
            ]
          });
        }
      }
    }
  }

  // If we still don't have enough suggestions, add interest-specific products for any budget
  if (suggestions.length < 3) {
    console.log("Not enough interest-based suggestions found, adding specific product suggestions for all budget levels");
    
    // Add interest-specific product recommendations for each interest
    for (const interest of interests) {
      // Only add if we don't already have too many suggestions
      if (suggestions.length >= 6) break;
      
      if (interest === "Technology") {
        // Technology gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "USB Cable Set",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500",
            description: "Essential USB cable set for charging and data transfer",
            shopLink: "https://www.meesho.com/tech-accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
              "https://images.unsplash.com/photo-1600080971135-5c76b6bbe76f?w=500",
              "https://images.unsplash.com/photo-1570983996101-be36d96ca58d?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Wireless Mouse",
            price: Math.min(budget, 299),
            image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500",
            description: "Ergonomic wireless mouse for comfortable computer use",
            shopLink: "https://www.meesho.com/tech-accessories",
            additionalImages: [
              "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
              "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500",
              "https://images.unsplash.com/photo-1629949009765-80c5874ae346?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Bluetooth Speaker",
            price: Math.min(budget, 999),
            image: "https://images.unsplash.com/photo-1589003077984-894e133f8885?w=500",
            description: "Portable Bluetooth speaker with rich sound quality",
            shopLink: "https://www.meesho.com/tech",
            additionalImages: [
              "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
              "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500",
              "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500"
            ]
          });
        }
      }
      
      if (interest === "Books") {
        // Books gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Pocket Poetry Book",
            price: Math.min(budget, 75),
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
            description: "Compact collection of inspiring poems to carry anywhere",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
              "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Bestselling Novel",
            price: Math.min(budget, 350),
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
            description: "Popular fiction novel by a renowned author",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
              "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Premium Book Collection",
            price: Math.min(budget, 1200),
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
            description: "Curated collection of must-read books in a beautiful box set",
            shopLink: "https://www.meesho.com/books",
            additionalImages: [
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
              "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500"
            ]
          });
        }
      }
      
      if (interest === "Fashion") {
        // Fashion gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Stylish Socks Set",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1586953936333-366880552526?w=500",
            description: "Colorful patterned socks to add a pop of style to any outfit",
            shopLink: "https://www.meesho.com/fashion",
            additionalImages: [
              "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500",
              "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
              "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Fashion Accessories Set",
            price: Math.min(budget, 399),
            image: "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
            description: "Complete set of fashion accessories to elevate any outfit",
            shopLink: "https://www.meesho.com/fashion",
            additionalImages: [
              "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500",
              "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500",
              "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Premium Scarf Collection",
            price: Math.min(budget, 899),
            image: "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500",
            description: "Luxurious scarves in various designs and fabrics",
            shopLink: "https://www.meesho.com/fashion",
            additionalImages: [
              "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
              "https://images.unsplash.com/photo-1617931358737-8565f107821d?w=500",
              "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500"
            ]
          });
        }
      }
      
      if (interest === "Music") {
        // Music gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Guitar Picks Collection",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500",
            description: "Variety of guitar picks for different playing styles",
            shopLink: "https://www.meesho.com/music",
            additionalImages: [
              "https://images.unsplash.com/photo-1598295893369-1918ffaf2972?w=500",
              "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Wired Earphones",
            price: Math.min(budget, 399),
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
            description: "High-quality wired earphones for clear audio experience",
            shopLink: "https://www.meesho.com/music",
            additionalImages: [
              "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500",
              "https://images.unsplash.com/photo-1598295893369-1918ffaf2972?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Portable Bluetooth Speaker",
            price: Math.min(budget, 999),
            image: "https://images.unsplash.com/photo-1589003077984-894e133f8885?w=500",
            description: "Compact speaker with excellent sound quality",
            shopLink: "https://www.meesho.com/music",
            additionalImages: [
              "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
              "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500"
            ]
          });
        }
      }
      
      if (interest === "Gaming") {
        // Gaming gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Gaming Stickers Pack",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500",
            description: "Cool gaming-themed stickers for laptops and devices",
            shopLink: "https://www.meesho.com/gaming",
            additionalImages: [
              "https://images.unsplash.com/photo-1586182987320-4f17e36370b3?w=500",
              "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Gaming Mousepad",
            price: Math.min(budget, 399),
            image: "https://images.unsplash.com/photo-1603381782058-ada3d95bca98?w=500",
            description: "Smooth gaming mousepad for precision gameplay",
            shopLink: "https://www.meesho.com/gaming",
            additionalImages: [
              "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
              "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Gaming Headset",
            price: Math.min(budget, 1299),
            image: "https://images.unsplash.com/photo-1591105575633-922c8897af9a?w=500",
            description: "Comfortable headset with surround sound for immersive gaming",
            shopLink: "https://www.meesho.com/gaming",
            additionalImages: [
              "https://images.unsplash.com/photo-1607016284318-d1384f89cb3f?w=500",
              "https://images.unsplash.com/photo-1599669454699-248893623440?w=500"
            ]
          });
        }
      }
      
      if (interest === "Beauty") {
        // Beauty gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Lip Balm Set",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500",
            description: "Moisturizing lip balms in various flavors",
            shopLink: "https://www.meesho.com/beauty",
            additionalImages: [
              "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
              "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Face Mask Collection",
            price: Math.min(budget, 399),
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
            description: "Set of rejuvenating face masks for radiant skin",
            shopLink: "https://www.meesho.com/beauty",
            additionalImages: [
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500",
              "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Luxury Skincare Set",
            price: Math.min(budget, 1499),
            image: "https://images.unsplash.com/photo-1615760134953-e9d1cc1cb1a0?w=500",
            description: "Premium skincare collection for radiant skin",
            shopLink: "https://www.meesho.com/beauty",
            additionalImages: [
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500",
              "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
            ]
          });
        }
      }
      
      if (interest === "Jewelry") {
        // Jewelry gifts for all budget tiers
        if (budget < 100) {
          suggestions.push({
            name: "Beaded Bracelet",
            price: Math.min(budget, 99),
            image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
            description: "Colorful beaded bracelet for casual wear",
            shopLink: "https://www.meesho.com/jewelry",
            additionalImages: [
              "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500",
              "https://images.unsplash.com/photo-1603050927325-baf630505e27?w=500"
            ]
          });
        } else if (budget < 500) {
          suggestions.push({
            name: "Silver Pendant Necklace",
            price: Math.min(budget, 499),
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
            description: "Elegant silver pendant necklace perfect for any occasion",
            shopLink: "https://www.meesho.com/jewelry",
            additionalImages: [
              "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=500",
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"
            ]
          });
        } else {
          suggestions.push({
            name: "Gold Plated Jewelry Set",
            price: Math.min(budget, 1499),
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
            description: "Complete set of elegant gold plated jewelry pieces",
            shopLink: "https://www.meesho.com/jewelry",
            additionalImages: [
              "https://images.unsplash.com/photo-1630019852942-7a3592136ccd?w=500",
              "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500"
            ]
          });
        }
      }
      
      // Add more interest categories as needed (Home Decor, Sports, Cooking, etc.)
      // But only for interests not yet covered above to avoid duplicates
    }
  }

  // If we have no suggestions at all after trying everything, add ultra-budget options
  if (suggestions.length === 0) {
    console.log("No suggestions found, adding ultra-budget options");
    
    return [
      {
        name: "Digital Gift Card",
        price: budget,
        image: "https://images.unsplash.com/photo-1612539332055-fe7e54d4cebd?w=500",
        description: `Digital gift card valued at ₹${budget} - perfect for any occasion`,
        shopLink: "https://www.meesho.com/gift-cards",
        additionalImages: [
          "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=500",
          "https://images.unsplash.com/photo-1671630773593-77ee0c542e8f?w=500",
          "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500"
        ]
      }
    ];
  }

  // Filter by budget and sort by relevance to selected interests
  const filteredSuggestions = suggestions
    .filter(gift => gift.price <= budget)
    .sort((a, b) => {
      // Check if item matches Technology, Books, or Fashion
      const aPriorityScore = priorityInterests.some(interest => 
        a.name.toLowerCase().includes(interest.toLowerCase()) || 
        a.description.toLowerCase().includes(interest.toLowerCase())
      ) ? 100 : 0;
      
      const bPriorityScore = priorityInterests.some(interest => 
        b.name.toLowerCase().includes(interest.toLowerCase()) || 
        b.description.toLowerCase().includes(interest.toLowerCase())
      ) ? 100 : 0;
      
      // Consider price proximity to budget (closer to budget = higher relevance)
      const aPriceScore = 20 * (1 - Math.abs(budget - a.price) / budget);
      const bPriceScore = 20 * (1 - Math.abs(budget - b.price) / budget);
      
      // Calculate total scores
      const aScore = aPriorityScore + aPriceScore;
      const bScore = bPriorityScore + bPriceScore;
      
      return bScore - aScore;
    })
    .slice(0, 6);

  console.log("Final suggestions:", filteredSuggestions);
  return filteredSuggestions;
};
