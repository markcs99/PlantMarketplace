import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImageUpload from '../../components/ImageUpload';
import { uploadImage, getImageUrl } from '../../utils/image';

export default function EditProfile() {
  const router = useRouter();
  const { isAuthenticated, user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Slovak cities for location dropdown
  const slovakCities = [
    'Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica', 
    'Nitra', 'Trnava', 'Trenčín', 'Martin', 'Poprad', 
    'Prievidza', 'Zvolen', 'Považská Bystrica', 'Michalovce', 'Nové Zámky'
  ];
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(typeof user.name === 'string' ? user.name : '');
      setEmail(typeof user.email === 'string' ? user.email : '');
      setPhone(typeof user.phone === 'string' ? user.phone : '');
      setLocation(typeof user.location === 'string' ? user.location : 'Bratislava');
      setBio(typeof user.bio === 'string' ? user.bio : '');
      setAddress(typeof user.address === 'string' ? user.address : '');
      
      // If the user has a valid avatar URL, set it as the initial profile image
      if (typeof user.avatar === 'string' && user.avatar.trim() !== '') {
        // Create a temporary File object for display purposes
        // In a real app, you might fetch the image and create a File object
        const tempFile = {
          name: 'profile-image.jpg',
          type: 'image/jpeg',
          size: 12345,
          lastModified: Date.now()
        };
        
        // In a real scenario, we would download and set this image
        // For demo purposes we'll just set the URL directly
        setProfileImage(null);
      }
    }
  }, [user]);
  
  // Handle profile image change
  const handleProfileImageChange = (file) => {
    setProfileImage(file);
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login?redirect=/profile/edit');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Upload profile image if provided
      let avatarUrl = typeof user?.avatar === 'string' ? user.avatar : null;
      
      if (profileImage) {
        avatarUrl = await uploadImage(profileImage, 'avatar');
      }
      
      // In a real app, this would be an API call to update the user profile
      // For demo, we simulate success and update the user context
      setTimeout(() => {
        // Create the updated user object with all fields as strings
        const updatedUser = {
          ...(user || {}),
          id: user?.id || '123',
          name: name || 'User',
          email: email || 'user@example.com',
          phone: phone || '',
          location: location || 'Bratislava',
          bio: bio || '',
          address: address || '',
          avatar: typeof avatarUrl === 'string' ? avatarUrl : '',
          joinDate: user?.joinDate || 'March 2024'
        };
        
        // Update user context
        setUser(updatedUser);
        
        // Show success message
        setSuccess(true);
        setShowSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };
  
  // Redirect if not authenticated
  if (!isAuthenticated && typeof window !== 'undefined') {
    router.push('/login?redirect=/profile/edit');
    return null;
  }
  
  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Please login to continue</h1>
              <p className="text-gray-600 mb-6">You need to be logged in to edit your profile.</p>
              <Link href="/login?redirect=/profile/edit">
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
        return getImageUrl(user.avatar, `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E9F5E9&color=3F9142&size=128`);
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E9F5E9&color=3F9142&size=128`;
    } catch (error) {
      console.error("Error getting avatar:", error);
      return `https://ui-avatars.com/api/?name=User&background=E9F5E9&color=3F9142&size=128`;
    }
  };

  return (
    <div>
      <Head>
        <title>Edit Profile | Plant Marketplace</title>
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <Link href="/profile">
                <a className="text-gray-500 hover:text-gray-700 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </Link>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            {showSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Profile updated successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Profile Image Section */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                <div className="flex flex-col md:flex-row items-start">
                  <div className="w-40 mr-6 mb-4 md:mb-0">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={profileImage ? URL.createObjectURL(profileImage) : getAvatar()}
                        alt={name || 'User'} 
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          console.error('Failed to load profile image');
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=E9F5E9&color=3F9142&size=128`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <ImageUpload 
                      onChange={handleProfileImageChange}
                      initialImage={getAvatar()}
                      label="Upload New Profile Picture"
                      height="h-40"
                      width="w-full sm:w-64"
                      showPreview={true}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Upload a clear photo of yourself. JPG, PNG or WebP, max 5MB.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="input"
                      placeholder="+421 XXX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                      Location
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
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows="3"
                    className="input"
                    placeholder="Tell other plant enthusiasts about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              {/* Shipping Information */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                    Full Address
                  </label>
                  <textarea
                    id="address"
                    rows="2"
                    className="input"
                    placeholder="Street address, apartment, city, postal code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="p-6 flex justify-between items-center">
                <Link href="/profile">
                  <a className="text-gray-600 hover:text-gray-800">Cancel</a>
                </Link>
                
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save Changes'}
                </button>
              </div>
            </form>
            
            {/* Account Security */}
            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Account Security</h2>
                <p className="text-gray-600 mt-1">Manage your password and account security settings</p>
              </div>
              
              <div className="p-6">
                <Link href="/profile/password">
                  <a className="btn-outline w-full md:w-auto text-center">
                    Change Password
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 