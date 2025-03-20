
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { interests } from "@/data/giftDatabase";

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestChange: (interests: string[]) => void;
}

export const InterestSelector = ({ 
  selectedInterests, 
  onInterestChange 
}: InterestSelectorProps) => {
  
  const handleInterestClick = (interest: string) => {
    onInterestChange(
      selectedInterests.includes(interest)
        ? selectedInterests.filter(i => i !== interest)
        : [...selectedInterests, interest]
    );
  };

  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          Select Their Interests
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Button
              key={interest}
              type="button"
              variant={selectedInterests.includes(interest) ? "default" : "outline"}
              onClick={() => handleInterestClick(interest)}
              className={`rounded-full transition-all hover:scale-105 ${
                selectedInterests.includes(interest)
                  ? "bg-emerald-600 text-white"
                  : ""
              }`}
            >
              {interest}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
