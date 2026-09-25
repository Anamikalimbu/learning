import { useEffect, useState } from 'react';
import api from '../services/api';
import { MapPin, Home, BedDouble, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleBookClick = (hotel) => {
    setSelectedHotel(hotel);
    setBookingModalOpen(true);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get('/hotels');
        setHotels(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Stays & Accommodations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect place to rest during your Nepalese adventure, from luxury resorts to cozy teahouses.
          </p>
        </div>
        
        {isLoading ? (
          <div className="py-8">
            <SkeletonLoader count={6} />
          </div>
        ) : hotels.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              icon={Home}
              title="No Hotels Found"
              message="We couldn't find any accommodations at the moment. Please check back later."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={hotel._id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={hotel.images?.length > 0 ? `/api${hotel.images[0]}` : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'} 
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                    From ${hotel.pricePerNight}/night
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-3 font-medium">
                    <MapPin size={14} className="mr-1 text-emerald-500" />
                    {hotel.destination?.name || 'Unknown Location'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{hotel.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center text-sm text-gray-600 font-medium">
                      <BedDouble size={16} className="mr-1.5 text-gray-400" />
                      {hotel.rooms?.length || 0} Room Types
                    </div>
                    {hotel.amenities?.length > 0 && (
                      <div className="flex gap-1">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleBookClick(hotel)}
                    className="w-full mt-5 py-3.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold rounded-xl transition-colors duration-300"
                  >
                    Book Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedHotel && (
        <BookingForm 
          isOpen={bookingModalOpen} 
          onClose={() => setBookingModalOpen(false)} 
          item={selectedHotel} 
          itemType="Hotel" 
        />
      )}
    </div>
  );
};

export default Hotels;
