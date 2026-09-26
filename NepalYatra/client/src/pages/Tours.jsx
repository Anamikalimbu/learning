import { useEffect, useState } from 'react';
import api from '../services/api';
import { Calendar, MapPin, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import SkeletonLoader from '../components/SkeletonLoader';
import TourCard from '../components/TourCard';
import EmptyState from '../components/EmptyState';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const handleBookClick = (tour) => {
    setSelectedTour(tour);
    setBookingModalOpen(true);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get('/tours');
        setTours(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Featured Tours & Treks</h1>
        
        {isLoading ? (
          <div className="py-8">
            <SkeletonLoader count={6} />
          </div>
        ) : tours.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              icon={Activity}
              title="No Tours Found"
              message="We couldn't find any tours at the moment. Please check back later."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <TourCard key={tour._id} tour={tour} index={index} onBook={handleBookClick} />
            ))}
          </div>
        )}
      </div>

      {selectedTour && (
        <BookingForm 
          isOpen={bookingModalOpen} 
          onClose={() => setBookingModalOpen(false)} 
          item={selectedTour} 
          itemType="Tour" 
        />
      )}
    </div>
  );
};

export default Tours;
