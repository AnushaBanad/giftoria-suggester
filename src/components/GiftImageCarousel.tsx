
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
  
  // If there are no additional images, ensure we at least have the main image
  const allImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500"
  ];

  // Fallback images in case of loading errors
  const fallbackImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500",
    "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500"
  ];

  // Set up auto-rotation for the carousel
  useEffect(() => {
    if (!api || allImages.length <= 1) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Switch images every 3 seconds

    return () => clearInterval(interval);
  }, [api, allImages.length]);

  return (
    <div className="relative">
      <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={4/3} className="bg-gray-100">
                <img
                  src={image}
                  alt={`${name} - image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImages[index % fallbackImages.length];
                  }}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        {allImages.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-white/80" />
            <CarouselNext className="right-2 bg-white/80" />
          </>
        )}
        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          ₹{price}
        </div>
      </Carousel>
    </div>
  );
};
