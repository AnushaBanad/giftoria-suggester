
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
import { prepareCarouselImages, getDefaultImage, formatCurrency } from "@/components/gift/ImageUtils";

interface GiftImageCarouselProps {
  images: string[];
  name: string;
  price: number;
}

export const GiftImageCarousel: React.FC<GiftImageCarouselProps> = ({
  images = [],
  name = "Gift Item",
  price = 0,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [hasError, setHasError] = useState(false);
  
  // Process the images to ensure we have valid ones
  const finalImages = prepareCarouselImages(
    Array.isArray(images) && images.length > 0 ? images[0] : undefined,
    Array.isArray(images) && images.length > 1 ? images.slice(1) : []
  );

  // Initialize the imagesLoaded state with false for each image
  useEffect(() => {
    setImagesLoaded(new Array(finalImages.length).fill(false));
    setHasError(false);
  }, [finalImages.length]);

  // Set up auto-rotation for the carousel
  useEffect(() => {
    if (!api || finalImages.length <= 1 || hasError) return;

    const interval = setInterval(() => {
      api?.scrollNext();
    }, 3000); // Switch images every 3 seconds

    return () => clearInterval(interval);
  }, [api, finalImages.length, hasError]);

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
  };

  // Handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    console.log(`Image error loading at index ${index}:`, e);
    const target = e.target as HTMLImageElement;
    
    // Use a fallback image
    target.src = getDefaultImage(index);
    
    // Force a retry with the fallback image and prevent infinite retries
    target.onerror = null;
    
    // Mark as loaded to prevent loading indicators
    handleImageLoad(index);
  };

  return (
    <div className="relative w-full">
      <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {finalImages.map((image, index) => (
            <CarouselItem key={`image-${index}-${image.substring(0, 20)}`}>
              <AspectRatio ratio={4/3} className="bg-gray-100 overflow-hidden">
                <img
                  src={image}
                  alt={`${name} - image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          {formatCurrency(price)}
        </div>
      </Carousel>
      {finalImages.length > 1 && (
        <div className="flex justify-center mt-2 gap-1">
          {finalImages.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? "bg-emerald-600" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
