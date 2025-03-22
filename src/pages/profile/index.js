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
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with empty data - in a real application, this would fetch from API
  useEffect(() => {
    // In future implementations this would be an API call to get the user's listings and purchases
    setListings([]);
    setPurchases([]);
    setIsLoading(false);
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
                <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
                <p className="text-gray-600 mb-2">{user?.email || ''}</p>
                <p className="text-gray-600 mb-4">{user?.location || ''}</p>
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
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Plants You've Purchased</h2>

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
                  <p>{user?.email || 'Not provided'}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Member Since</h3>
                  <p>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Phone Number</h3>
                  <p>{user?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Default Location</h3>
                  <p>{user?.location || 'Not provided'}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Payment Method</h3>
                  <p>No payment methods saved</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Shipping Address</h3>
                  <p>{user?.address || 'Not provided'}</p>
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