
// Helper functions for handling image loading
export const prepareCarouselImages = (mainImage: string, additionalImages: string[] | undefined): string[] => {
  // Default images if we need fallbacks
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
  ];

  // Ensure we have a valid main image
  const validMainImage = mainImage || defaultImages[0];
  
  // Filter out any empty strings from additionalImages
  const validAdditionalImages = additionalImages && additionalImages.length > 0
    ? additionalImages.filter(img => img && img.length > 0)
    : [defaultImages[1]];

  return [validMainImage, ...validAdditionalImages];
};

export const getDefaultImage = (index: number): string => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
  ];
  
  return defaultImages[index % defaultImages.length];
};
