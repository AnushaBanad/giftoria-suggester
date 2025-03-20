
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { allOccasions, interestToOccasions } from "@/data/giftDatabase";

interface OccasionSelectorProps {
  selectedInterests: string[];
  selectedOccasion: string;
  onOccasionChange: (occasion: string) => void;
}

export const OccasionSelector = ({ 
  selectedInterests,
  selectedOccasion, 
  onOccasionChange 
}: OccasionSelectorProps) => {
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

      setFilteredOccasions(Array.from(relevantOccasions).sort());
    }
  }, [selectedInterests]);

  // Select a default occasion if the current one is not in filtered list
  useEffect(() => {
    if (selectedOccasion && !filteredOccasions.includes(selectedOccasion)) {
      onOccasionChange("");
    }
  }, [filteredOccasions, selectedOccasion, onOccasionChange]);

  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Gift className="w-5 h-5 text-violet-500" />
          Select the Occasion
          {selectedInterests.length > 0 && (
            <span className="text-sm text-gray-500 font-normal">
              (filtered by their interests)
            </span>
          )}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredOccasions.map((occasion) => (
            <Button
              key={occasion}
              type="button"
              variant={selectedOccasion === occasion ? "default" : "outline"}
              onClick={() => onOccasionChange(occasion)}
              className={`transition-all hover:scale-105 ${
                selectedOccasion === occasion
                  ? "bg-violet-600 text-white"
                  : ""
              }`}
            >
              {occasion}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
