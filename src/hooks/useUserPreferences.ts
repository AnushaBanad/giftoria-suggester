
import { useState, useEffect } from "react";
import { 
  getUserPreferences, 
  saveUserPreferences, 
  saveLikedItems, 
  saveCartItems
} from "@/utils/userPreferences";

export const useUserPreferences = () => {
  const userPrefs = getUserPreferences();
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userPrefs.selectedInterests);
  const [budget, setBudget] = useState(userPrefs.budget || "1000");
  const [selectedOccasion, setSelectedOccasion] = useState(userPrefs.selectedOccasion);
  const [likedItems, setLikedItems] = useState<Set<string>>(userPrefs.likedItems);
  const [cartItems, setCartItems] = useState<Set<string>>(userPrefs.cartItems);

  // Save current selections to localStorage whenever they change
  useEffect(() => {
    saveUserPreferences(selectedInterests, budget, selectedOccasion, likedItems, cartItems);
  }, [selectedInterests, budget, selectedOccasion, likedItems, cartItems]);

  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleBudgetSliderChange = (value: number[]) => {
    setBudget(value[0].toString());
  };

  const handleBudgetInputChange = (value: string) => {
    setBudget(value);
  };

  const handleOccasionClick = (occasion: string) => {
    setSelectedOccasion(occasion);
  };

  const updateLikedItems = (newLikedItems: Set<string>) => {
    setLikedItems(newLikedItems);
    saveLikedItems(newLikedItems);
  };

  const updateCartItems = (newCartItems: Set<string>) => {
    setCartItems(newCartItems);
    saveCartItems(newCartItems);
  };

  return {
    selectedInterests,
    budget,
    selectedOccasion,
    likedItems,
    cartItems,
    handleInterestClick,
    handleBudgetSliderChange,
    handleBudgetInputChange,
    handleOccasionClick,
    updateLikedItems,
    updateCartItems
  };
};
