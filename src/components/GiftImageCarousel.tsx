
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

  // Generate fallback images that are more relevant to the gift category
  const getFallbackImagesByCategory = (giftName: string): string[] => {
    // Extract likely category from gift name
    const nameToLower = giftName.toLowerCase();
    
    if (nameToLower.includes("tech") || nameToLower.includes("gadget") || nameToLower.includes("usb") || nameToLower.includes("earbud") || nameToLower.includes("watch")) {
      return [
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500",
        "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500"
      ];
    } else if (nameToLower.includes("book") || nameToLower.includes("novel") || nameToLower.includes("reading")) {
      return [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500"
      ];
    } else if (nameToLower.includes("fashion") || nameToLower.includes("clothing") || nameToLower.includes("scarf") || nameToLower.includes("sock") || nameToLower.includes("accessory")) {
      return [
        "https://images.unsplash.com/photo-1601924351433-3d7a64899f1b?w=500",
        "https://images.unsplash.com/photo-1520903920243-53111ea4f7ea?w=500"
      ];
    } else if (nameToLower.includes("music") || nameToLower.includes("speaker") || nameToLower.includes("earphone") || nameToLower.includes("headphone") || nameToLower.includes("vinyl")) {
      return [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
      ];
    } else if (nameToLower.includes("gaming") || nameToLower.includes("mouse") || nameToLower.includes("headset") || nameToLower.includes("controller") || nameToLower.includes("game")) {
      return [
        "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
        "https://images.unsplash.com/photo-1603381782058-ada3d95bca98?w=500"
      ];
    } else if (nameToLower.includes("beauty") || nameToLower.includes("makeup") || nameToLower.includes("skincare") || nameToLower.includes("fragrance")) {
      return [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
        "https://images.unsplash.com/photo-1615760134953-e9d1cc1cb1a0?w=500"
      ];
    } else if (nameToLower.includes("jewelry") || nameToLower.includes("bracelet") || nameToLower.includes("necklace") || nameToLower.includes("earring")) {
      return [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"
      ];
    } else if (nameToLower.includes("home") || nameToLower.includes("decor") || nameToLower.includes("pillow") || nameToLower.includes("candle")) {
      return [
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500"
      ];
    } else if (nameToLower.includes("sport") || nameToLower.includes("yoga") || nameToLower.includes("fitness") || nameToLower.includes("exercise")) {
      return [
        "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=500",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500"
      ];
    } else if (nameToLower.includes("cooking") || nameToLower.includes("kitchen") || nameToLower.includes("baking") || nameToLower.includes("food")) {
      return [
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500"
      ];
    } else if (nameToLower.includes("travel") || nameToLower.includes("luggage") || nameToLower.includes("backpack") || nameToLower.includes("journey")) {
      return [
        "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=500",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500"
      ];
    } else if (nameToLower.includes("art") || nameToLower.includes("paint") || nameToLower.includes("sketch") || nameToLower.includes("canvas")) {
      return [
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500",
        "https://images.unsplash.com/photo-1579762593175-20c9062ccc59?w=500"
      ];
    } else if (nameToLower.includes("photography") || nameToLower.includes("camera") || nameToLower.includes("lens") || nameToLower.includes("photo")) {
      return [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500"
      ];
    } else if (nameToLower.includes("garden") || nameToLower.includes("plant") || nameToLower.includes("flower") || nameToLower.includes("seed")) {
      return [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
        "https://images.unsplash.com/photo-1462530164914-bf54591a8bb6?w=500"
      ];
    } else if (nameToLower.includes("diy") || nameToLower.includes("craft") || nameToLower.includes("handmade") || nameToLower.includes("supplies")) {
      return [
        "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500",
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500"
      ];
    } else if (nameToLower.includes("pet") || nameToLower.includes("dog") || nameToLower.includes("cat") || nameToLower.includes("animal")) {
      return [
        "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=500",
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"
      ];
    } else if (nameToLower.includes("outdoor") || nameToLower.includes("camping") || nameToLower.includes("hiking") || nameToLower.includes("adventure")) {
      return [
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=500",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500"
      ];
    } else if (nameToLower.includes("collectible") || nameToLower.includes("collection") || nameToLower.includes("figurine") || nameToLower.includes("antique")) {
      return [
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500",
        "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500"
      ];
    } else if (nameToLower.includes("stationery") || nameToLower.includes("pen") || nameToLower.includes("notebook") || nameToLower.includes("planner")) {
      return [
        "https://images.unsplash.com/photo-1519485554604-29453df75233?w=500",
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500"
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
