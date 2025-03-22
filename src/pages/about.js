import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us | Plant Marketplace</title>
        <meta name="description" content="Learn about Plant Marketplace, Slovakia's premier platform for buying and selling plants. Our mission is to connect plant lovers across Slovakia." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="relative h-64 md:h-80 bg-green-600">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-green-600/70 flex items-center">
                <div className="px-6 md:px-10 max-w-xl">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About Plant Marketplace</h1>
                  <p className="text-white/90 text-lg">
                    Slovakia's premier platform connecting plant enthusiasts and sellers across the country.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Mission */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-4">
                    Plant Marketplace was founded in 2024 with a simple but powerful mission: to make plant buying and selling accessible to everyone in Slovakia. We believe that plants enhance our lives, improve our well-being, and reconnect us with nature.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We're building a community where plant enthusiasts can connect with sellers who share their passion. Whether you're looking for common houseplants, rare specimens, or locally grown herbs, our platform brings together diverse offerings from across Slovakia.
                  </p>
                  <p className="text-gray-700">
                    By focusing specifically on the Slovak market, we ensure that all plants are adapted to local conditions and shipping distances are minimized, resulting in healthier plants and a reduced environmental footprint.
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="font-semibold text-xl mb-2">Our Values</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span><strong>Community:</strong> Building connections between plant lovers across Slovakia</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span><strong>Sustainability:</strong> Promoting locally sourced plants to reduce carbon footprint</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span><strong>Accessibility:</strong> Making plant ownership possible for everyone</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span><strong>Education:</strong> Sharing knowledge about plant care and cultivation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">How Plant Marketplace Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">For Buyers</h3>
                <p className="text-gray-600 mb-4">
                  Browse thousands of plants from sellers across Slovakia. Filter by category, location, and price to find exactly what you're looking for.
                </p>
                <Link href="/signup">
                  <a className="text-green-600 hover:text-green-800 font-medium">Create an Account →</a>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">For Sellers</h3>
                <p className="text-gray-600 mb-4">
                  List your plants for sale, set your prices, and reach plant enthusiasts throughout Slovakia. Our platform charges a 15% commission only when you make a sale.
                </p>
                <Link href="/sell">
                  <a className="text-green-600 hover:text-green-800 font-medium">Start Selling →</a>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Secure Transactions</h3>
                <p className="text-gray-600 mb-4">
                  All payments are processed securely through our platform using Stripe. Funds are held until the buyer confirms receipt of their plants in good condition.
                </p>
                <Link href="/help/payments">
                  <a className="text-green-600 hover:text-green-800 font-medium">Learn More →</a>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Slovak Focus */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Why We Focus on Slovakia</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 mb-4">
                    Our platform is specifically designed for the Slovak market, with several key advantages:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span><strong>Local Climate Adaptation:</strong> Plants available on our platform are already adapted to Slovak climate conditions, increasing their chances of thriving in your home or garden.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span><strong>Reduced Shipping Time:</strong> Plants don't have to travel far, ensuring they arrive in the best possible condition.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span><strong>Support Local Growers:</strong> By buying from Slovak sellers, you're supporting the local economy and reducing carbon emissions from international shipping.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span><strong>Local Knowledge Exchange:</strong> Get advice specific to growing plants in Slovak conditions from experienced local growers.</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="/about/slovakia-map.jpg" 
                    alt="Map of Slovakia highlighting plant sellers" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/600x400?text=Map+of+Slovakia';
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Join Us */}
          <section className="mb-12">
            <div className="bg-green-600 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Growing Community</h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Whether you're an experienced plant seller, an enthusiastic collector, or just starting your plant journey, we welcome you to Plant Marketplace.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <a className="btn-white-outline">Create an Account</a>
                </Link>
                <Link href="/marketplace">
                  <a className="btn-white">Browse Plants</a>
                </Link>
              </div>
            </div>
          </section>
          
          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">How do I know plants will arrive safely?</h3>
                  <p className="mt-2 text-gray-600">
                    All our sellers follow strict packaging guidelines to ensure plants are protected during transit. Additionally, our payment protection system means you won't be charged until you confirm your plants have arrived in good condition.
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">What is your commission structure?</h3>
                  <p className="mt-2 text-gray-600">
                    We charge a 15% commission on each sale. This fee helps us maintain the platform, provide secure payment processing, and offer customer support to both buyers and sellers.
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Can I sell plants from outside Slovakia?</h3>
                  <p className="mt-2 text-gray-600">
                    Currently, Plant Marketplace is focused exclusively on the Slovak market. All sellers must be located in Slovakia to ensure plants are adapted to local conditions and shipping times are minimized.
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">How do you verify sellers?</h3>
                  <p className="mt-2 text-gray-600">
                    We have a verification process for sellers that includes confirming their identity and location. Verified sellers are indicated with a blue check mark on their profile. Additionally, our review system allows buyers to share their experiences.
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">What if I have issues with my order?</h3>
                  <p className="mt-2 text-gray-600">
                    If you encounter any problems with your order, first contact the seller directly. If you can't resolve the issue, our customer support team is available to help mediate and ensure a fair resolution for both parties.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 