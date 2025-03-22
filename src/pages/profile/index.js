import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getImageUrl } from '../../utils/image';

export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in a real application, this would be fetched from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings([
        {
          id: 1,
          title: 'Monstera Deliciosa',
          price: 35.50,
          image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
          status: 'active',
          createdAt: '2025-03-15',
          views: 24,
          likes: 5
        },
        {
          id: 2,
          title: 'Fiddle Leaf Fig',
          price: 42.99,
          image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
          status: 'sold',
          createdAt: '2025-03-10',
          views: 36,
          likes: 8
        },
        {
          id: 3,
          title: 'Snake Plant',
          price: 19.99,
          image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
          status: 'active',
          createdAt: '2025-03-05',
          views: 15,
          likes: 2
        }
      ]);

      setPurchases([
        {
          id: 101,
          title: 'Peace Lily',
          price: 28.50,
          image: 'https://images.pexels.com/photos/4503732/pexels-photo-4503732.jpeg?auto=compress&cs=tinysrgb&w=800',
          seller: 'PlantLover123',
          purchaseDate: '2025-03-18',
          status: 'delivered'
        },
        {
          id: 102,
          title: 'ZZ Plant',
          price: 24.99,
          image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800',
          seller: 'GreenThumb',
          purchaseDate: '2025-03-12',
          status: 'in transit'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  // Redirect if not authenticated
  if (!isAuthenticated && typeof window !== 'undefined') {
    router.push('/login?redirect=/profile');
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Please login to view your profile</h1>
              <p className="text-gray-600 mb-6">You need to be logged in to access your profile.</p>
              <Link href="/login?redirect=/profile">
                <a className="btn-primary">Login</a>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get appropriate avatar for display
  const getAvatar = () => {
    try {
      if (user?.avatar && typeof user.avatar === 'string') {
        return getImageUrl(user.avatar, `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof user?.name === 'string' ? user.name : 'User')}&background=E9F5E9&color=3F9142&size=128`);
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof user?.name === 'string' ? user.name : 'User')}&background=E9F5E9&color=3F9142&size=128`;
    } catch (error) {
      console.error("Error getting avatar:", error);
      return `https://ui-avatars.com/api/?name=User&background=E9F5E9&color=3F9142&size=128`;
    }
  };

  return (
    <div>
      <Head>
        <title>My Profile | Plant Marketplace</title>
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-green-100 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={getAvatar()}
                  alt={user?.name || 'User'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Avatar failed to load');
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof user?.name === 'string' ? user.name : 'User')}&background=E9F5E9&color=3F9142&size=128`;
                  }}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{typeof user?.name === 'string' ? user.name : 'User'}</h1>
                <p className="text-gray-600 mb-2">{typeof user?.email === 'string' ? user.email : 'user@example.com'}</p>
                <p className="text-gray-600 mb-4">{typeof user?.location === 'string' ? user.location : 'Bratislava, Slovakia'}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Link href="/profile/edit">
                    <a className="btn-outline-sm">Edit Profile</a>
                  </Link>
                  <Link href="/sell">
                    <a className="btn-primary-sm">Sell a Plant</a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block ml-6 border-l pl-6">
                <div className="text-center mb-2">
                  <span className="block text-2xl font-bold">{listings.length}</span>
                  <span className="text-sm text-gray-600">Plants Listed</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold">{purchases.length}</span>
                  <span className="text-sm text-gray-600">Plants Purchased</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="border-b">
              <nav className="flex">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'listings'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('listings')}
                >
                  My Listings
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'purchases'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('purchases')}
                >
                  My Purchases
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-10">
                  <svg className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">Loading...</p>
                </div>
              ) : activeTab === 'listings' ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Plants You're Selling</h2>
                    <Link href="/sell">
                      <a className="btn-primary-sm">+ Add New Plant</a>
                    </Link>
                  </div>

                  {listings.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No Plants Listed Yet</h3>
                      <p className="text-gray-600 mb-4">Start selling your plants and connect with plant lovers across Slovakia.</p>
                      <Link href="/sell">
                        <a className="btn-primary">Sell Your First Plant</a>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {listings.map(listing => (
                        <div key={listing.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative h-48 bg-gray-200">
                            <div className={`absolute top-2 right-2 z-10 px-2 py-1 text-xs font-medium text-white rounded-full ${
                              listing.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                            }`}>
                              {listing.status === 'active' ? 'Active' : 'Sold'}
                            </div>
                            <img
                              src={getImageUrl(listing.image)}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.log('Listing image failed to load:', listing.title);
                                e.target.src = `https://via.placeholder.com/300x200/E9F5E9/3F9142?text=${encodeURIComponent(listing.title || 'Plant Image')}`;
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-1">{listing.title}</h3>
                            <p className="text-green-600 font-medium mb-2">€{listing.price.toFixed(2)}</p>
                            <div className="flex text-sm text-gray-500 mb-3">
                              <span className="mr-3">
                                <span className="font-medium text-gray-700">{listing.views}</span> views
                              </span>
                              <span>
                                <span className="font-medium text-gray-700">{listing.likes}</span> likes
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                              <span className="text-xs text-gray-500">Listed on {listing.createdAt}</span>
                              <div className="flex space-x-2">
                                <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                                {listing.status === 'active' && (
                                  <button className="text-xs text-red-600 hover:text-red-800">Remove</button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Plants You've Purchased</h2>

                  {purchases.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No Purchases Yet</h3>
                      <p className="text-gray-600 mb-4">Browse our marketplace to find the perfect plants for your collection.</p>
                      <Link href="/marketplace">
                        <a className="btn-primary">Browse Plants</a>
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {purchases.map(purchase => (
                        <div key={purchase.id} className="py-4 flex flex-col sm:flex-row">
                          <div className="sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                            <img 
                              src={getImageUrl(purchase.image)} 
                              alt={purchase.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.log('Purchase image failed to load:', purchase.title);
                                e.target.src = `https://via.placeholder.com/300x200/E9F5E9/3F9142?text=${encodeURIComponent(purchase.title || 'Plant Image')}`;
                              }}
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                              <h3 className="font-medium text-gray-900">{purchase.title}</h3>
                              <p className="text-green-600 font-medium">€{purchase.price.toFixed(2)}</p>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Seller: {purchase.seller}</p>
                            <p className="text-gray-600 text-sm mb-3">Purchased on {purchase.purchaseDate}</p>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                purchase.status === 'delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {purchase.status === 'delivered' ? 'Delivered' : 'In Transit'}
                              </span>
                              {purchase.status === 'delivered' && (
                                <button className="ml-4 text-sm text-blue-600 hover:text-blue-800">
                                  Leave Review
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Email Address</h3>
                  <p>{typeof user?.email === 'string' ? user.email : 'user@example.com'}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Member Since</h3>
                  <p>{typeof user?.joinDate === 'string' ? user.joinDate : 'March 2024'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Phone Number</h3>
                  <p>{typeof user?.phone === 'string' ? user.phone : '+421 XXX XXX XXX'}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Default Location</h3>
                  <p>{typeof user?.location === 'string' ? user.location : 'Bratislava, Slovakia'}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Payment Method</h3>
                  <p>Card ending in {typeof user?.paymentCard === 'string' ? user.paymentCard : 'XXXX'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Shipping Address</h3>
                  <p>{typeof user?.address === 'string' ? user.address : 'No address provided'}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t flex justify-end">
              <Link href="/profile/edit">
                <a className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Edit Account Settings
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 