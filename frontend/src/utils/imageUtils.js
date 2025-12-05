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
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    let baseURL;
    
    if (envUrl) {
      // If it's a full URL, remove /api if present
      if (envUrl.startsWith('http')) {
        baseURL = envUrl.replace('/api', '').replace(/\/$/, '');
      } else {
        baseURL = envUrl.replace('/api', '');
      }
    } else {
      // In production, use the backend URL; in development, use localhost
      baseURL = import.meta.env.PROD 
        ? 'https://black-line-back.vercel.app' 
        : 'http://localhost:4000';
    }
    
    return `${baseURL}${imagePath}`;
  }
  
  // If it's already a full URL or relative path
  return imagePath;
};


