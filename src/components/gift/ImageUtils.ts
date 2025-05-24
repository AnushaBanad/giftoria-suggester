
// Helper functions for handling image loading
export const prepareCarouselImages = (mainImage: string | undefined, additionalImages: string[] | undefined): string[] => {
  // Default images if we need fallbacks
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
  ];

  // Sanitize inputs to ensure we don't have undefined or empty arrays
  const safeMain = mainImage || defaultImages[0];
  const safeAdditional = Array.isArray(additionalImages) ? additionalImages : [];
  
  // Filter out any invalid values
  const validMainImage = isValidImageUrl(safeMain) ? safeMain : defaultImages[0];
  const validAdditionalImages = safeAdditional
    .filter(img => img && typeof img === 'string' && isValidImageUrl(img));
  
  // Build the final array of images, ensuring no duplicates
  const finalImages = [validMainImage];
  
  // Add additional images but avoid duplicates
  for (const img of validAdditionalImages) {
    if (!finalImages.includes(img)) {
      finalImages.push(img);
    }
  }

  // If we still need more images, add from defaults
  if (finalImages.length < 2) {
    for (const img of defaultImages) {
      if (!finalImages.includes(img) && finalImages.length < 3) {
        finalImages.push(img);
      }
    }
  }

  // Ensure we have at least one image
  if (finalImages.length === 0) {
    return [defaultImages[0]];
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
  
  // Make sure we have a valid index
  const safeIndex = typeof index === 'number' && !isNaN(index) ? index : 0;
  return defaultImages[Math.abs(safeIndex) % defaultImages.length];
};

// Helper to check if an image URL is valid
export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  return url.length > 0 && (
    url.startsWith('http://') || 
    url.startsWith('https://') || 
    url.startsWith('data:image/')
  );
};

// Format currency values consistently
export const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || isNaN(amount)) {
    return "₹0"; // Default value for invalid amounts
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
