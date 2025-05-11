
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Gift, ShoppingBag, Tag } from "lucide-react";

interface BadgeItem {
  text: string;
  icon?: React.ReactNode;
  variant: "price" | "collection" | "special" | "category";
}

interface GiftBadgesProps {
  isCollection: boolean;
  price: number;
  specialOffers?: string[];
  category?: string;
}

export const GiftBadges: React.FC<GiftBadgesProps> = ({
  isCollection,
  price,
  specialOffers = [],
  category,
}) => {
  // Create an array of badge items to display
  const badgeItems: BadgeItem[] = [
    {
      text: `₹${price}`,
      icon: <Tag className="w-3 h-3 mr-1" />,
      variant: "price"
    }
  ];

  // Add collection badge if applicable
  if (isCollection) {
    badgeItems.push({
      text: "Collection",
      icon: <ShoppingBag className="w-3 h-3 mr-1" />,
      variant: "collection"
    });
  }

  // Add special offers if any
  specialOffers.forEach(offer => {
    badgeItems.push({
      text: offer,
      variant: "special"
    });
  });

  // Add category if provided
  if (category) {
    badgeItems.push({
      text: category,
      variant: "category"
    });
  }

  // Function to get badge style based on variant
  const getBadgeStyle = (variant: string) => {
    switch (variant) {
      case "price":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "collection":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "special":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "category":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2 md:mb-4">
      {badgeItems.map((badge, index) => (
        <Badge 
          key={`${badge.variant}-${index}`} 
          variant="outline" 
          className={`${getBadgeStyle(badge.variant)} text-xs flex items-center`}
        >
          {badge.icon}
          {badge.text}
        </Badge>
      ))}
    </div>
  );
};
