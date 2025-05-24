
import { useState } from "react";

export const useBudget = (initialBudget: string = "1000") => {
  const [budget, setBudget] = useState(initialBudget);
  
  const handleBudgetSliderChange = (value: number[]) => {
    setBudget(value[0].toString());
  };

  const handleBudgetInputChange = (value: string) => {
    setBudget(value);
  };
  
  return {
    budget,
    setBudget,
    handleBudgetSliderChange,
    handleBudgetInputChange
  };
};
