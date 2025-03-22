import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>Page Not Found | Plant Marketplace</title>
      </Head>
      
      <Header />
      
      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/">
              <a className="btn-primary">Return to Home</a>
            </Link>
            <Link href="/marketplace">
              <a className="btn-outline">Browse Plants</a>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 