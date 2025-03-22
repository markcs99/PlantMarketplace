import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HowItWorks() {
  return (
    <div>
      <Head>
        <title>How It Works | Plant Marketplace</title>
        <meta name="description" content="Learn how Plant Marketplace connects plant lovers with local sellers across Slovakia" />
      </Head>

      <Header />

      <main className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:flex-1 p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Plant Marketplace Works</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Plant Marketplace connects plant enthusiasts with local sellers across Slovakia, creating a vibrant community dedicated to sharing beautiful and healthy plants.
                </p>
                <div className="flex space-x-4">
                  <Link href="/marketplace">
                    <a className="btn-primary">Start Shopping</a>
                  </Link>
                  <Link href="/signup">
                    <a className="btn-outline">Become a Seller</a>
                  </Link>
                </div>
              </div>
              <div 
                className="md:flex-1 h-64 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=800')" }}
              ></div>
            </div>
          </div>

          {/* Three Step Process */}
          <h2 className="text-3xl font-bold text-center mb-12">Our Simple Three-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Browse Plants</h3>
              <p className="text-gray-600 mb-4">
                Explore our curated selection of indoor plants, outdoor plants, succulents, herbs, and more. Filter by category, price, or seller rating to find the perfect plants for your home.
              </p>
              <img 
                src="https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Browse Plants" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">Connect with Sellers</h3>
              <p className="text-gray-600 mb-4">
                Purchase directly from verified Slovak growers and plant enthusiasts. All sellers are vetted to ensure you receive healthy, high-quality plants with proper care instructions.
              </p>
              <img 
                src="https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Connect with Sellers" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Receive Your Plants</h3>
              <p className="text-gray-600 mb-4">
                Choose home delivery or Packeta pickup points for convenient shipping. Plants are carefully packaged to ensure they arrive in perfect condition, ready to thrive in your space.
              </p>
              <img 
                src="https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Receive Your Plants" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* For Buyers Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">For Plant Buyers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Why Buy from Plant Marketplace?</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Local plants already adapted to Slovak climate</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Support local growers and plant enthusiasts</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Guaranteed plant health and customer satisfaction</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Convenient delivery options including Packeta pickup</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Buyer Protection</h3>
                  <p className="text-gray-600 mb-4">
                    We hold payment until you confirm receipt of your plants in good condition. If there's an issue with your order, our support team will help resolve it promptly.
                  </p>
                  <Link href="/marketplace">
                    <a className="btn-primary">Start Shopping</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* For Sellers Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">For Plant Sellers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Why Sell on Plant Marketplace?</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Reach plant enthusiasts across Slovakia</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>No listing fees - only 15% commission on sales</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Simple platform for managing plant listings</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Secure payment processing handled for you</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Getting Started as a Seller</h3>
                  <p className="text-gray-600 mb-4">
                    Create an account, set up your seller profile, and start listing your plants. Our simple upload process makes it easy to showcase your plants with photos and detailed descriptions.
                  </p>
                  <Link href="/signup?seller=true">
                    <a className="btn-primary">Become a Seller</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <details className="group border-b">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h3 className="text-lg font-medium text-gray-900">What types of plants can I find on Plant Marketplace?</h3>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600">
                <p>You can find a wide variety of plants including indoor houseplants, outdoor plants, succulents, herbs, rare species, and more. All plants are sourced from local growers across Slovakia.</p>
              </div>
            </details>
            <details className="group border-b">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h3 className="text-lg font-medium text-gray-900">How does delivery work?</h3>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600">
                <p>We offer two delivery options: home delivery (€3.99) or Packeta pickup points (€2.49). Plants are carefully packaged to ensure they arrive in excellent condition. Delivery is typically within 2-4 business days, depending on your location in Slovakia.</p>
              </div>
            </details>
            <details className="group border-b">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h3 className="text-lg font-medium text-gray-900">What if my plant arrives damaged?</h3>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600">
                <p>We have a satisfaction guarantee policy. If your plant arrives damaged or in poor condition, please contact our support team within 48 hours with photos of the plant. We'll arrange for a replacement or refund.</p>
              </div>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h3 className="text-lg font-medium text-gray-900">How does the commission structure work for sellers?</h3>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600">
                <p>We charge a 15% commission on each successful sale. This fee is deducted automatically from the sale amount before the funds are transferred to your account. There are no listing fees or monthly subscription costs.</p>
              </div>
            </details>
          </div>

          {/* Call to Action */}
          <div className="bg-primary rounded-xl shadow-md overflow-hidden text-white">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
              <p className="text-lg mb-6">
                Whether you're looking to buy beautiful plants or share your passion by selling, Plant Marketplace is the perfect place to connect with plant lovers across Slovakia.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/marketplace">
                  <a className="btn bg-white text-primary hover:bg-gray-100">Browse Plants</a>
                </Link>
                <Link href="/signup">
                  <a className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">Create an Account</a>
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