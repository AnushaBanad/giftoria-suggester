
// Types for gift-related data
export interface GiftSuggestion {
  name: string;
  price: number;
  image: string;
  description: string;
  shopLink: string;
}

// Get preferences from local storage
export const getUserPreferences = () => {
  try {
    const storedInterests = localStorage.getItem('selectedInterests');
    const storedBudget = localStorage.getItem('budget');
    const storedOccasion = localStorage.getItem('selectedOccasion');
    const storedLikedItems = localStorage.getItem('likedItems');
    const storedCartItems = localStorage.getItem('cartItems');
    
    return {
      selectedInterests: storedInterests ? JSON.parse(storedInterests) : [],
      budget: storedBudget || "",
      selectedOccasion: storedOccasion || "",
      likedItems: storedLikedItems ? new Set(JSON.parse(storedLikedItems)) : new Set(),
      cartItems: storedCartItems ? new Set(JSON.parse(storedCartItems)) : new Set()
    };
  } catch (error) {
    console.error('Error loading preferences from localStorage:', error);
    return {
      selectedInterests: [],
      budget: "",
      selectedOccasion: "",
      likedItems: new Set(),
      cartItems: new Set()
    };
  }
};

// Save preferences to local storage
export const saveUserPreferences = (
  selectedInterests: string[],
  budget: string,
  selectedOccasion: string,
  likedItems: Set<string>,
  cartItems: Set<string>
) => {
  try {
    localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    localStorage.setItem('budget', budget);
    localStorage.setItem('selectedOccasion', selectedOccasion);
    localStorage.setItem('likedItems', JSON.stringify(Array.from(likedItems)));
    localStorage.setItem('cartItems', JSON.stringify(Array.from(cartItems)));
  } catch (error) {
    console.error('Error saving preferences to localStorage:', error);
  }
};

// Save liked items separately
export const saveLikedItems = (likedItems: Set<string>) => {
  try {
    localStorage.setItem('likedItems', JSON.stringify(Array.from(likedItems)));
  } catch (error) {
    console.error('Error saving liked items to localStorage:', error);
  }
};

// Save cart items separately
export const saveCartItems = (cartItems: Set<string>) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(Array.from(cartItems)));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};

// Get liked items as an array (for display)
export const getLikedItemsArray = (): string[] => {
  try {
    const storedLikedItems = localStorage.getItem('likedItems');
    return storedLikedItems ? JSON.parse(storedLikedItems) : [];
  } catch (error) {
    console.error('Error getting liked items from localStorage:', error);
    return [];
  }
};

// Get cart items as an array (for display)
export const getCartItemsArray = (): string[] => {
  try {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    console.error('Error getting cart items from localStorage:', error);
    return [];
  }
};

// Clear all preferences (for logout or reset)
export const clearUserPreferences = () => {
  try {
    localStorage.removeItem('selectedInterests');
    localStorage.removeItem('budget');
    localStorage.removeItem('selectedOccasion');
    // Intentionally NOT clearing liked items and cart items
  } catch (error) {
    console.error('Error clearing preferences from localStorage:', error);
  }
};
