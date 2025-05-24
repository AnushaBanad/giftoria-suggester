
import { useState, useEffect } from "react";
import { allOccasions, interestToOccasions } from "@/data/giftDatabase";

export const useOccasions = (selectedInterests: string[], initialOccasion: string = "") => {
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [filteredOccasions, setFilteredOccasions] = useState<string[]>(allOccasions);
  
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

      if (selectedOccasion && !relevantOccasions.has(selectedOccasion)) {
        setSelectedOccasion("");
      }

      setFilteredOccasions(Array.from(relevantOccasions).sort());
    }
  }, [selectedInterests, selectedOccasion]);
  
  const handleOccasionClick = (occasion: string) => {
    setSelectedOccasion(occasion);
  };
  
  return {
    selectedOccasion,
    setSelectedOccasion,
    filteredOccasions,
    handleOccasionClick
  };
};
