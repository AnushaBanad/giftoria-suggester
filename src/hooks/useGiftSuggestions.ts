
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  interests, 
  interestToOccasions, 
  allOccasions
} from "@/data/giftDatabase";
import { GiftSuggestion } from "@/utils/userPreferences";
import { generateGiftSuggestions } from "@/utils/giftSuggestion";

export const useGiftSuggestions = (selectedInterests: string[], selectedOccasion: string) => {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOccasions, setFilteredOccasions] = useState<string[]>(allOccasions);
  const { toast } = useToast();

  // Filter occasions based on selected interests
  useEffect(() => {
    if (selectedInterests.length === 0) {
      setFilteredOccasions(allOccasions);
    } else {
      let relevantOccasions = new Set<string>();
      selectedInterests.forEach(interest => {
        if (interestToOccasions[interest]) {
          interestToOccasions[interest].forEach(occasion => {
            relevantOccasions.add(occasion);
          });
        }
      });

      setFilteredOccasions(Array.from(relevantOccasions).sort());
    }
  }, [selectedInterests]);

  const generateSuggestions = async (interests: string[], budget: number, occasion: string) => {
    try {
      const newSuggestions = await generateGiftSuggestions(interests, budget, occasion);
      
      console.log("Generated suggestions:", newSuggestions);
      
      setSuggestions(newSuggestions);
      setShowSuggestions(true);

      if (newSuggestions.length === 0) {
        toast({
          variant: "destructive",
          title: "No gifts found",
          description: "No gift suggestions found for the selected interests and budget. Try adjusting your selections or increasing your budget.",
        });
      } else {
        toast({
          title: "Perfect gifts found!",
          description: `Found ${newSuggestions.length} gift suggestions for ${occasion}`,
        });
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate gift suggestions. Please try again.",
      });
    }
  };

  return {
    suggestions,
    showSuggestions,
    filteredOccasions,
    interests,
    generateSuggestions
  };
};
