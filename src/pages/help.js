import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Help() {
  const [activeCategory, setActiveCategory] = useState('general');
  
  // FAQ categories and questions
  const faqCategories = [
    { id: 'general', name: 'General Questions' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'buying', name: 'Buying Plants' },
    { id: 'selling', name: 'Selling Plants' },
    { id: 'payments', name: 'Payments & Fees' },
    { id: 'shipping', name: 'Shipping & Delivery' },
  ];
  
  const faqsByCategory = {
    general: [
      {
        question: 'What is Plant Marketplace?',
        answer: 'Plant Marketplace is Slovakia\'s premier online platform for buying and selling plants. We connect plant enthusiasts with sellers across Slovakia, ensuring that plants are locally sourced, healthy, and adapted to local conditions.'
      },
      {
        question: 'How does Plant Marketplace work?',
        answer: 'Our platform allows sellers to list their plants for sale and buyers to browse and purchase these plants. We handle secure payment processing through Stripe, with funds held until buyers confirm receipt of their plants in good condition. We charge a 15% commission on successful sales.'
      },
      {
        question: 'Why focus only on Slovakia?',
        answer: 'By focusing on Slovakia, we ensure that plants don\'t have to travel far distances, which can stress them. Plants sold on our platform are already adapted to Slovak climate conditions, and we support local growers while reducing the carbon footprint associated with plant shipping.'
      },
      {
        question: 'Can I use Plant Marketplace on mobile devices?',
        answer: 'Yes! Our platform is fully responsive and works on all devices. You can browse, buy, and sell plants from your smartphone, tablet, or computer.'
      }
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click on the "Sign Up" button in the upper right corner of the page. Fill in your details including name, email, password, and location. Once submitted, you\'ll receive a verification email to activate your account.'
      },
      {
        question: 'Can I use the same account for buying and selling?',
        answer: 'Yes! All accounts on Plant Marketplace can both buy and sell plants. There\'s no need to create separate accounts for different activities.'
      },
      {
        question: 'How do I edit my profile information?',
        answer: 'Go to your profile page by clicking on your name in the upper right corner after logging in. Then click on "Edit Profile" to update your information, including your name, location, profile picture, and bio.'
      },
      {
        question: 'How can I delete my account?',
        answer: 'Go to your profile settings and scroll to the bottom where you\'ll find the "Delete Account" option. Please note that this action is permanent and will remove all your listings and account information from our platform.'
      }
    ],
    buying: [
      {
        question: 'How do I search for plants?',
        answer: 'Use the search bar at the top of the marketplace page to find specific plants. You can also use filters to narrow your search by category, price range, seller location, and more.'
      },
      {
        question: 'What happens after I place an order?',
        answer: 'After placing an order, the seller will be notified and will prepare your plants for shipping. You\'ll receive updates on your order status, and your payment will be held securely until you confirm receipt of the plants in good condition.'
      },
      {
        question: 'Can I cancel an order?',
        answer: 'You can cancel an order before the seller marks it as "shipped." Go to your orders page and select the order you wish to cancel, then click the "Cancel Order" button. If the order has already been shipped, you\'ll need to contact the seller directly.'
      },
      {
        question: 'How do I leave a review for a seller?',
        answer: 'After confirming receipt of your order, you\'ll be prompted to leave a review. You can rate the seller on a scale of 1-5 stars and leave comments about your experience. Reviews help other buyers make informed decisions.'
      }
    ],
    selling: [
      {
        question: 'How do I list a plant for sale?',
        answer: 'Go to the "Sell" page and click "List a New Plant." Fill in details about your plant including its name, category, price, description, condition, care instructions, and upload clear photos. Once submitted, your listing will be reviewed and published.'
      },
      {
        question: 'What types of plants can I sell?',
        answer: 'You can sell houseplants, outdoor plants, seeds, cuttings, and gardening supplies. All plant material must be legally obtained, disease-free, and non-invasive species. Please check local regulations regarding the sale of certain plant species.'
      },
      {
        question: 'How do I manage my listings?',
        answer: 'Go to your profile and select "My Listings" to view, edit, or remove your plant listings. You can update prices, descriptions, and photos, or mark items as sold or temporarily unavailable.'
      },
      {
        question: 'How do I get verified as a seller?',
        answer: 'After successfully completing 5 sales with positive reviews, you can apply for verification. Go to your profile settings and select "Apply for Verification." Our team will review your selling history and may request additional information before granting verified status.'
      }
    ],
    payments: [
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit and debit cards through our secure Stripe payment processing system. We do not currently support direct bank transfers, cryptocurrency, or cash on delivery.'
      },
      {
        question: 'What fees does Plant Marketplace charge?',
        answer: 'We charge a 15% commission on each successful sale. This fee is deducted automatically from the sale amount before the funds are transferred to your account. There are no listing fees or monthly subscription costs.'
      },
      {
        question: 'When do I get paid for my sales?',
        answer: 'Funds are held until the buyer confirms receipt of their plants in good condition, typically within 3 days of delivery. Once confirmed, the payment (minus our 15% commission) will be processed to your linked bank account within 1-2 business days.'
      },
      {
        question: 'Is payment information secure?',
        answer: 'Yes. We use Stripe, a PCI-compliant payment processor, to handle all transactions. Your payment information is encrypted and securely stored according to industry standards. We never have direct access to your full credit card details.'
      }
    ],
    shipping: [
      {
        question: 'How are plants shipped?',
        answer: 'Sellers are responsible for properly packaging plants to ensure they arrive in good condition. Most plants are shipped via Slovak Post or courier services. Sellers must include care instructions and may use specialized packaging for delicate plants.'
      },
      {
        question: 'What shipping options are available?',
        answer: 'Shipping options vary by seller but typically include standard shipping (2-3 business days), expedited shipping (1-2 business days), and local pickup in some locations. Shipping costs are set by individual sellers and displayed on the product page.'
      },
      {
        question: 'What if my plant arrives damaged?',
        answer: 'If your plant arrives damaged, take photos immediately and contact the seller within 24 hours. If you cannot resolve the issue with the seller, our customer support team can help mediate. In legitimate cases of damage, you may be eligible for a full or partial refund.'
      },
      {
        question: 'Do sellers ship internationally?',
        answer: 'No, currently Plant Marketplace only facilitates sales within Slovakia to ensure plants are adapted to local conditions and to minimize shipping times and stress on the plants.'
      }
    ]
  };
  
  return (
    <div>
      <Head>
        <title>Help & FAQ | Plant Marketplace</title>
        <meta name="description" content="Get answers to your questions about buying and selling plants on Plant Marketplace in Slovakia." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="relative h-40 bg-green-600">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-green-600/70 flex items-center">
                <div className="px-6 md:px-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Help & FAQ</h1>
                  <p className="text-white/90">
                    Find answers to your questions about using Plant Marketplace
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search and Support Section */}
          <section className="mb-10">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Search for answers</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your question here..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="absolute right-2 top-2 text-green-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Need more help?</h2>
                  <p className="text-gray-600 mb-4">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </p>
                  <Link href="/contact">
                    <a className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Contact Support
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            {/* FAQ Categories */}
            <div className="flex flex-wrap mb-6 gap-2">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* FAQ Accordion */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {faqsByCategory[activeCategory].map((faq, index) => (
                <details key={index} className="group border-b last:border-b-0">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          
          {/* Quick Links */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/help/payments">
                <a className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Payment Information</h3>
                  <p className="text-gray-600">Learn about our payment process, fees, and refund policies.</p>
                </a>
              </Link>
              
              <Link href="/help/shipping">
                <a className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Shipping Guidelines</h3>
                  <p className="text-gray-600">Get information about shipping options, packaging, and delivery times.</p>
                </a>
              </Link>
              
              <Link href="/help/selling">
                <a className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Seller Guide</h3>
                  <p className="text-gray-600">Tips for successful selling, including listing best practices and plant care.</p>
                </a>
              </Link>
              
              <Link href="/help/care">
                <a className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Plant Care Resources</h3>
                  <p className="text-gray-600">Learn about plant care specific to Slovak climate and conditions.</p>
                </a>
              </Link>
            </div>
          </section>
          
          {/* Contact Form */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Still Have Questions?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-4">
                    If you couldn't find the answer to your question, please feel free to reach out to our support team. We're here to help!
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span>Email: <a href="mailto:support@plantmarketplace.sk" className="text-green-600 hover:underline">support@plantmarketplace.sk</a></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span>Phone: +421 908 123 456</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Support Hours: Monday - Friday, 9:00 - 17:00</span>
                    </li>
                  </ul>
                </div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                    <select 
                      id="topic" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select a topic</option>
                      <option value="account">Account Issues</option>
                      <option value="order">Order Problems</option>
                      <option value="payment">Payment Questions</option>
                      <option value="shipping">Shipping Questions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                      placeholder="Please describe your question in detail..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 