import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">PlantMarket</h3>
            <p className="text-gray-400 mb-4">
              Your trusted platform for buying and selling plants online.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.84.5C10.41.5,9.25,3,9.25,5.32v2.15h-3v4h3v12h5.25v-12h3.49Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.55,6.2a8.82,8.82,0,0,0-2.14-2.18A10.43,10.43,0,0,0,18.17,2.6c-2.63-.49-5.27-.51-7.9,0A10.22,10.22,0,0,0,7,4a9,9,0,0,0-2.15,2.2A9.15,9.15,0,0,0,2.8,8.56,15.53,15.53,0,0,0,2,14.18v.37a15.59,15.59,0,0,0,.8,5.25,9.11,9.11,0,0,0,2.05,2.34A9,9,0,0,0,7,24.27a10.09,10.09,0,0,0,3.3,1.36,21.75,21.75,0,0,0,7.9,0A10.24,10.24,0,0,0,21.47,24a8.91,8.91,0,0,0,2.13-2.22,9.25,9.25,0,0,0,2-5.59,15.59,15.59,0,0,0,.8-5.25v-.37A15.73,15.73,0,0,0,25.6,6.2ZM19.83,14.56l-4.12,2.39a.66.66,0,0,1-1-.57V9.4a.65.65,0,0,1,1-.57l4.12,2.39A.68.68,0,0,1,19.83,14.56Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.2A9.8,9.8,0,0,0,8.93,21.48h0a9.8,9.8,0,0,0,6.14,0h0A9.8,9.8,0,0,0,12,2.2Zm5.83,15.28a8.4,8.4,0,0,1-1.24,1.55h0a8.61,8.61,0,0,1-9.18,0h0a8.4,8.4,0,0,1-1.24-1.55,7.79,7.79,0,0,1,1.47-10.66,7.4,7.4,0,0,1,8.72,0A7.79,7.79,0,0,1,17.83,17.48Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace">
                  <a className="text-gray-400 hover:text-white">Browse Plants</a>
                </Link>
              </li>
              <li>
                <Link href="/sellers">
                  <a className="text-gray-400 hover:text-white">Find Sellers</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <a className="text-gray-400 hover:text-white">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-white">Blog</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq">
                  <a className="text-gray-400 hover:text-white">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="text-gray-400 hover:text-white">Shipping Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="text-gray-400 hover:text-white">Returns & Refunds</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new plants and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PlantMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 