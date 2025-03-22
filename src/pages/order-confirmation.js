import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderConfirmation() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, we would get the order ID from query params 
  // and fetch the order details from an API
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock order data
      const mockOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        status: 'Processing',
        items: [
          {
            id: 1,
            title: 'Monstera Deliciosa',
            price: 35.50,
            image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
            quantity: 1,
            seller: 'PlantLover123'
          },
          {
            id: 2,
            title: 'Snake Plant',
            price: 19.99,
            image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
            quantity: 2,
            seller: 'GreenThumb'
          }
        ],
        subtotal: 75.48,
        packagingFee: 0.99,
        deliveryFee: 2.49,
        total: 78.96,
        paymentMethod: 'Credit Card (ending in 4242)',
        deliveryMethod: 'Packeta Pickup Point',
        deliveryDetails: {
          type: 'packeta',
          point: {
            id: 'zp-001',
            name: 'Packeta Point - Aupark Shopping Center',
            address: 'Einsteinova 18, 851 01 Bratislava',
            city: 'Bratislava',
            zipCode: '85101',
            openingHours: 'Mon-Sun: 9:00-21:00'
          }
        }
      };
      
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.push('/login?redirect=/order-confirmation');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <main className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Please login to view your order</h1>
              <p className="text-gray-600 mb-6">You need to be logged in to access your order details.</p>
              <Link href="/login?redirect=/order-confirmation">
                <a className="btn-primary">Login</a>
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
        <title>Order Confirmation | Plant Marketplace</title>
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <svg className="animate-spin h-10 w-10 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Loading your order details...</p>
              </div>
            ) : (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-6 border-b">
                    <div className="mb-4 sm:mb-0 text-center sm:text-left">
                      <div className="inline-block bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full text-sm mb-2">
                        Order {order.status}
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-bold">Thank You For Your Order!</h1>
                      <p className="text-gray-600">Order #{order.id}</p>
                    </div>
                    <div className="flex space-x-3">
                      <Link href="/profile">
                        <a className="btn-outline-sm">View Profile</a>
                      </Link>
                      <Link href="/marketplace">
                        <a className="btn-primary-sm">Continue Shopping</a>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="font-semibold text-gray-800 mb-1">Order Placed</h3>
                        <p className="text-gray-600">{order.date}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Payment Method</h3>
                        <p className="text-gray-600">{order.paymentMethod}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Delivery Information</h3>
                      <p className="text-gray-600 mb-1">{order.deliveryMethod}</p>
                      
                      {order.deliveryDetails.type === 'packeta' && (
                        <div className="mt-2">
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="font-medium">{order.deliveryDetails.point.name}</p>
                              <p className="text-sm text-gray-600">{order.deliveryDetails.point.address}</p>
                              <p className="text-xs text-gray-500 mt-1">{order.deliveryDetails.point.openingHours}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 text-sm">
                        <p className="text-gray-600">You will receive an email with tracking information once your order ships.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Item
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Seller
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mr-3">
                                    <img 
                                      src={item.image} 
                                      alt={item.title} 
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/48x48/E9F5E9/3F9142?text=Plant';
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{item.seller}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                €{item.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                                €{(item.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 border-t pt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">€{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Packaging Fee</span>
                        <span className="font-medium">€{order.packagingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Delivery</span>
                        <span className="font-medium">€{order.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">€{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Need Help?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/help/orders">
                      <a className="flex items-center p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                        <div className="mr-3 text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Track Order</h4>
                          <p className="text-sm text-gray-600">Check shipping status</p>
                        </div>
                      </a>
                    </Link>
                    
                    <Link href="/help/returns">
                      <a className="flex items-center p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                        <div className="mr-3 text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Returns</h4>
                          <p className="text-sm text-gray-600">Return policy & process</p>
                        </div>
                      </a>
                    </Link>
                    
                    <Link href="/help/contact">
                      <a className="flex items-center p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                        <div className="mr-3 text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Contact Us</h4>
                          <p className="text-sm text-gray-600">Get support for your order</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 