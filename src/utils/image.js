/**
 * This utility file provides functions for image handling in the Plant Marketplace application
 */

/**
 * Function to simulate uploading an image and return a URL
 * In a real application, this would make a request to a server to upload the file
 * @param {File} file - The file to upload
 * @param {String} type - The type of image (plants, avatars, categories)
 * @returns {Promise<string>} - A promise that resolves with the image URL
 */
export const uploadImage = (file, type = 'plants') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    // Generate a random file name to prevent conflicts
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${file.name.split('.').pop()}`;
    const path = `/images/${type}/${fileName}`;

    // Store the file path in localStorage for demo purposes
    // In a real app, this would be saved to a database
    const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '{}');
    savedImages[path] = true;
    localStorage.setItem('uploadedImages', JSON.stringify(savedImages));

    // Simulate network delay for uploading
    setTimeout(() => {
      resolve(path);
    }, 1500);
  });
};

/**
 * Gets the URL for an image, checking if it exists in localStorage or returning a fallback
 * @param {string} imagePath - The path of the image
 * @param {string} fallbackUrl - The fallback URL if the image doesn't exist
 * @returns {string} - The image URL
 */
export const getImageUrl = (imagePath, fallbackUrl = '') => {
  // If the path is null, undefined, or empty string
  if (!imagePath) {
    return fallbackUrl;
  }

  // Try to sanitize the URL
  try {
    // If the image starts with http or https, it's already a full URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      // Add a cache-busting parameter to prevent browser caching issues
      if (!imagePath.includes('?t=')) {
        const separator = imagePath.includes('?') ? '&' : '?';
        return `${imagePath}${separator}t=${Date.now()}`;
      }
      return imagePath;
    }

    // If it's an absolute path starting with /, use it directly
    if (imagePath.startsWith('/')) {
      // For demo, check if we have it in localStorage
      const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '{}');
      
      // If we've uploaded this image before (in this session), return the path
      if (savedImages[imagePath]) {
        return `${imagePath}?t=${Date.now()}`;
      }
      
      // Otherwise return the fallback or the original path if no fallback provided
      return fallbackUrl || imagePath;
    }

    // Handle relative paths by appending to the current origin
    if (typeof window !== 'undefined') {
      try {
        return `${new URL(imagePath, window.location.origin).toString()}?t=${Date.now()}`;
      } catch (e) {
        console.error('Error creating URL from path:', imagePath, e);
        return fallbackUrl;
      }
    }
  } catch (error) {
    console.error('Error processing image URL:', error);
    return fallbackUrl;
  }
  
  // Fallback to the original path or the provided fallback
  return fallbackUrl || imagePath;
};

/**
 * Generate a placeholder image URL with the given dimensions and text
 * @param {number} width - The width of the placeholder image
 * @param {number} height - The height of the placeholder image
 * @param {string} text - The text to display on the placeholder image
 * @returns {string} - The placeholder image URL
 */
export const getPlaceholderImage = (width = 300, height = 300, text = 'Plant Image') => {
  try {
    // First try via.placeholder.com
    return `https://via.placeholder.com/${width}x${height}/E9F5E9/3F9142?text=${encodeURIComponent(text)}`;
  } catch (e) {
    // Fallback to placehold.co
    return `https://placehold.co/${width}x${height}/E9F5E9/3F9142?text=${encodeURIComponent(text)}`;
  }
};

/**
 * Get a user avatar from the given path or generate an avatar with initials
 * @param {string} avatarPath - The path to the user's avatar
 * @param {string} name - The user's name (for generating initials)
 * @param {string} defaultColor - The background color of the generated avatar
 * @returns {string} - The avatar URL
 */
export const getAvatarUrl = (avatarPath, name = 'User', defaultColor = '3F9142') => {
  // Validate inputs and set defaults for invalid values
  const safeName = typeof name === 'string' && name.trim() !== '' ? name : 'User';
  const safeColor = typeof defaultColor === 'string' && defaultColor.trim() !== '' ? defaultColor : '3F9142';
  
  // Check if avatarPath is a valid string
  if (typeof avatarPath === 'string' && avatarPath.trim() !== '') {
    return getImageUrl(
      avatarPath,
      `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=E9F5E9&color=${safeColor}&size=128`
    );
  }
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=E9F5E9&color=${safeColor}&size=128`;
};

/**
 * Process an image file for preview before uploading
 * @param {File} file - The image file
 * @returns {Promise<string>} - A promise that resolves with the data URL
 */
export const getImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid image file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

/**
 * Resize an image file before uploading to reduce file size
 * @param {File} file - The image file to resize
 * @param {number} maxWidth - The maximum width of the resized image
 * @param {number} maxHeight - The maximum height of the resized image
 * @param {number} quality - The quality of the resized image (0-1)
 * @returns {Promise<Blob>} - A promise that resolves with the resized image blob
 */
export const resizeImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid image file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        // Calculate new dimensions
        let width = image.width;
        let height = image.height;
        
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => resolve(blob),
          file.type,
          quality
        );
      };
      
      image.onerror = () => reject(new Error('Failed to load image'));
      image.src = readerEvent.target.result;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}; 