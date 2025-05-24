
// Helper functions for handling image loading
export const prepareCarouselImages = (mainImage: string | undefined, additionalImages: string[] | undefined): string[] => {
  // Default images if we need fallbacks
  const defaultImages = [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop"
  ];

  // Sanitize inputs to ensure we don't have undefined or empty arrays
  const safeMain = mainImage && typeof mainImage === 'string' ? mainImage : defaultImages[0];
  const safeAdditional = Array.isArray(additionalImages) ? additionalImages : [];
  
  // Filter out any invalid values and make sure we have non-empty strings
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
  return finalImages.length > 0 ? finalImages : [defaultImages[0]];
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
  const safeIndex = typeof index === 'number' && !isNaN(index) ? Math.abs(index) % defaultImages.length : 0;
  return defaultImages[safeIndex];
};

// Helper to check if an image URL is valid
export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string' || url.trim() === '') return false;
  
  return (
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

// Check if an image is accessible
export const checkImageUrl = async (url: string): Promise<boolean> => {
  if (!isValidImageUrl(url)) return false;
  
  try {
    // Create a promise that can be resolved or rejected with a timeout
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 5000);
    });
    
    const fetchPromise = new Promise<boolean>(async (resolve) => {
      try {
        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
    
    return await Promise.race([fetchPromise, timeoutPromise]) as boolean;
  } catch (error) {
    console.error('Error checking image URL:', url, error);
    return false;
  }
};
