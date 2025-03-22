import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedPlants from '../components/FeaturedPlants';

export default function Home() {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Indoor Plants', 
      imageUrl: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    { 
      id: 2, 
      name: 'Outdoor Plants', 
      imageUrl: 'https://images.pexels.com/photos/2146109/pexels-photo-2146109.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    { 
      id: 3, 
      name: 'Succulents', 
      imageUrl: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    { 
      id: 4, 
      name: 'Herbs', 
      imageUrl: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
  ]);

  return (
    <div>
      <Head>
        <title>Plant Marketplace | Buy and Sell Plants Online</title>
        <meta name="description" content="Find and sell beautiful plants online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light py-20">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
              Your Online Plant Marketplace
            </h1>
            <p className="text-xl text-white text-center mb-8 max-w-2xl">
              Buy and sell plants from the comfort of your home. Connect with plant lovers from around the world.
            </p>
            <div className="flex space-x-4">
              <Link href="/marketplace">
                <a className="btn-primary">Browse Plants</a>
              </Link>
              <Link href="/sell">
                <a className="btn bg-white text-primary hover:bg-gray-100">Sell Your Plants</a>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <a className="group">
                    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div 
                        className="h-64 relative"
                        style={{
                          backgroundImage: `url('${category.imageUrl}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white text-xl font-bold">{category.name}</h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Plants */}
        <FeaturedPlants />

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Browse Plants</h3>
                <p className="text-gray-600">Find the perfect plants for your home, garden, or collection.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Connect with Sellers</h3>
                <p className="text-gray-600">Message sellers directly, ask questions, and make purchases.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Receive Your Plants</h3>
                <p className="text-gray-600">Get your plants delivered safely to your doorstep.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start?</h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Join our community of plant enthusiasts today.
            </p>
            <Link href="/signup">
              <a className="btn bg-white text-primary hover:bg-gray-100">Create an Account</a>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 