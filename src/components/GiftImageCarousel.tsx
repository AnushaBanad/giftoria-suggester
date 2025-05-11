
import React, { useEffect, useState } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  
  // Make sure we always have valid images
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
  ];

  // If there are no additional images, ensure we use the default images
  const allImages = images && images.length > 0 
    ? images.filter(img => img && img.length > 0) // Filter out empty strings
    : defaultImages;
  
  // If we filtered out all images, use defaults
  const finalImages = allImages.length > 0 ? allImages : defaultImages;

  // Initialize the imagesLoaded state with false for each image
  useEffect(() => {
    setImagesLoaded(new Array(finalImages.length).fill(false));
  }, [finalImages.length]);

  // Set up auto-rotation for the carousel
  useEffect(() => {
    if (!api || finalImages.length <= 1) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Switch images every 3 seconds

    return () => clearInterval(interval);
  }, [api, finalImages.length]);

  // Track current slide
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentImageIndex(api.selectedScrollSnap() || 0);
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle image load success
  const handleImageLoad = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
    console.log(`Image loaded successfully: ${finalImages[index]}`);
  };

  // Handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    const target = e.target as HTMLImageElement;
    console.log(`Image failed to load: ${target.src}`);
    
    // Use a specific default image from our array based on the index
    target.src = defaultImages[index % defaultImages.length];
    
    // Force a retry with the fallback image and prevent infinite retries
    target.onerror = null;
  };

  return (
    <div className="relative w-full">
      <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {finalImages.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={4/3} className="bg-gray-100 overflow-hidden">
                <img
                  src={image}
                  alt={`${name} - image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                  onLoad={() => handleImageLoad(index)}
                  onError={(e) => handleImageError(e, index)}
                  loading="lazy"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        {finalImages.length > 1 && (
          <>
            <CarouselPrevious className="left-1 -translate-y-1/2 bg-white/80 shadow-md md:left-2" />
            <CarouselNext className="right-1 -translate-y-1/2 bg-white/80 shadow-md md:right-2" />
          </>
        )}
        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          ₹{price}
        </div>
      </Carousel>
    </div>
  );
};
