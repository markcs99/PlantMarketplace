import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy | Plant Marketplace</title>
        <meta name="description" content="Privacy Policy for Plant Marketplace - Learn how we collect, use, and protect your personal information." />
      </Head>

      <Header />

      <main className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="relative h-32 bg-green-600">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-green-600/70 flex items-center">
                <div className="px-6 md:px-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
                </div>
              </div>
            </div>
          </div>
          
          {/* Privacy Policy Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <div className="max-w-4xl mx-auto prose prose-green">
              <p className="text-gray-500 mb-8">Last updated: March 22, 2024</p>
              
              <p>This Privacy Policy describes how Plant Marketplace ("we", "our", or "us") collects, uses, and discloses your personal information when you use our website, mobile application, and services (collectively, the "Service").</p>
              
              <h2>1. Information We Collect</h2>
              
              <h3>1.1 Information You Provide</h3>
              <p>When you create an account, list plants for sale, make purchases, or interact with our Service, we may collect the following types of information:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password, phone number, and profile picture</li>
                <li><strong>Location Information:</strong> Your city and postal code in Slovakia</li>
                <li><strong>Payment Information:</strong> Payment card details, billing address, and bank account information for sellers (processed securely through Stripe)</li>
                <li><strong>Transaction Information:</strong> Details about plants you buy or sell, shipping information, and messaging history with other users</li>
                <li><strong>Content You Generate:</strong> Plant listings, reviews, ratings, photos, and messages</li>
              </ul>
              
              <h3>1.2 Information Collected Automatically</h3>
              <p>When you use our Service, we automatically collect certain information about your device and usage, including:</p>
              <ul>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent on the Service, navigation paths, search queries, and interaction with features</li>
                <li><strong>Location Data:</strong> General location information derived from your IP address</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to collect information about your browsing activities and preferences</li>
              </ul>
              
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              <ul>
                <li>Providing, maintaining, and improving our Service</li>
                <li>Processing transactions and facilitating payments between buyers and sellers</li>
                <li>Creating and managing your account and authenticating your identity</li>
                <li>Connecting buyers with sellers of plants and facilitating communication</li>
                <li>Sending you transaction confirmations, updates, security alerts, and support messages</li>
                <li>Personalizing your experience and showing relevant content and recommendations</li>
                <li>Analyzing usage patterns to improve our Service and develop new features</li>
                <li>Detecting, preventing, and addressing fraud, abuse, security issues, and technical problems</li>
                <li>Complying with legal obligations and enforcing our Terms of Service</li>
              </ul>
              
              <h2>3. How We Share Your Information</h2>
              <p>We may share your personal information in the following circumstances:</p>
              <ul>
                <li><strong>Between Users:</strong> When you buy or sell plants, we share necessary information (such as shipping address and contact details) with the other party to complete the transaction.</li>
                <li><strong>Service Providers:</strong> We share information with third-party service providers who help us operate our Service, including payment processors, cloud storage providers, analytics services, and customer support tools.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, legal process, or governmental request.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share information with third parties when you have given us your consent to do so.</li>
              </ul>
              <p>We do not sell your personal information to advertisers or other third parties.</p>
              
              <h2>4. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to keep your information, we consider:</p>
              <ul>
                <li>The need to maintain records for legal, financial, or compliance purposes</li>
                <li>The necessity of information for providing our Service and resolving disputes</li>
                <li>Whether you have an active account or ongoing transactions</li>
              </ul>
              <p>When you delete your account, we will delete or anonymize your personal information, except where retention is necessary for legal obligations or legitimate business purposes.</p>
              
              <h2>5. Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can update or correct inaccurate information in your account settings.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You can ask us to restrict the processing of your information in certain cases.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your information in a structured, machine-readable format.</li>
                <li><strong>Objection:</strong> You can object to the processing of your information in certain circumstances.</li>
              </ul>
              <p>To exercise these rights, please contact us at <a href="mailto:privacy@plantmarketplace.sk" className="text-green-600 hover:underline">privacy@plantmarketplace.sk</a>. We will respond to your request within 30 days.</p>
              
              <h3>Account Information</h3>
              <p>You can update your account information at any time by accessing your account settings on our Service. You can also delete your account, but note that some information may remain in our records after deletion to comply with legal obligations or for legitimate business purposes.</p>
              
              <h3>Communications</h3>
              <p>You can opt out of receiving marketing communications from us by following the unsubscribe instructions included in these messages or by adjusting your notification preferences in your account settings. Even if you opt out, you will still receive transactional messages related to your account and purchases.</p>
              
              <h3>Cookies</h3>
              <p>Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Service.</p>
              
              <h2>6. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures include:</p>
              <ul>
                <li>Encryption of sensitive information during transmission</li>
                <li>Secure storage of personal data in encrypted databases</li>
                <li>Regular security assessments and testing</li>
                <li>Access controls and authentication requirements</li>
                <li>Staff training on data protection and security practices</li>
              </ul>
              <p>While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.</p>
              
              <h2>7. International Data Transfers</h2>
              <p>Plant Marketplace is based in Slovakia and primarily operates within the European Union. However, some of our service providers may be located in other countries. When we transfer personal information outside the European Economic Area (EEA), we ensure that appropriate safeguards are in place to protect your information, such as:</p>
              <ul>
                <li>Using service providers in countries with adequate data protection laws as determined by the European Commission</li>
                <li>Implementing standard contractual clauses approved by the European Commission</li>
                <li>Relying on approved certification mechanisms or codes of conduct</li>
              </ul>
              
              <h2>8. Children's Privacy</h2>
              <p>Our Service is not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at <a href="mailto:privacy@plantmarketplace.sk" className="text-green-600 hover:underline">privacy@plantmarketplace.sk</a>. If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we will take steps to remove that information from our servers.</p>
              
              <h2>9. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              
              <h2>10. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
              <ul>
                <li>Email: <a href="mailto:privacy@plantmarketplace.sk" className="text-green-600 hover:underline">privacy@plantmarketplace.sk</a></li>
                <li>Address: Plant Marketplace s.r.o., Botanická 7, 841 04 Bratislava, Slovakia</li>
              </ul>
              <p>If you have a complaint about our data practices that we have not satisfactorily addressed, you may have the right to lodge a complaint with the Slovak Data Protection Authority (Úrad na ochranu osobných údajov Slovenskej republiky) or the data protection authority in your country of residence or workplace.</p>
              
              <h2>11. Legal Basis for Processing (EEA Users)</h2>
              <p>If you are located in the European Economic Area (EEA), we collect and process your personal information on the following legal bases:</p>
              <ul>
                <li><strong>Performance of a Contract:</strong> When we need to process your information to perform our contract with you (e.g., when you buy or sell plants, we need your shipping and payment information).</li>
                <li><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate interests, such as improving our Service, preventing fraud, and ensuring security, provided these interests are not overridden by your rights and freedoms.</li>
                <li><strong>Consent:</strong> When you have given us specific consent to process your information for a particular purpose (e.g., marketing communications).</li>
                <li><strong>Legal Obligation:</strong> When we need to comply with a legal obligation, such as keeping records for tax purposes or responding to legal requests.</li>
              </ul>
            </div>
          </div>
          
          {/* Related Links */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Related Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/terms">
                <a className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Terms of Service</h3>
                  <p className="text-gray-600 text-sm">Review our terms and conditions for using Plant Marketplace.</p>
                </a>
              </Link>
              
              <Link href="/help">
                <a className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Help Center</h3>
                  <p className="text-gray-600 text-sm">Find answers to frequently asked questions about our privacy practices.</p>
                </a>
              </Link>
              
              <Link href="/contact">
                <a className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Contact Us</h3>
                  <p className="text-gray-600 text-sm">Have questions about your data? Contact our privacy team directly.</p>
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