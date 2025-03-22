import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div>
      <Head>
        <title>Terms of Service | Plant Marketplace</title>
        <meta name="description" content="Terms of Service for Plant Marketplace - Slovakia's premier platform for buying and selling plants." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="relative h-32 bg-green-600">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-green-600/70 flex items-center">
                <div className="px-6 md:px-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
                </div>
              </div>
            </div>
          </div>
          
          {/* Terms of Service Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <div className="max-w-4xl mx-auto prose prose-green">
              <p className="text-gray-500 mb-8">Last updated: March 22, 2024</p>
              
              <p>Welcome to Plant Marketplace. These Terms of Service ("Terms") govern your use of our website, services, and applications (collectively, the "Service"), so please read them carefully before using the Service.</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.</p>
              
              <h2>2. Changes to Terms</h2>
              <p>We may modify the Terms at any time, at our sole discretion. If we do so, we'll let you know either by posting the modified Terms on the Site or through other communications. It's important that you review the Terms whenever we modify them because if you continue to use the Service after we have posted modified Terms, you are indicating to us that you agree to be bound by the modified Terms.</p>
              
              <h2>3. Eligibility</h2>
              <p>You must be at least 18 years old to use our Service. By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 18 years old; (b) you have not previously been suspended or removed from the Service; and (c) your registration and your use of the Service is in compliance with all applicable laws and regulations.</p>
              
              <h2>4. Accounts</h2>
              <p>To use certain features of our Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information about yourself as prompted by our registration form. You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account.</p>
              
              <h2>5. Content</h2>
              <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>
              <p>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post, or display on or through the Service and you are responsible for protecting those rights.</p>
              
              <h2>6. Prohibited Activities</h2>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul>
                <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                <li>Harassing, threatening, or intimidating any other users of the Service.</li>
                <li>Impersonating or misrepresenting your affiliation with any person or entity.</li>
                <li>Posting false, misleading, or deceptive listings.</li>
                <li>Selling prohibited plant species or illegally obtained plant material.</li>
                <li>Attempting to circumvent any security or verification measures of the Service.</li>
                <li>Using the Service in a manner that could disable, overburden, damage, or impair the Service.</li>
              </ul>
              
              <h2>7. Listings and Transactions</h2>
              <p><strong>7.1 Listing Requirements</strong></p>
              <p>When creating a listing on our Service, you must provide complete and accurate information about the plant or item you are selling, including:</p>
              <ul>
                <li>Accurate description of the plant's species, condition, and size</li>
                <li>Clear, unaltered photos of the actual plant for sale</li>
                <li>Honest pricing and shipping information</li>
                <li>Any known issues, diseases, or pests affecting the plant</li>
              </ul>
              
              <p><strong>7.2 Prohibited Items</strong></p>
              <p>The following items are prohibited from being listed on our Service:</p>
              <ul>
                <li>Protected or endangered plant species</li>
                <li>Invasive plant species as defined by Slovak or EU regulations</li>
                <li>Plants collected from the wild without proper permits</li>
                <li>Plants with active pests or diseases</li>
                <li>Non-plant related items (except for plant care supplies)</li>
              </ul>
              
              <p><strong>7.3 Transaction Terms</strong></p>
              <p>Plant Marketplace serves as a platform connecting buyers and sellers and facilitates payment processing. When you make a purchase:</p>
              <ul>
                <li>Payment is processed through our secure Stripe integration</li>
                <li>Funds are held until the buyer confirms receipt of the plant in good condition</li>
                <li>A 15% commission fee is deducted from the seller's proceeds</li>
                <li>Sellers are responsible for proper packaging and shipping</li>
                <li>Buyers must inspect plants promptly upon receipt and report any issues within 24 hours</li>
              </ul>
              
              <h2>8. Fees and Payment</h2>
              <p>Plant Marketplace charges a 15% commission on each successful sale. This fee is automatically deducted from the sale amount before funds are transferred to the seller. There are no listing fees or monthly subscription costs.</p>
              <p>All payments are processed securely through Stripe. By using our Service, you agree to comply with Stripe's terms of service.</p>
              
              <h2>9. Shipping and Delivery</h2>
              <p>Sellers are responsible for packaging plants appropriately to ensure they arrive in good condition. Plants must be shipped within the timeframe specified in the listing (typically 1-3 business days). Sellers must provide tracking information when available.</p>
              <p>Currently, Plant Marketplace only supports shipping within Slovakia to ensure plants are adapted to local conditions and to minimize shipping times.</p>
              
              <h2>10. Returns and Refunds</h2>
              <p>If a plant arrives damaged or significantly different from its description, buyers may request a refund within 24 hours of delivery by contacting the seller directly and providing photos as evidence. If the issue cannot be resolved between buyer and seller, Plant Marketplace customer support will review the case and make a final determination.</p>
              <p>Refunds are not available for:</p>
              <ul>
                <li>Plants that die after delivery due to improper care</li>
                <li>Minor variations in color or appearance that are typical for the plant species</li>
                <li>Issues not reported within 24 hours of delivery</li>
              </ul>
              
              <h2>11. Intellectual Property</h2>
              <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Plant Marketplace and its licensors. The Service is protected by copyright, trademark, and other laws of both Slovakia and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Plant Marketplace.</p>
              
              <h2>12. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
              
              <h2>13. Limitation of Liability</h2>
              <p>In no event shall Plant Marketplace, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
              
              <h2>14. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of Slovakia, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
              
              <h2>15. Changes to Service</h2>
              <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.</p>
              
              <h2>16. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <ul>
                <li>Email: <a href="mailto:legal@plantmarketplace.sk" className="text-green-600 hover:underline">legal@plantmarketplace.sk</a></li>
                <li>Address: Plant Marketplace s.r.o., Botanická 7, 841 04 Bratislava, Slovakia</li>
              </ul>
            </div>
          </div>
          
          {/* Related Links */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Related Policies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/privacy">
                <a className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Privacy Policy</h3>
                  <p className="text-gray-600 text-sm">Learn how we collect, use, and protect your personal information.</p>
                </a>
              </Link>
              
              <Link href="/help/selling">
                <a className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Seller Guidelines</h3>
                  <p className="text-gray-600 text-sm">Best practices for selling plants and meeting our quality standards.</p>
                </a>
              </Link>
              
              <Link href="/help/shipping">
                <a className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Shipping Policy</h3>
                  <p className="text-gray-600 text-sm">Information about shipping methods, packaging requirements, and delivery times.</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 