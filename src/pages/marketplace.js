import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getImageUrl, getPlaceholderImage } from '../utils/image';

export default function Marketplace() {
  // In a real app, these would be fetched from an API
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 39.99,
      images: ['https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '1', name: 'Green Thumb Gardens' },
      rating: 4.8,
      category: 'Indoor Plants',
    },
    {
      id: 2,
      name: 'Fiddle Leaf Fig',
      price: 49.99,
      images: ['https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '2', name: 'Indoor Jungle' },
      rating: 4.6,
      category: 'Indoor Plants',
    },
    {
      id: 3,
      name: 'Snake Plant',
      price: 24.99,
      images: ['https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '1', name: 'Green Thumb Gardens' },
      rating: 4.9,
      category: 'Indoor Plants',
    },
    {
      id: 4,
      name: 'Peace Lily',
      price: 19.99,
      images: ['https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '1', name: 'Green Thumb Gardens' },
      rating: 4.7,
      category: 'Indoor Plants',
    },
    {
      id: 5,
      name: 'Aloe Vera',
      price: 15.99,
      images: ['https://images.pexels.com/photos/4505162/pexels-photo-4505162.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '2', name: 'Indoor Jungle' },
      rating: 4.5,
      category: 'Succulents',
    },
    {
      id: 6,
      name: 'Echeveria',
      price: 12.99,
      images: ['https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '2', name: 'Indoor Jungle' },
      rating: 4.4,
      category: 'Succulents',
    },
    {
      id: 7,
      name: 'Basil',
      price: 8.99,
      images: ['https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '1', name: 'Green Thumb Gardens' },
      rating: 4.8,
      category: 'Herbs',
    },
    {
      id: 8,
      name: 'Mint',
      price: 7.99,
      images: ['https://images.pexels.com/photos/2318044/pexels-photo-2318044.jpeg?auto=compress&cs=tinysrgb&w=800'],
      seller: { id: '1', name: 'Green Thumb Gardens' },
      rating: 4.6,
      category: 'Herbs',
    },
  ]);

  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceSort, setPriceSort] = useState(''); // '' or 'asc' or 'desc'
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort plants
  useEffect(() => {
    let result = [...plants];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(plant => plant.category === categoryFilter);
    }
    
    // Apply price sorting
    if (priceSort === 'asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
      result = result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredPlants(result);
  }, [plants, searchTerm, categoryFilter, priceSort]);

  // Get unique categories
  const categories = [...new Set(plants.map(plant => plant.category))];

  // Get display image with a guaranteed fallback
  const getDisplayImage = (plant) => {
    // Use a try/catch to ensure we always return a valid image URL
    try {
      if (plant.images && Array.isArray(plant.images) && plant.images.length > 0) {
        return plant.images[0];
      }
      if (plant.image) {
        return plant.image;
      }
      // If we have no image, return a placeholder
      return `https://via.placeholder.com/400x300?text=${encodeURIComponent(plant.name || 'Plant')}`;
    } catch (error) {
      console.error("Error getting display image:", error);
      return 'https://via.placeholder.com/400x300?text=Plant+Image';
    }
  };

  // Create a placeholder image URL
  const getPlaceholderImage = (width, height, text) => {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      <Head>
        <title>Marketplace | Plant Marketplace</title>
        <meta name="description" content="Browse and buy a wide variety of plants from trusted sellers. Find indoor plants, succulents, herbs, and more." />
      </Head>

      <Header />

      <main className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="py-8 px-6 md:px-10 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Your Perfect Plant</h1>
              <p className="text-green-100 text-lg mb-6 max-w-2xl">Browse our curated selection of plants from trusted growers and sellers across Slovakia.</p>
              <div className="flex flex-wrap gap-3">
                {categories.slice(0, 3).map(category => (
                  <button 
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-medium transition"
                  >
                    {category}
                  </button>
                ))}
                <button 
                  className="bg-white text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-50 transition"
                  onClick={() => setCategoryFilter('')}
                >
                  All Categories
                </button>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="search">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  className="input"
                  placeholder="Search plants or sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="input"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Sort */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price-sort">
                  Price
                </label>
                <select
                  id="price-sort"
                  className="input"
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {filteredPlants.length} {filteredPlants.length === 1 ? 'Plant' : 'Plants'} Available
            </h2>
          </div>
          
          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Results */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlants.length > 0 ? (
                filteredPlants.map(plant => (
                  <div key={plant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/plant/${plant.id}`}>
                      <a className="block">
                        <div 
                          className="relative h-48 bg-gray-200 overflow-hidden"
                          style={{
                            backgroundImage: `url('${getDisplayImage(plant)}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium shadow">
                            {plant.rating} ★
                          </div>
                        </div>
                      </a>
                    </Link>
                    <div className="p-4">
                      <Link href={`/plant/${plant.id}`}>
                        <a className="block">
                          <h3 className="text-lg font-semibold mb-1 hover:text-green-600 transition-colors">{plant.name}</h3>
                        </a>
                      </Link>
                      <Link href={`/seller/${plant.seller.id}`}>
                        <a className="block text-gray-600 text-sm mb-2 hover:text-green-600">by {plant.seller.name}</a>
                      </Link>
                      <div className="text-gray-500 text-xs mb-3">{plant.category}</div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-green-600">€{plant.price.toFixed(2)}</span>
                        <Link href={`/plant/${plant.id}`}>
                          <a className="btn-primary text-sm">View Details</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 mb-4">No plants found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('');
                      setPriceSort('');
                    }}
                    className="btn-outline-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 