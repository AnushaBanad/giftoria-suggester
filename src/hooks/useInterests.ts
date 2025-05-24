
import { useState, useEffect } from "react";
import { interests } from "@/data/giftDatabase";

export const useInterests = (initialInterests: string[] = []) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests);
  
  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  return {
    selectedInterests,
    setSelectedInterests,
    handleInterestClick,
    availableInterests: interests
  };
};
