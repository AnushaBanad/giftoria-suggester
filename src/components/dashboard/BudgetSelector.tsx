
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface BudgetSelectorProps {
  budget: string;
  onBudgetChange: (budget: string) => void;
}

export const BudgetSelector = ({ budget, onBudgetChange }: BudgetSelectorProps) => {
  const handleBudgetSliderChange = (value: number[]) => {
    onBudgetChange(value[0].toString());
  };

  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          Set Your Budget
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div>
            <Label htmlFor="budget" className="mb-2 block">Budget (in ₹): {budget}</Label>
            <Slider 
              value={[Number(budget)]} 
              onValueChange={handleBudgetSliderChange} 
              max={10000} 
              step={100}
              className="my-4"
            />
          </div>
          <div>
            <Label htmlFor="budgetInput">Or enter exact amount:</Label>
            <Input
              id="budgetInput"
              type="number"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => onBudgetChange(e.target.value)}
              className="focus:ring-2 focus:ring-emerald-500 transition-all hover:border-emerald-300 mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
