import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center cursor-pointer">
              <span className="text-green-600 text-2xl font-bold">Plant</span>
              <span className="text-gray-700 text-2xl font-bold">Marketplace</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace">
              <span className={`cursor-pointer text-sm font-medium px-4 py-2 ${router.pathname === '/marketplace' ? 'text-green-600' : 'text-gray-700 hover:text-green-500'}`}>
                Browse Plants
              </span>
            </Link>
            <Link href="/sellers">
              <span className={`cursor-pointer text-sm font-medium px-4 py-2 ${router.pathname === '/sellers' ? 'text-green-600' : 'text-gray-700 hover:text-green-500'}`}>
                Find Sellers
              </span>
            </Link>
            
            {/* Cart Icon */}
            <Link href="/cart">
              <span className="relative cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </span>
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <span className={`cursor-pointer text-sm font-medium px-4 py-2 ${router.pathname === '/profile' ? 'text-green-600' : 'text-gray-700 hover:text-green-500'}`}>
                    My Profile
                  </span>
                </Link>
                <button 
                  onClick={logout} 
                  className="text-sm font-medium text-gray-700 hover:text-green-500 px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <span className={`cursor-pointer text-sm font-medium px-4 py-2 ${router.pathname === '/login' ? 'text-green-600' : 'text-gray-700 hover:text-green-500'}`}>
                    Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="text-sm font-medium px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* Cart Icon for Mobile */}
            <Link href="/cart">
              <span className="relative cursor-pointer mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </span>
            </Link>
            
            <button 
              className="text-gray-700 hover:text-green-500 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/marketplace">
                <span className={`cursor-pointer text-base font-medium ${router.pathname === '/marketplace' ? 'text-green-600' : 'text-gray-700'}`}>
                  Browse Plants
                </span>
              </Link>
              <Link href="/sellers">
                <span className={`cursor-pointer text-base font-medium ${router.pathname === '/sellers' ? 'text-green-600' : 'text-gray-700'}`}>
                  Find Sellers
                </span>
              </Link>
              {user ? (
                <>
                  <Link href="/profile">
                    <span className={`cursor-pointer text-base font-medium ${router.pathname === '/profile' ? 'text-green-600' : 'text-gray-700'}`}>
                      My Profile
                    </span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="text-base font-medium text-gray-700 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <span className={`cursor-pointer text-base font-medium ${router.pathname === '/login' ? 'text-green-600' : 'text-gray-700'}`}>
                      Login
                    </span>
                  </Link>
                  <Link href="/signup">
                    <span className="text-sm font-medium px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 inline-block">Sign Up</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 