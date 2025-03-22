import { useState, useRef, useEffect } from 'react';
import { getPlaceholderImage } from '../utils/image';

export default function ImageUpload({
  onChange,
  initialImage = null,
  className = '',
  label = 'Upload Image',
  height = 'h-40',
  width = 'w-full',
  acceptedFileTypes = 'image/png, image/jpeg, image/jpg, image/webp',
  multiple = false,
  maxFiles = 5,
  showPreview = true
}) {
  const [preview, setPreview] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize preview if initialImage is provided
  useEffect(() => {
    if (initialImage) {
      try {
        if (typeof initialImage === 'string') {
          // If initialImage is a URL string
          setPreview(initialImage);
        } else if (initialImage instanceof File) {
          // If initialImage is a File object
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result);
          };
          reader.onerror = () => {
            console.error('Error reading file:', initialImage.name);
            setLoadError(true);
          };
          reader.readAsDataURL(initialImage);
        } else {
          // If initialImage is neither a string nor a File, log an error
          console.error('Invalid initialImage type:', typeof initialImage);
          setLoadError(true);
        }
      } catch (err) {
        console.error('Error setting initial image:', err);
        setLoadError(true);
      }
    }
  }, [initialImage]);

  const handleFileChange = (e) => {
    setError('');
    setLoadError(false);
    const selectedFiles = e.target.files;
    
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }
    
    // Check if more than maxFiles are selected
    if (multiple && selectedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} images`);
      return;
    }
    
    try {
      // Check file types
      const invalidFiles = Array.from(selectedFiles).filter(
        file => !file.type.match(/(image\/jpeg|image\/jpg|image\/png|image\/webp)/)
      );
      
      if (invalidFiles.length > 0) {
        setError('Only JPG, PNG and WebP images are allowed');
        return;
      }
      
      // Check file sizes (5MB max)
      const largeFiles = Array.from(selectedFiles).filter(
        file => file.size > 5 * 1024 * 1024
      );
      
      if (largeFiles.length > 0) {
        setError('Images must be less than 5MB');
        return;
      }
      
      // Set preview for single file
      if (!multiple && selectedFiles[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.onerror = () => {
          console.error('Error reading file:', selectedFiles[0].name);
          setLoadError(true);
        };
        reader.readAsDataURL(selectedFiles[0]);
      }
      
      // Call the onChange handler
      onChange(multiple ? selectedFiles : selectedFiles[0]);
    } catch (err) {
      console.error('Error processing files:', err);
      setError('Error processing files. Please try again.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a synthetic event object with the files
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files
        }
      };
      
      handleFileChange(syntheticEvent);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div className={className}>
      {/* Preview Image */}
      {showPreview && preview && !loadError && (
        <div className="relative mb-4">
          <div className={`${height} ${width} bg-gray-100 rounded-lg overflow-hidden`}>
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Error loading preview image');
                setLoadError(true);
                e.target.src = getPlaceholderImage(300, 300, 'Image Preview');
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            aria-label="Remove image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {/* File Input */}
      {(!preview || loadError || !showPreview) && (
        <div
          className={`${height} ${width} border-2 border-dashed rounded-lg ${
            isHovering ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
          } flex items-center justify-center cursor-pointer transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">{label}</p>
            <p className="mt-1 text-xs text-gray-500">
              {multiple ? `Up to ${maxFiles} files, ` : ''}
              JPG, PNG or WebP, max 5MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            multiple={multiple}
          />
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {/* Loading Error Message */}
      {loadError && (
        <p className="mt-2 text-sm text-red-600">
          There was an error loading the image. Please try again.
        </p>
      )}
    </div>
  );
} 