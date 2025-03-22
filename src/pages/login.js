import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the login function with email and password
      const result = await login(email, password);
      
      if (result.success) {
        // If login was successful and there's a redirect parameter, go there
        if (router.query.redirect) {
          router.push(`/${router.query.redirect}`);
        } else {
          router.push('/'); // Default redirect to home page
        }
      } else {
        // Display the error message from the login function
        setError(result.message || 'Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Login | Plant Marketplace</title>
      </Head>

      <Header />

      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
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
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700" htmlFor="remember-me">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/forgot-password">
                    <a className="text-primary hover:text-primary-dark">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup">
                  <a className="text-primary hover:text-primary-dark font-medium">
                    Sign up
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 