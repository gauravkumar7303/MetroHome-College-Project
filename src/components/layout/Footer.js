import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-3xl font-bold text-green-500">MetroHome</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Finder</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's most trusted property portal for West Delhi and Gurugram. 
              Find verified properties directly from owners with zero brokerage.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-green-500">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/add-property" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Our Agents
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Blog & News
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-green-500">Property Types</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties?type=pg" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  PG Accommodations
                </Link>
              </li>
              <li>
                <Link href="/properties?type=flat" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Flats & Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=house" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Independent Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=villa" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=commercial" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/properties?type=land" className="text-gray-400 hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3"></span>
                  Plots & Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-green-500">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  B-123, Rajouri Garden,<br />
                  West Delhi - 110027
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-green-500 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-green-500 flex-shrink-0" />
                <span className="text-gray-400">support@metrohome.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-green-500 flex-shrink-0" />
                <span className="text-gray-400">Mon-Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>

            {/* App Download Buttons */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Download our app:</p>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg flex items-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 9.7l-9.2-5.3c-.9-.5-2-.5-2.9 0l9.2 5.3c.9.5 2 .5 2.9 0zM20.1 8.5c-.4-.3-.9-.5-1.4-.5H5.3c-.5 0-1 .2-1.4.5L12 13.1l8.1-4.6zM5.3 15.5c-.5 0-1-.2-1.4-.5V9.7l7.7 4.4 7.7-4.4v5.3c0 .5-.2 1-.5 1.4l-8.1-4.6-8.1 4.6c.4.3.9.5 1.4.5h13.3c.5 0 1-.2 1.4-.5L12 10.9l-8.1 4.6z"/>
                  </svg>
                  <span className="text-xs">Google Play</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg flex items-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.7 10.8c-.3-1.4-.9-2.6-1.8-3.6-.9-.9-2.1-1.5-3.4-1.7-.4-.1-.8-.1-1.2-.1-.4 0-.8 0-1.2.1-1.3.2-2.5.8-3.4 1.7-.9.9-1.5 2.1-1.7 3.4-.1.4-.1.8-.1 1.2 0 .4 0 .8.1 1.2.2 1.3.8 2.5 1.7 3.4.9.9 2.1 1.5 3.4 1.7.4.1.8.1 1.2.1.4 0 .8 0 1.2-.1 1.3-.2 2.5-.8 3.4-1.7.9-.9 1.5-2.1 1.7-3.4.1-.4.1-.8.1-1.2 0-.4 0-.8-.1-1.2z"/>
                  </svg>
                  <span className="text-xs">App Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MetroHome Finder. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}