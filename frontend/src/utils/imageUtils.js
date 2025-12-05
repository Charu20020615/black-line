/**
 * Get the full image URL, handling both uploaded files and external URLs
 * @param {string} imagePath - Image path from database
 * @param {string} fallback - Fallback image path if imagePath is empty
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath, fallback = '/Images/accessories.png') => {
  if (!imagePath) return fallback;
  
  // If it's an uploaded file (starts with /uploads/)
  if (imagePath.startsWith('/uploads/')) {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
    return `${baseURL.replace('/api', '')}${imagePath}`;
  }
  
  // If it's already a full URL or relative path
  return imagePath;
};


