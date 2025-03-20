
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { InterestSelector } from "./InterestSelector";
import { BudgetSelector } from "./BudgetSelector";
import { OccasionSelector } from "./OccasionSelector";

interface GiftFinderFormProps {
  selectedInterests: string[];
  budget: string;
  selectedOccasion: string;
  onInterestChange: (interests: string[]) => void;
  onBudgetChange: (budget: string) => void;
  onOccasionChange: (occasion: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const GiftFinderForm = ({
  selectedInterests,
  budget,
  selectedOccasion,
  onInterestChange,
  onBudgetChange,
  onOccasionChange,
  onSubmit
}: GiftFinderFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <InterestSelector 
        selectedInterests={selectedInterests}
        onInterestChange={onInterestChange}
      />

      <BudgetSelector 
        budget={budget}
        onBudgetChange={onBudgetChange}
      />

      <OccasionSelector 
        selectedInterests={selectedInterests}
        selectedOccasion={selectedOccasion}
        onOccasionChange={onOccasionChange}
      />

      <Button 
        type="submit" 
        className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all hover:scale-[1.02] shadow-lg"
      >
        <Search className="mr-2" /> Find Perfect Gifts
      </Button>
    </form>
  );
};
