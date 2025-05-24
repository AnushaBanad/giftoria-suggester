
import { useState, useEffect } from "react";
import { getUserPreferences, saveUserPreferences } from "@/utils/userPreferences";

export const useUserPreferences = () => {
  const userPrefs = getUserPreferences();
  const [likedItems, setLikedItems] = useState<Set<string>>(userPrefs.likedItems || new Set());
  const [cartItems, setCartItems] = useState<Set<string>>(userPrefs.cartItems || new Set());
  
  return {
    likedItems,
    cartItems,
    setLikedItems,
    setCartItems
  };
};
