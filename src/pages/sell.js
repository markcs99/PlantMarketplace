import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import { uploadImage } from '../utils/image';

export default function SellPlant() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Indoor Plants');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(user?.location || 'Bratislava');
  const [shippingOption, setShippingOption] = useState('pickup'); // pickup, delivery, both
  const [error, setError] = useState('');
  const [commission, setCommission] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Categories
  const categories = ['Indoor Plants', 'Outdoor Plants', 'Succulents', 'Herbs', 'Seeds', 'Plant Accessories'];

  // Slovak cities
  const slovakCities = [
    'Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica', 
    'Nitra', 'Trnava', 'Trenčín', 'Martin', 'Poprad', 
    'Prievidza', 'Zvolen', 'Považská Bystrica', 'Michalovce', 'Nové Zámky'
  ];

  // Handle adding a new image
  const handleAddImage = (file) => {
    if (!file) return;
    
    if (images.length >= 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }
    
    const newImages = [...images, file];
    setImages(newImages);
  };

  // Remove uploaded image
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Calculate commission (15%)
  const calculateCommission = (value) => {
    if (!value || isNaN(parseFloat(value))) {
      setCommission(0);
      return;
    }
    
    const priceValue = parseFloat(value);
    const commissionValue = priceValue * 0.15;
    setCommission(commissionValue);
  };

  // Handle price change
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    calculateCommission(value);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login?redirect=/sell');
      return;
    }
    
    if (images.length === 0) {
      setError('Please upload at least one image of your plant');
      return;
    }
    
    if (!title || !description || !price || !category) {
      setError('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    setIsUploading(true);
    setError('');
    
    try {
      // Upload all images
      const imageUrls = [];
      let progress = 0;
      
      for (const imageFile of images) {
        // Upload each image
        const imageUrl = await uploadImage(imageFile, 'plant');
        imageUrls.push(imageUrl);
        
        // Update progress
        progress += 100 / images.length;
        setUploadProgress(Math.min(progress, 99)); // Cap at 99% until complete
      }
      
      setUploadProgress(100);
      
      // In a real app, this would be an API call to create the listing with the image URLs
      // For demo, we simulate success
      setTimeout(() => {
        router.push('/profile/listings');
      }, 1000);
    } catch (err) {
      setError('An error occurred uploading your images. Please try again.');
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Please login to continue</h1>
              <p className="text-gray-600 mb-6">You need to be logged in to sell plants on our marketplace.</p>
              <Link href="/login?redirect=/sell">
                <a className="btn-primary">Login</a>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Sell a Plant | Plant Marketplace</title>
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Sell a Plant</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Image Upload Section */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                <p className="text-gray-600 mb-3 text-sm">Upload up to 5 photos of your plant. The first photo will be your listing's cover image.</p>
                
                {/* Main image upload */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Main Image (Cover Photo) *</label>
                  <ImageUpload 
                    onChange={handleAddImage}
                    label=""
                    height="h-56"
                    width="w-full md:w-2/3"
                  />
                </div>
                
                {/* Additional images */}
                {images.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Additional Photos ({images.length}/5)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <div className="h-32 rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={URL.createObjectURL(image)} 
                              alt={`Plant photo ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs text-center py-0.5">
                              Cover
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {images.length < 5 && (
                        <div>
                          <ImageUpload 
                            onChange={handleAddImage}
                            label=""
                            height="h-32"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Tip: High-quality photos significantly increase the chances of selling your plant.
                </p>
              </div>
              
              {/* Plant Details Section */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Plant Details</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
                    Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="input"
                    placeholder="e.g., Healthy Monstera Deliciosa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="input"
                    placeholder="Describe your plant, including size, age, and any care instructions."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Be detailed to help buyers make informed decisions.
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                    Category *
                  </label>
                  <select
                    id="category"
                    className="input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Pricing & Location Section */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Pricing & Location</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                      Price (€) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">€</span>
                      </div>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        className="input pl-8"
                        placeholder="0.00"
                        value={price}
                        onChange={handlePriceChange}
                        required
                      />
                    </div>
                    {price && !isNaN(parseFloat(price)) && (
                      <p className="text-xs text-gray-500 mt-1">
                        Platform fee (15%): €{commission.toFixed(2)} • 
                        You'll receive: €{(parseFloat(price) - commission).toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                      Location *
                    </label>
                    <select
                      id="location"
                      className="input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    >
                      {slovakCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Shipping Options *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-green-600"
                        name="shippingOption"
                        value="pickup"
                        checked={shippingOption === 'pickup'}
                        onChange={() => setShippingOption('pickup')}
                      />
                      <span className="ml-2">Local Pickup Only</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-green-600"
                        name="shippingOption"
                        value="delivery"
                        checked={shippingOption === 'delivery'}
                        onChange={() => setShippingOption('delivery')}
                      />
                      <span className="ml-2">Delivery Only</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-green-600"
                        name="shippingOption"
                        value="both"
                        checked={shippingOption === 'both'}
                        onChange={() => setShippingOption('both')}
                      />
                      <span className="ml-2">Both Options</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="p-6">
                {isUploading && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Uploading images... {Math.round(uploadProgress)}%</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Listing your plant...
                    </span>
                  ) : 'List my plant for sale'}
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  By listing your plant, you agree to our <Link href="/terms"><a className="text-green-600 hover:underline">Terms of Service</a></Link> and acknowledge our 15% commission on all sales.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 