
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import { Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "@/hooks/useDashboard";
import { BackgroundAnimation } from "@/components/dashboard/BackgroundAnimation";
import { InterestSelection } from "@/components/dashboard/InterestSelection";
import { BudgetSection } from "@/components/dashboard/BudgetSection";
import { OccasionSelection } from "@/components/dashboard/OccasionSelection";
import { GiftSuggestionResults } from "@/components/dashboard/GiftSuggestionResults";

const Dashboard = () => {
  const {
    selectedInterests,
    budget,
    selectedOccasion,
    suggestions,
    showSuggestions,
    filteredOccasions,
    likedItems,
    cartItems,
    interests,
    isLoading,
    hasError,
    errorMessage,
    handleInterestClick,
    handleBudgetSliderChange,
    handleBudgetInputChange,
    handleOccasionClick,
    handleSubmit,
    handleAddToWishlist,
    handleAddToCart
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      {/* Background animation elements */}
      <BackgroundAnimation />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Gift className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">Personalize Your Gifts</h1>
            </div>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Interest Selection Component */}
            <InterestSelection 
              selectedInterests={selectedInterests}
              interests={interests}
              onInterestClick={handleInterestClick}
            />

            {/* Budget Selection Component */}
            <BudgetSection 
              budget={budget}
              onBudgetSliderChange={handleBudgetSliderChange}
              onBudgetInputChange={handleBudgetInputChange}
            />

            {/* Occasion Selection Component */}
            <OccasionSelection 
              selectedOccasion={selectedOccasion}
              filteredOccasions={filteredOccasions}
              selectedInterests={selectedInterests}
              onOccasionClick={handleOccasionClick}
            />

            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all hover:scale-[1.02] shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  Finding Gifts...
                </>
              ) : (
                <>
                  <Search className="mr-2" /> Find Perfect Gifts
                </>
              )}
            </Button>
          </form>

          {/* Gift Suggestion Results Component */}
          {showSuggestions && (
            <GiftSuggestionResults 
              suggestions={suggestions}
              selectedOccasion={selectedOccasion}
              budget={budget}
              selectedInterests={selectedInterests}
              likedItems={likedItems}
              cartItems={cartItems}
              isLoading={isLoading}
              hasError={hasError}
              errorMessage={errorMessage}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
