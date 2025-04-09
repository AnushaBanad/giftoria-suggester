
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GiftImageCarouselProps {
  images: string[];
  name: string;
  price: number;
}

export const GiftImageCarousel: React.FC<GiftImageCarouselProps> = ({
  images,
  name,
  price,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  
  // If there are no additional images, ensure we at least have a placeholder image
  const allImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500"
  ];

  // Generate more relevant fallback images based on gift category
  const getFallbackImagesByCategory = (giftName: string): string[] => {
    // Extract likely category from gift name
    const nameToLower = giftName.toLowerCase();
    
    if (nameToLower.includes("tech") || nameToLower.includes("gadget") || nameToLower.includes("usb") || nameToLower.includes("earbud") || nameToLower.includes("watch")) {
      return [
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500",
        "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
        "https://images.unsplash.com/photo-1546486610-e9fe4f1e6751?w=500"
      ];
    } else if (nameToLower.includes("book") || nameToLower.includes("novel") || nameToLower.includes("reading")) {
      return [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
      ];
    } else if (nameToLower.includes("fashion") || nameToLower.includes("clothing") || nameToLower.includes("scarf") || nameToLower.includes("sock") || nameToLower.includes("accessory")) {
      return [
        "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
        "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500",
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500",
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500"
      ];
    } else if (nameToLower.includes("music") || nameToLower.includes("speaker") || nameToLower.includes("earphone") || nameToLower.includes("headphone") || nameToLower.includes("vinyl")) {
      return [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        "https://images.unsplash.com/photo-1589003077984-894e133f8885?w=500",
        "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500"
      ];
    } else if (nameToLower.includes("gaming") || nameToLower.includes("mouse") || nameToLower.includes("headset") || nameToLower.includes("controller") || nameToLower.includes("game")) {
      return [
        "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
        "https://images.unsplash.com/photo-1603381782058-ada3d95bca98?w=500",
        "https://images.unsplash.com/photo-1591105575633-922c8897af9a?w=500",
        "https://images.unsplash.com/photo-1599669454699-248893623440?w=500"
      ];
    } else if (nameToLower.includes("beauty") || nameToLower.includes("makeup") || nameToLower.includes("skincare") || nameToLower.includes("fragrance")) {
      return [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
        "https://images.unsplash.com/photo-1615760134953-e9d1cc1cb1a0?w=500",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500",
        "https://images.unsplash.com/photo-1585011570132-536ce848ebad?w=500"
      ];
    } else if (nameToLower.includes("jewelry") || nameToLower.includes("bracelet") || nameToLower.includes("necklace") || nameToLower.includes("earring")) {
      return [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
        "https://images.unsplash.com/photo-1630019852942-7a3592136ccd?w=500",
        "https://images.unsplash.com/photo-1599459182050-2d60fc4aa12f?w=500"
      ];
    }
    
    // Default fallback images
    return [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500"
    ];
  };

  // Get fallbacks based on gift name
  const fallbackImages = getFallbackImagesByCategory(name);

  // Set up auto-rotation with faster transition for the carousel
  useEffect(() => {
    if (!api || allImages.length <= 1) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000); // Switch images every 2 seconds for a more engaging experience

    // Make sure to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [api, allImages.length]);

  return (
    <div className="relative overflow-hidden group">
      <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={4/3} className="bg-gray-100">
                <img
                  src={image}
                  alt={`${name} - image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Use category-specific fallback images
                    (e.target as HTMLImageElement).src = fallbackImages[index % fallbackImages.length];
                  }}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        {allImages.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-2 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          ₹{price}
        </div>
      </Carousel>
    </div>
  );
};
