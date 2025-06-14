
export interface DashboardState {
  selectedInterests: string[];
  budget: string;
  selectedOccasion: string;
  suggestions: any[];
  showSuggestions: boolean;
  filteredOccasions: string[];
  likedItems: Set<string>;
  cartItems: Set<string>;
}

export interface DashboardActions {
  handleInterestClick: (interest: string) => void;
  handleBudgetSliderChange: (value: number[]) => void;
  handleBudgetInputChange: (value: string) => void;
  handleOccasionClick: (occasion: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleAddToWishlist: (suggestion: any) => void;
  handleAddToCart: (suggestion: any) => void;
}
