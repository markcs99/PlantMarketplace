import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load categories data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCategories = [
        {
          id: 1,
          name: 'Indoor Plants',
          image: '/categories/indoor.jpg',
          cssClass: 'category-indoor',
          description: 'Plants that thrive in indoor environments with low to medium light conditions.',
          count: 42,
          featured: true
        },
        {
          id: 2,
          name: 'Outdoor Plants',
          image: '/categories/outdoor.jpg',
          cssClass: 'category-outdoor',
          description: 'Hardy plants for gardens, patios and balconies that can withstand outdoor conditions.',
          count: 36,
          featured: true
        },
        {
          id: 3,
          name: 'Succulents',
          image: '/categories/succulents.jpg',
          cssClass: 'category-succulents',
          description: 'Drought-resistant plants with thick, fleshy leaves that store water.',
          count: 28,
          featured: true
        },
        {
          id: 4,
          name: 'Herbs',
          image: '/categories/herbs.jpg',
          cssClass: 'category-herbs',
          description: 'Aromatic plants used for cooking, teas, and medicinal purposes.',
          count: 23,
          featured: true
        },
        {
          id: 5,
          name: 'Rare Plants',
          image: '/categories/rare.jpg',
          cssClass: 'category-rare',
          description: 'Uncommon and unique varieties sought after by collectors and enthusiasts.',
          count: 15,
          featured: false
        },
        {
          id: 6,
          name: 'Tropical Plants',
          image: '/categories/tropical.jpg',
          cssClass: 'category-tropical',
          description: 'Exotic plants that thrive in warm, humid environments with bright light.',
          count: 19,
          featured: false
        },
        {
          id: 7,
          name: 'Seedlings',
          image: '/categories/seedlings.jpg',
          cssClass: 'category-seedlings',
          description: 'Young plants ready to be transplanted into your garden or containers.',
          count: 31,
          featured: false
        },
        {
          id: 8,
          name: 'Cacti',
          image: '/categories/cacti.jpg',
          cssClass: 'category-cacti',
          description: 'Desert plants with unique shapes and minimal water requirements.',
          count: 24,
          featured: false
        },
        {
          id: 9,
          name: 'Ferns',
          image: '/categories/ferns.jpg',
          cssClass: 'category-ferns',
          description: 'Leafy plants that love humidity and indirect light. Perfect for bathrooms.',
          count: 17,
          featured: false
        },
        {
          id: 10,
          name: 'Bonsai',
          image: '/categories/bonsai.jpg',
          cssClass: 'category-bonsai',
          description: 'Artistically shaped miniature trees grown in containers.',
          count: 12,
          featured: false
        },
        {
          id: 11,
          name: 'Hanging Plants',
          image: '/categories/hanging.jpg',
          cssClass: 'category-hanging',
          description: 'Trailing plants ideal for hanging baskets and elevated displays.',
          count: 21,
          featured: false
        },
        {
          id: 12,
          name: 'Plant Accessories',
          image: '/categories/accessories.jpg',
          cssClass: 'category-accessories',
          description: 'Pots, soil, fertilizers, and tools for plant care and display.',
          count: 34,
          featured: false
        }
      ];
      
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Separate featured and regular categories
  const featuredCategories = categories.filter(cat => cat.featured);
  const regularCategories = categories.filter(cat => !cat.featured);
  
  return (
    <div>
      <Head>
        <title>Plant Categories | Plant Marketplace</title>
        <meta name="description" content="Browse plant categories including indoor plants, outdoor plants, succulents, herbs, and more." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Plant Categories</h1>
          <p className="text-gray-600 mb-8">Browse plants by category to find exactly what you're looking for</p>
          
          {isLoading ? (
            <div className="text-center py-12">
              <svg className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <>
              {/* Featured Categories */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredCategories.map(category => (
                    <Link key={category.id} href={`/marketplace?category=${encodeURIComponent(category.name)}`}>
                      <a className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className={`relative h-48 ${category.cssClass}`}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-4 w-full">
                              <h3 className="text-xl font-bold text-white">{category.name}</h3>
                              <p className="text-white/80 text-sm">{category.count} plants</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
              
              {/* All Categories */}
              <section>
                <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...featuredCategories, ...regularCategories].map(category => (
                    <Link key={category.id} href={`/marketplace?category=${encodeURIComponent(category.name)}`}>
                      <a className="flex items-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-full overflow-hidden ${category.cssClass} mr-4 flex-shrink-0`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <p className="text-gray-500 text-sm">{category.count} plants</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
              
              {/* Category Information Cards */}
              <section className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Category Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-3">Indoor Plants Care</h3>
                    <p className="text-gray-600 mb-4">
                      Learn how to care for your indoor plants properly. From watering schedules to light requirements, get all the information you need.
                    </p>
                    <Link href="/guides/indoor-plants">
                      <a className="text-green-600 hover:text-green-800 font-medium flex items-center">
                        Read Guide
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-3">Succulents & Cacti</h3>
                    <p className="text-gray-600 mb-4">
                      Discover the world of low-maintenance plants. Perfect for beginners or busy plant lovers looking for hardy options.
                    </p>
                    <Link href="/guides/succulents">
                      <a className="text-green-600 hover:text-green-800 font-medium flex items-center">
                        Read Guide
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-3">Seasonal Plants</h3>
                    <p className="text-gray-600 mb-4">
                      Find out which plants thrive in each season in Slovakia. Get seasonal planting tips and maintenance advice.
                    </p>
                    <Link href="/guides/seasonal">
                      <a className="text-green-600 hover:text-green-800 font-medium flex items-center">
                        Read Guide
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 