
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface OccasionSelectionProps {
  selectedOccasion: string;
  filteredOccasions: string[];
  selectedInterests: string[];
  onOccasionClick: (occasion: string) => void;
}

export const OccasionSelection: React.FC<OccasionSelectionProps> = ({
  selectedOccasion,
  filteredOccasions,
  selectedInterests,
  onOccasionClick
}) => {
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
              onClick={() => onOccasionClick(occasion)}
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
