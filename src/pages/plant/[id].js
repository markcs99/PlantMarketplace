import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getImageUrl, getPlaceholderImage } from '../../utils/image';

export default function PlantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState('description'); // 'description', 'details', 'reviews'
  
  // In a real app, this would be fetched from an API
  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        // This is mock data; in a real app it would come from a database
        const plantData = {
          id: Number(id),
          name: 'Monstera Deliciosa',
          price: 39.99,
          images: [
            'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/6208093/pexels-photo-6208093.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          seller: {
            id: id === '2' ? '2' : '1',
            name: id === '2' ? 'Indoor Jungle' : 'Green Thumb Gardens',
            avatar: id === '2' ? '/images/avatars/seller2.jpg' : '/images/avatars/seller1.jpg',
            rating: 4.8,
            reviewCount: 124,
          },
          rating: 4.8,
          reviewCount: 56,
          category: 'Indoor Plants',
          description: 'The Monstera Deliciosa (Swiss Cheese Plant) is famous for its natural leaf holes, earning it the nickname "swiss cheese plant". It\'s a beautiful large-leafed plant native to tropical areas of southern Mexico to Panama. This is a climbing evergreen plant that can grow up to 20 meters tall in its native habitat.',
          care: {
            light: 'Bright indirect light',
            water: 'Allow soil to dry out partially between waterings',
            temperature: '65-85°F (18-29°C)',
            soil: 'Well-draining potting mix',
          },
          stock: 15,
          shipping: 'Free shipping on orders over €50',
          reviews: [
            {
              id: 1,
              user: 'Emily R.',
              avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
              rating: 5,
              date: '2025-03-10',
              text: 'Beautiful plant, arrived in perfect condition. Very happy with my purchase!'
            },
            {
              id: 2,
              user: 'Michael T.',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              rating: 4,
              date: '2025-03-05',
              text: 'Healthy plant, good size. Shipping was quick and packaging was excellent.'
            },
            {
              id: 3,
              user: 'Sara L.',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              rating: 5,
              date: '2025-02-28',
              text: 'Amazing quality! The plant looks even better than in the photos. Will definitely buy from this seller again.'
            }
          ]
        };
        
        setPlant(plantData);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (plant) {
      const item = {
        id: plant.id,
        name: plant.name,
        price: plant.price,
        image: Array.isArray(plant.images) && plant.images.length > 0 ? plant.images[0] : null,
        quantity: quantity,
        seller: plant.seller?.name || 'Unknown Seller',
        sellerId: plant.seller?.id || null,
        supportsPacketa: true // Add support for Packeta delivery
      };
      
      addToCart(item);
      
      // Show notification or feedback with a note about delivery options
      alert(`${plant.name} added to cart! You can choose Packeta delivery at checkout.`);
    }
  };

  const handleBuyNow = () => {
    if (plant) {
      const item = {
        id: plant.id,
        name: plant.name,
        price: plant.price,
        image: Array.isArray(plant.images) && plant.images.length > 0 ? plant.images[0] : null,
        quantity: quantity,
        seller: plant.seller?.name || 'Unknown Seller',
        sellerId: plant.seller?.id || null,
        supportsPacketa: true // Add support for Packeta delivery
      };
      
      addToCart(item);
      router.push('/checkout');
    }
  };
  
  // Helper function to change the active image
  const changeImage = (index) => {
    setActiveImage(index);
  };
  
  // Helper to get seller avatar
  const getSellerAvatar = () => {
    // Check if plant and seller are valid
    if (!plant || !plant.seller) {
      return `https://ui-avatars.com/api/?name=Unknown+Seller&background=E9F5E9&color=3F9142&size=128`;
    }

    // Check if seller.name is a valid string
    const sellerName = typeof plant.seller.name === 'string' && plant.seller.name.trim() !== '' 
      ? plant.seller.name 
      : 'Unknown Seller';
    
    // Check if seller.avatar is a valid URL
    if (typeof plant.seller.avatar === 'string' && plant.seller.avatar.trim() !== '') {
      return getImageUrl(
        plant.seller.avatar, 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=E9F5E9&color=3F9142&size=128`
      );
    }
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=E9F5E9&color=3F9142&size=128`;
  };
  
  // Helper to get review avatar
  const getReviewAvatar = (review) => {
    if (!review) {
      return `https://ui-avatars.com/api/?name=Unknown+User&background=E9F5E9&color=3F9142&size=128`;
    }

    // Check if review.user is a valid string
    const userName = typeof review.user === 'string' && review.user.trim() !== '' 
      ? review.user 
      : 'Unknown User';
    
    // Check if review.avatar is a valid URL
    if (typeof review.avatar === 'string' && review.avatar.trim() !== '') {
      return getImageUrl(
        review.avatar, 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=E9F5E9&color=3F9142&size=128`
      );
    }
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=E9F5E9&color=3F9142&size=128`;
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-96">
              <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!plant) {
    return (
      <div>
        <Header />
        <main className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center py-10">
              <h1 className="text-2xl font-bold mb-4">Plant Not Found</h1>
              <p className="text-gray-600 mb-6">The plant you're looking for doesn't exist or has been removed.</p>
              <Link href="/marketplace">
                <a className="btn-primary">Browse Plants</a>
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
        <title>{plant.name} | Plant Marketplace</title>
        <meta name="description" content={plant.description.substring(0, 160)} />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-6">
            <ol className="flex items-center space-x-1">
              <li>
                <Link href="/">
                  <a className="hover:text-gray-700">Home</a>
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link href="/marketplace">
                  <a className="hover:text-gray-700">Plants</a>
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link href={`/marketplace?category=${encodeURIComponent(plant.category)}`}>
                  <a className="hover:text-gray-700">{plant.category}</a>
                </Link>
              </li>
              <li>
                <span className="mx-1">/</span>
              </li>
              <li className="text-gray-700 font-medium">{plant.name}</li>
            </ol>
          </nav>
          
          {/* Plant Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="p-6">
                <div className="flex flex-col">
                  {/* Main image */}
                  <div 
                    className="mb-4 h-80 bg-gray-100 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: `url('${getImageUrl(
                        Array.isArray(plant.images) && plant.images.length > activeImage 
                          ? plant.images[activeImage] 
                          : null, 
                        getPlaceholderImage(600, 400, typeof plant.name === 'string' ? plant.name : 'Plant')
                      )}')`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {Array.isArray(plant.images) ? plant.images.map((image, index) => (
                      <button 
                        key={index}
                        className={`h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-green-500' : 'border-gray-200'}`}
                        onClick={() => changeImage(index)}
                      >
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url('${getImageUrl(image, getPlaceholderImage(150, 150, `${plant.name} - ${index + 1}`))}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                        </div>
                      </button>
                    )) : null}
                  </div>
                </div>
              </div>
              
              {/* Details and Purchase */}
              <div className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{plant.name}</h1>
                    
                    <div className="mb-4 flex items-center">
                      <div className="flex items-center mr-4">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(plant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({plant.reviewCount} reviews)</span>
                      </div>
                      <span className="text-sm text-gray-600">{plant.stock} in stock</span>
                    </div>
                    
                    <div className="text-2xl font-bold text-green-600 mb-4">
                      €{typeof plant.price === 'number' ? plant.price.toFixed(2) : '0.00'}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-6">
                        {plant.seller && typeof plant.seller.id === 'string' ? (
                          <Link href={`/seller/${plant.seller.id}`}>
                            <a className="flex items-center">
                              <div 
                                className="w-10 h-10 bg-green-100 rounded-full overflow-hidden mr-3"
                                style={{
                                  backgroundImage: `url('${getSellerAvatar()}')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              >
                              </div>
                              <div>
                                <p className="font-medium">
                                  {typeof plant.seller.name === 'string' ? plant.seller.name : 'Unknown Seller'}
                                </p>
                                <div className="flex items-center text-xs text-gray-600">
                                  <span className="mr-1">
                                    {typeof plant.seller.rating === 'number' ? plant.seller.rating.toFixed(1) : '0.0'}
                                  </span>
                                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  <span className="ml-1">
                                    ({typeof plant.seller.reviewCount === 'number' ? plant.seller.reviewCount : 0})
                                  </span>
                                </div>
                              </div>
                            </a>
                          </Link>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full overflow-hidden mr-3"></div>
                            <div>
                              <p className="font-medium">Unknown Seller</p>
                              <div className="flex items-center text-xs text-gray-600">
                                <span className="mr-1">0.0</span>
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="ml-1">(0)</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-2">{typeof plant.shipping === 'string' ? plant.shipping : 'Shipping information not available'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <div className="flex">
                        <button 
                          className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-l-md hover:bg-gray-200"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          id="quantity" 
                          min="1" 
                          max={plant.stock} 
                          value={quantity} 
                          onChange={(e) => setQuantity(Math.min(plant.stock, Math.max(1, parseInt(e.target.value) || 1)))} 
                          className="w-16 py-2 px-3 border-t border-b border-gray-300 text-center" 
                        />
                        <button 
                          className="px-3 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-r-md hover:bg-gray-200"
                          onClick={() => setQuantity(Math.min(plant.stock, quantity + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button 
                        className="flex-1 btn-outline"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="flex-1 btn-primary"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-t">
              <div className="flex border-b">
                <button 
                  className={`px-6 py-3 text-sm font-medium ${tab === 'description' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-medium ${tab === 'details' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setTab('details')}
                >
                  Plant Care
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-medium ${tab === 'reviews' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setTab('reviews')}
                >
                  Reviews ({plant.reviews.length})
                </button>
              </div>
              
              <div className="p-6">
                {tab === 'description' && (
                  <div>
                    <p className="text-gray-700">{plant.description}</p>
                  </div>
                )}
                
                {tab === 'details' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Light Requirements</h3>
                      <p className="text-gray-700">{plant.care.light}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Watering</h3>
                      <p className="text-gray-700">{plant.care.water}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Temperature</h3>
                      <p className="text-gray-700">{plant.care.temperature}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Soil Type</h3>
                      <p className="text-gray-700">{plant.care.soil}</p>
                    </div>
                  </div>
                )}
                
                {tab === 'reviews' && (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(plant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-900 font-bold">{plant.rating} out of 5</span>
                      </div>
                      <p className="text-gray-600">{plant.reviewCount} customer ratings</p>
                    </div>
                    
                    {isAuthenticated && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                        <p className="mb-2">Have you purchased this plant? Share your experience!</p>
                        <button className="btn-outline-sm">Write a Review</button>
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      {plant.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex items-start">
                            <div 
                              className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-4"
                              style={{
                                backgroundImage: `url('${getReviewAvatar(review)}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{review.user}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex mb-2">
                                {Array(5).fill(0).map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20" 
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                              <p className="text-gray-700">{review.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Related Plants Section would go here */}
        </div>
      </main>

      <Footer />
    </div>
  );
} 