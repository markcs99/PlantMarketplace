import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeaturedPlants() {
  // In a real application, these would be fetched from an API
  const [featuredPlants, setFeaturedPlants] = useState([
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 39.99,
      image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Green Thumb Gardens',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Fiddle Leaf Fig',
      price: 49.99,
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Indoor Jungle',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Snake Plant',
      price: 24.99,
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Urban Botanics',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Peace Lily',
      price: 19.99,
      image: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Green Thumb Gardens',
      rating: 4.7,
    },
  ]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlants.map((plant) => (
            <div key={plant.id} className="card hover:shadow-lg transition-shadow">
              <div 
                className="relative h-48 bg-gray-200 rounded-t-lg mb-4"
                style={{
                  backgroundImage: `url('${plant.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium shadow-sm">
                  {plant.rating} ★
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">{plant.name}</h3>
              <p className="text-gray-600 text-sm mb-2">by {plant.seller}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary">€{plant.price.toFixed(2)}</span>
                <Link href={`/plant/${plant.id}`}>
                  <a className="btn-primary-sm">View Details</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/marketplace">
            <a className="btn-outline">View All Plants</a>
          </Link>
        </div>
      </div>
    </section>
  );
} 