import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">
                NY
              </div>
              <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight">
                NepalYatra
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover the beauty of Nepal. From the highest peaks of the Himalayas to the deepest jungles of Chitwan, your ultimate journey begins here.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-500 rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/destinations" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> Destinations</Link></li>
              <li><Link to="/tours" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> Tours & Treks</Link></li>
              <li><Link to="/hotels" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> Hotels</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-500 rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><span className="text-emerald-500 text-xs">▶</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-500 rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span className="text-sm">Thamel, Kathmandu<br />Bagmati Province, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-emerald-500 shrink-0" />
                <span className="text-sm">+977 1-4567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-emerald-500 shrink-0" />
                <span className="text-sm">namaste@nepalyatra.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} NepalYatra. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">Made with <span className="text-red-500">♥</span> in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
