import { MapPin, Calendar, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const TourCard = ({ tour, index, onBook }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
    >
      <div className="h-56 overflow-hidden relative">
        <img 
          src={tour.images?.length > 0 ? `/api${tour.images[0]}` : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop'} 
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
          ${tour.price}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-gray-500 mb-2 font-medium">
          <MapPin size={14} className="mr-1 text-emerald-500" />
          {tour.destination?.name || 'Unknown Destination'}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">{tour.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{tour.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <Calendar size={16} className="mr-1 text-gray-400" />
            {tour.duration} Days
          </div>
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <Activity size={16} className="mr-1 text-gray-400" />
            {tour.difficulty}
          </div>
        </div>
        
        <button 
          onClick={() => onBook(tour)}
          className="w-full mt-4 py-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold rounded-xl transition-colors duration-300"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default TourCard;
