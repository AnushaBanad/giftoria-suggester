
// Helper functions for handling image loading
export const prepareCarouselImages = (mainImage: string | undefined, additionalImages: string[] | undefined): string[] => {
  // Default images if we need fallbacks
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
  ];

  // Ensure we have a valid main image
  const validMainImage = mainImage && mainImage.length > 0 ? mainImage : defaultImages[0];
  
  // Filter out any empty strings from additionalImages
  const validAdditionalImages = additionalImages && additionalImages.length > 0
    ? additionalImages.filter(img => img && img.length > 0)
    : [defaultImages[1]];

  // Build the final array of images, ensuring no duplicates
  const finalImages = [validMainImage];
  
  // Add additional images but avoid duplicates
  validAdditionalImages.forEach(img => {
    if (!finalImages.includes(img)) {
      finalImages.push(img);
    }
  });

  // If we still need more images, add from defaults
  if (finalImages.length < 2) {
    defaultImages.forEach(img => {
      if (!finalImages.includes(img) && finalImages.length < 3) {
        finalImages.push(img);
      }
    });
  }

  return finalImages;
};

export const getDefaultImage = (index: number): string => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=500&auto=format&fit=crop"
  ];
  
  return defaultImages[index % defaultImages.length];
};

// Helper to check if an image URL is valid
export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.length > 0 && (
    url.startsWith('http://') || 
    url.startsWith('https://') || 
    url.startsWith('data:image/')
  );
};

// Format currency values consistently
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
