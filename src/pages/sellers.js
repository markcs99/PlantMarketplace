import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { slovakCities } from '../utils/stripe';

export default function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  
  // Load sellers data (mock data for demo)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSellers = [
        {
          id: 1,
          name: 'GreenThumb Garden',
          avatar: '/avatars/seller1.jpg',
          location: 'Bratislava',
          rating: 4.8,
          reviews: 56,
          specialties: ['Indoor Plants', 'Succulents'],
          products: 24,
          joined: 'March 2023',
          verified: true
        },
        {
          id: 2,
          name: 'Flora Fantasia',
          avatar: '/avatars/seller2.jpg',
          location: 'Košice',
          rating: 4.6,
          reviews: 38,
          specialties: ['Outdoor Plants', 'Herbs'],
          products: 18,
          joined: 'January 2024',
          verified: true
        },
        {
          id: 3,
          name: 'Plant Paradise',
          avatar: '/avatars/seller3.jpg',
          location: 'Žilina',
          rating: 4.9,
          reviews: 72,
          specialties: ['Rare Plants', 'Seedlings'],
          products: 31,
          joined: 'September 2022',
          verified: true
        },
        {
          id: 4,
          name: 'Urban Jungle',
          avatar: '/avatars/seller4.jpg',
          location: 'Nitra',
          rating: 4.3,
          reviews: 21,
          specialties: ['Tropical Plants', 'Indoor Plants'],
          products: 14,
          joined: 'May 2023',
          verified: false
        },
        {
          id: 5,
          name: 'Botanical Dreams',
          avatar: '/avatars/seller5.jpg',
          location: 'Banská Bystrica',
          rating: 4.7,
          reviews: 45,
          specialties: ['Succulents', 'Cacti'],
          products: 29,
          joined: 'February 2023',
          verified: true
        },
        {
          id: 6,
          name: 'Green Life',
          avatar: '/avatars/seller6.jpg',
          location: 'Prešov',
          rating: 4.5,
          reviews: 33,
          specialties: ['Medicinal Plants', 'Herbs'],
          products: 22,
          joined: 'November 2023',
          verified: true
        },
        {
          id: 7,
          name: 'EcoPlant',
          avatar: '/avatars/seller7.jpg',
          location: 'Trenčín',
          rating: 4.2,
          reviews: 18,
          specialties: ['Organic Plants', 'Seedlings'],
          products: 12,
          joined: 'June 2023',
          verified: false
        },
        {
          id: 8,
          name: 'Happy Plants',
          avatar: '/avatars/seller8.jpg',
          location: 'Bratislava',
          rating: 4.8,
          reviews: 64,
          specialties: ['Indoor Plants', 'Terrariums'],
          products: 27,
          joined: 'April 2022',
          verified: true
        }
      ];
      
      setSellers(mockSellers);
      setFilteredSellers(mockSellers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let results = [...sellers];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(seller => 
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        seller.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by location
    if (locationFilter) {
      results = results.filter(seller => seller.location === locationFilter);
    }
    
    // Sort results
    if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'products') {
      results.sort((a, b) => b.products - a.products);
    } else if (sortBy === 'reviews') {
      results.sort((a, b) => b.reviews - a.reviews);
    }
    
    setFilteredSellers(results);
  }, [sellers, searchTerm, locationFilter, sortBy]);

  return (
    <div>
      <Head>
        <title>Plant Sellers in Slovakia | Plant Marketplace</title>
        <meta name="description" content="Find trusted plant sellers across Slovakia. Browse by location and specialty." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Plant Sellers in Slovakia</h1>
          <p className="text-gray-600 mb-8">Connect with passionate plant sellers across Slovakia</p>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Sellers
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or specialty..."
                  className="input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Location filter */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  className="input"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {slovakCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort by */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sort"
                  className="input"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Highest Rating</option>
                  <option value="products">Most Products</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Results */}
          {isLoading ? (
            <div className="text-center py-12">
              <svg className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading sellers...</p>
            </div>
          ) : filteredSellers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No sellers found</h3>
              <p className="text-gray-600 mb-4">Try changing your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSellers.map(seller => (
                <div key={seller.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                        {seller.avatar ? (
                          <img 
                            src={seller.avatar} 
                            alt={seller.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              // Use first letter of name as fallback
                              e.target.parentNode.innerHTML = `<span class="text-2xl font-bold text-green-600">${seller.name.charAt(0)}</span>`;
                            }}
                          />
                        ) : (
                          <span className="text-2xl font-bold text-green-600">{seller.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold flex items-center">
                          {seller.name} 
                          {seller.verified && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </h2>
                        <p className="text-gray-600">{seller.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
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
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h3>
                      <div className="flex flex-wrap gap-2">
                        {seller.specialties.map(specialty => (
                          <span key={specialty} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{seller.products} plants available</span>
                      <Link href={`/seller/${seller.id}`}>
                        <a className="btn-outline-sm">View Profile</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 