import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = 'Plant Marketplace' }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title} | Plant Marketplace</title>
        <meta name="description" content="Buy and sell plants online. Find rare and exotic plants, indoor plants, outdoor plants, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
} 