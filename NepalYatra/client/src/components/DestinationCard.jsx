import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/destinations/${destination._id}`} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
          <div className="h-48 overflow-hidden relative">
            <img 
              src={destination.images?.length > 0 ? `/api${destination.images[0]}` : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop'} 
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
              {destination.category}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center text-gray-500 text-xs mb-2 font-medium">
              <MapPin size={14} className="mr-1 text-emerald-500" />
              {destination.province} Province
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">{destination.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{destination.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
