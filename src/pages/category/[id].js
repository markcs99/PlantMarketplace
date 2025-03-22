import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [category, setCategory] = useState(null);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Categories data
  const categoryData = [
    { 
      id: '1', 
      name: 'Indoor Plants', 
      imageUrl: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800' 
    },
    { 
      id: '2', 
      name: 'Outdoor Plants', 
      imageUrl: 'https://images.pexels.com/photos/2146109/pexels-photo-2146109.jpeg?auto=compress&cs=tinysrgb&w=800' 
    },
    { 
      id: '3', 
      name: 'Succulents', 
      imageUrl: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800' 
    },
    { 
      id: '4', 
      name: 'Herbs', 
      imageUrl: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800' 
    },
  ];
  
  // Mock plants data
  const plantsData = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 34.99,
      image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Indoor Plants',
      seller: 'PlantLover123',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Swiss Cheese Plant',
      price: 29.99,
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Indoor Plants',
      seller: 'GreenThumb',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Peace Lily',
      price: 24.99,
      image: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Indoor Plants',
      seller: 'PlantParadise',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Snake Plant',
      price: 19.99,
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Indoor Plants',
      seller: 'UrbanJungle',
      rating: 4.5,
    },
    {
      id: 5,
      name: 'Aloe Vera',
      price: 14.99,
      image: 'https://images.pexels.com/photos/4505162/pexels-photo-4505162.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Succulents',
      seller: 'SucculentLover',
      rating: 4.9,
    },
    {
      id: 6,
      name: 'Echeveria',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Succulents',
      seller: 'DesertPlants',
      rating: 4.7,
    },
    {
      id: 7,
      name: 'Basil',
      price: 8.99,
      image: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Herbs',
      seller: 'HerbGarden',
      rating: 4.6,
    },
    {
      id: 8,
      name: 'Mint',
      price: 7.99,
      image: 'https://images.pexels.com/photos/2318044/pexels-photo-2318044.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Herbs',
      seller: 'CulinaryHerbs',
      rating: 4.5,
    },
    {
      id: 9,
      name: 'Lavender',
      price: 15.99,
      image: 'https://images.pexels.com/photos/158672/lavender-herb-plant-violet-158672.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Outdoor Plants',
      seller: 'GardenEssentials',
      rating: 4.8,
    },
    {
      id: 10,
      name: 'Hydrangea',
      price: 22.99,
      image: 'https://images.pexels.com/photos/66869/hydrangea-flower-pink-nature-66869.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Outdoor Plants',
      seller: 'FlowerPower',
      rating: 4.7,
    },
  ];
  
  // Load category and plants on page load
  useEffect(() => {
    if (!id) return;
    
    // Find category by id
    const foundCategory = categoryData.find(c => c.id === id);
    setCategory(foundCategory);
    
    // Find plants matching this category
    const filteredPlants = foundCategory
      ? plantsData.filter(plant => plant.category === foundCategory.name)
      : [];
    
    // Simulate API loading delay
    setTimeout(() => {
      setPlants(filteredPlants);
      setLoading(false);
    }, 800);
  }, [id]);
  
  if (!id || loading) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <svg className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading category...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!category) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
              <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
              <Link href="/categories">
                <a className="btn-primary-sm">View All Categories</a>
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
        <title>{category.name} | Plant Marketplace</title>
        <meta name="description" content={`Explore ${category.name} for sale. Find the perfect plants for your home and garden.`} />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div 
            className="h-48 rounded-lg mb-8 relative"
            style={{
              backgroundImage: `url('${category.imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Link href="/">
                <a className="text-gray-500 hover:text-gray-700">Home</a>
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <Link href="/categories">
                <a className="text-gray-500 hover:text-gray-700">Categories</a>
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-800">{category.name}</span>
            </div>
            <p className="text-gray-600">Browse all {plants.length} plants in this category</p>
          </div>
          
          {plants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {plants.map(plant => (
                <Link key={plant.id} href={`/plant/${plant.id}`}>
                  <a className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                    <div 
                      className="relative h-56 bg-gray-200"
                      style={{
                        backgroundImage: `url('${plant.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                        €{plant.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold group-hover:text-green-600 transition-colors">{plant.name}</h2>
                        <div className="flex items-center text-yellow-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-600 ml-1">{plant.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Sold by {plant.seller}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No Plants Found</h3>
              <p className="text-gray-600 mb-4">There are currently no plants available in this category.</p>
              <Link href="/marketplace">
                <a className="btn-primary-sm">Browse All Plants</a>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 