
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

interface GiftBadgesProps {
  isCollection: boolean;
  price: number;
}

export const GiftBadges: React.FC<GiftBadgesProps> = ({ isCollection, price }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2 md:mb-4">
      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
        ₹{price}
      </Badge>
      {isCollection && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
          Collection
        </Badge>
      )}
    </div>
  );
};
