import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../contexts/CartContext';

export default function SellerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { addToCart } = useCart();
  
  // Load seller data
  useEffect(() => {
    if (!id) return;
    
    // In a real app, this would be an API call
    // For demo, we'll use mocked data
    const loadSellerData = () => {
      setTimeout(() => {
        const mockSeller = {
          id: parseInt(id),
          name: id === '1' ? 'Green Thumb Gardens' : 'Indoor Jungle',
          avatar: id === '1' ? '/images/avatars/seller1.jpg' : '/images/avatars/seller2.jpg',
          location: id === '1' ? 'Bratislava' : 'Žilina',
          rating: id === '1' ? 4.8 : 4.9,
          reviews: id === '1' ? 56 : 72,
          specialties: id === '1' ? ['Indoor Plants', 'Succulents'] : ['Rare Plants', 'Seedlings'],
          products: id === '1' ? 24 : 31,
          joined: id === '1' ? 'March 2023' : 'September 2022',
          verified: true,
          bio: id === '1' 
            ? "We are passionate about bringing nature into homes across Slovakia. Specializing in indoor plants that thrive in apartments and homes, as well as easy-care succulents for busy plant lovers."
            : "Indoor Jungle is dedicated to offering rare and unique plants to collectors and enthusiasts. We carefully nurture each plant with love and expertise, ensuring they arrive in perfect condition.",
          contactEmail: id === '1' ? 'info@greenthumb.sk' : 'hello@indoorjungle.sk',
          contactPhone: id === '1' ? '+421 901 234 567' : '+421 902 345 678',
          shippingInfo: "We offer both local pickup in our area and nationwide shipping via Slovak Post. All plants are carefully packaged to ensure safe delivery."
        };
        
        const mockProducts = [
          {
            id: 101,
            title: 'Monstera Deliciosa',
            price: 35.50,
            image: '/images/plants/monstera.jpg',
            category: 'Indoor Plants',
            description: 'Healthy Monstera with beautiful fenestrations. Approximately 60cm tall.',
            inStock: true
          },
          {
            id: 102,
            title: 'Snake Plant',
            price: 19.99,
            image: '/images/plants/snake-plant.jpg',
            category: 'Indoor Plants',
            description: 'Low maintenance snake plant perfect for beginners. Approximately, 40cm tall.',
            inStock: true
          },
          {
            id: 103,
            title: 'Echeveria Elegans',
            price: 12.50,
            image: '/images/plants/echeveria.jpg',
            category: 'Succulents',
            description: 'Beautiful rosette-forming succulent. Perfect for windowsills.',
            inStock: true
          },
          {
            id: 104,
            title: 'Philodendron Birkin',
            price: 28.99,
            image: '/images/plants/philodendron.jpg',
            category: 'Indoor Plants',
            description: 'Stunning white striped philodendron. Currently 30cm tall.',
            inStock: false
          },
          {
            id: 105,
            title: 'Aloe Vera',
            price: 15.99,
            image: '/images/plants/aloe.jpg',
            category: 'Succulents',
            description: 'Medicinal aloe vera plant in 15cm pot.',
            inStock: true
          },
          {
            id: 106,
            title: 'Tradescantia Nanouk',
            price: 22.50,
            image: '/images/plants/tradescantia.jpg',
            category: 'Indoor Plants',
            description: 'Vibrant pink and purple trailing plant. Perfect for hanging baskets.',
            inStock: true
          }
        ];
        
        setSeller(mockSeller);
        setProducts(mockProducts);
        setIsLoading(false);
      }, 1000);
    };
    
    loadSellerData();
  }, [id]);
  
  // Filter products based on active tab
  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    return product.category === activeTab;
  });
  
  // Get unique categories for tabs
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      seller: seller.name
    });
    
    // Show confirmation message (in a real app, you'd use a toast notification)
    alert(`${product.title} added to cart!`);
  };
  
  // Handle missing images
  useEffect(() => {
    // Helper function to create a fallback for missing plant images
    const createPlantImageFallback = (imageContainer, productTitle) => {
      const fallback = document.createElement('div');
      fallback.className = 'h-full w-full flex items-center justify-center';
      fallback.style.backgroundColor = '#e9f5e9';
      fallback.innerHTML = `<span class="text-green-600 font-medium">${productTitle}</span>`;
      imageContainer.appendChild(fallback);
    };

    // Set a timeout to check for image loading failures
    const timer = setTimeout(() => {
      // Get all plant image containers
      const plantImageContainers = document.querySelectorAll('.plant-image-container');
      
      plantImageContainers.forEach(container => {
        // Check if the background image loaded successfully
        const computedStyle = window.getComputedStyle(container);
        const bgImage = computedStyle.backgroundImage;
        
        // If no background image or it's just 'none', apply fallback
        if (!bgImage || bgImage === 'none') {
          const productTitle = container.getAttribute('data-title') || 'Plant';
          createPlantImageFallback(container, productTitle);
        }
      });
    }, 1000); // Check after 1 second

    return () => clearTimeout(timer);
  }, [products]);
  
  if (isLoading) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <svg className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading seller profile...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!seller) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Seller not found</h3>
              <p className="text-gray-600 mb-4">The seller you're looking for doesn't exist or has been removed.</p>
              <Link href="/sellers">
                <a className="btn-primary">Browse All Sellers</a>
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
        <title>{seller.name} | Plant Marketplace</title>
        <meta name="description" content={`Browse plants from ${seller.name} in ${seller.location}, Slovakia. ${seller.bio?.substring(0, 100)}...`} />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Seller Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 overflow-hidden mx-auto md:mx-0">
                {seller.avatar ? (
                  <img 
                    src={seller.avatar} 
                    alt={seller.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load seller avatar: ${seller.avatar}`);
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      
                      // Create a fallback avatar with seller initial
                      const avatarPlaceholder = document.createElement('div');
                      avatarPlaceholder.className = 'w-full h-full flex items-center justify-center bg-green-100';
                      avatarPlaceholder.innerHTML = `<span class="text-4xl font-bold text-green-600">${seller.name.charAt(0)}</span>`;
                      
                      // Replace the img with the fallback
                      e.target.parentNode.appendChild(avatarPlaceholder);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-100">
                    <span className="text-4xl font-bold text-green-600">{seller.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center md:justify-start">
                      {seller.name}
                      {seller.verified && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </h1>
                    <p className="text-gray-600 mb-2">{seller.location}, Slovakia</p>
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      <div className="flex items-center mr-4">
                        <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="font-medium">{seller.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({seller.reviews} reviews)</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Member since {seller.joined}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center md:items-end gap-3 justify-center md:justify-start mb-4 md:mb-0">
                    <div className="text-center">
                      <span className="block text-2xl font-bold">{seller.products}</span>
                      <span className="text-sm text-gray-600">Plants</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold">{seller.specialties.length}</span>
                      <span className="text-sm text-gray-600">Specialties</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {seller.specialties.map(specialty => (
                      <span key={specialty} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700">{seller.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Contact and Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${seller.contactEmail}`} className="text-green-600 hover:text-green-800">{seller.contactEmail}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${seller.contactPhone}`} className="text-green-600 hover:text-green-800">{seller.contactPhone}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{seller.location}, Slovakia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="flex items-start mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <p>{seller.shippingInfo}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  <span className="font-medium">Shipping time:</span> 2-3 business days within Slovakia
                </p>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b">
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-2xl font-semibold mb-4">Available Plants</h2>
                
                {/* Category Tabs */}
                <div className="flex overflow-x-auto pb-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-2 whitespace-nowrap mr-2 rounded-full text-sm font-medium ${
                        activeTab === category 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setActiveTab(category)}
                    >
                      {category === 'all' ? 'All Plants' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No plants found</h3>
                  <p className="text-gray-600">There are no plants available in this category at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 bg-gray-200">
                        {!product.inStock && (
                          <div className="absolute top-2 right-2 z-10 px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                            Sold Out
                          </div>
                        )}
                        <div 
                          className="w-full h-full plant-image-container"
                          data-title={product.title}
                          style={{
                            backgroundImage: `url('${product.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                          onError={(e) => {
                            console.error(`Failed to load image: ${product.image}`);
                            e.target.onerror = null;
                            // Set a colored background as a fallback
                            e.target.style.backgroundColor = '#e9f5e9';
                            e.target.innerHTML = `<div class="flex items-center justify-center h-full">
                              <span class="text-green-600 font-medium">${product.title}</span>
                            </div>`;
                          }}
                        >
                          {/* Fallback content that will show if image fails to load */}
                          <div className="h-full flex items-center justify-center" 
                               style={{ 
                                 backgroundColor: '#e9f5e9', 
                                 opacity: 0,
                                 transition: 'opacity 0.3s ease'
                               }}
                               onError={(e) => {
                                 e.target.style.opacity = 1;
                               }}>
                            <span className="text-green-600 font-medium">{product.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{product.title}</h3>
                          <span className="text-green-600 font-medium">€{product.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <Link href={`/plant/${product.id}`}>
                            <a className="text-green-600 hover:text-green-800 text-sm font-medium">View Details</a>
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.inStock 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {product.inStock ? 'Add to Cart' : 'Sold Out'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 