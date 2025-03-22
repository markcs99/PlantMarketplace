import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill out all required fields.'
      });
      return;
    }
    
    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! Our team will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
    }, 1000);
  };
  
  return (
    <div>
      <Head>
        <title>Contact Us | Plant Marketplace</title>
        <meta name="description" content="Contact Plant Marketplace customer support for questions about buying and selling plants in Slovakia." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="relative h-40 bg-green-600">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-green-600/70 flex items-center">
                <div className="px-6 md:px-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
                  <p className="text-white/90">
                    We're here to help with any questions about Plant Marketplace
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            {/* Contact Information */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 h-full">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Customer Support</h3>
                    <p className="text-gray-600 mb-4">
                      Our support team is available to help with any questions or concerns about your orders, account, or the platform in general.
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
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Business Inquiries</h3>
                    <p className="text-gray-600 mb-4">
                      For partnership opportunities, press inquiries, or business-related questions:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>Email: <a href="mailto:business@plantmarketplace.sk" className="text-green-600 hover:underline">business@plantmarketplace.sk</a></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Office Location</h3>
                    <address className="not-italic text-gray-600 mb-4">
                      Plant Marketplace s.r.o.<br />
                      Botanická 7<br />
                      841 04 Bratislava<br />
                      Slovakia
                    </address>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Hours of Operation</h3>
                    <p className="text-gray-600">
                      Customer Support:<br />
                      Monday - Friday: 9:00 - 17:00<br />
                      Saturday: 10:00 - 14:00<br />
                      Sunday: Closed
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-3">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com/plantmarketplacesk" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="https://instagram.com/plantmarketplacesk" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="https://twitter.com/plantmarketsk" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                {formStatus.submitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <p>{formStatus.message}</p>
                  </div>
                ) : formStatus.error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>{formStatus.message}</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                    <select 
                      id="topic" 
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select a topic</option>
                      <option value="account">Account Issues</option>
                      <option value="order">Order Problems</option>
                      <option value="payment">Payment Questions</option>
                      <option value="shipping">Shipping Questions</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                    <textarea 
                      id="message" 
                      rows="6" 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                      placeholder="Please describe your question or issue in detail..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="font-medium text-gray-700">
                        I agree to the <Link href="/privacy"><a className="text-green-600 hover:underline">Privacy Policy</a></Link> and consent to the processing of my personal data.
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* FAQ Preview */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
                <Link href="/help">
                  <a className="text-green-600 hover:text-green-800 font-medium">View All FAQs</a>
                </Link>
              </div>
              
              <div className="space-y-4">
                <details className="group border-b border-gray-200 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-gray-900">What is Plant Marketplace?</h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <div className="mt-3 text-gray-600">
                    <p>Plant Marketplace is Slovakia's premier online platform for buying and selling plants. We connect plant enthusiasts with sellers across Slovakia, ensuring that plants are locally sourced, healthy, and adapted to local conditions.</p>
                  </div>
                </details>
                
                <details className="group border-b border-gray-200 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-gray-900">How does the commission structure work?</h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <div className="mt-3 text-gray-600">
                    <p>We charge a 15% commission on each successful sale. This fee is deducted automatically from the sale amount before the funds are transferred to your account. There are no listing fees or monthly subscription costs.</p>
                  </div>
                </details>
                
                <details className="group pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h3 className="text-lg font-medium text-gray-900">How soon will I receive my plants after ordering?</h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <div className="mt-3 text-gray-600">
                    <p>Shipping times depend on the seller and the shipping method you choose. Most orders are processed within 1-2 business days, and standard shipping typically takes 2-3 business days within Slovakia. Expedited shipping options (1-2 days) are available from many sellers. The estimated delivery time will be shown during checkout.</p>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 