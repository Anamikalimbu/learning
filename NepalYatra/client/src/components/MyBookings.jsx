import { useEffect, useState } from 'react';
import api from '../services/api';
import { Loader2, Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle, Home, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my');
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold"><CheckCircle size={12} /> Confirmed</span>;
      case 'Cancelled':
        return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold"><Clock size={12} /> Pending</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-64 items-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="text-gray-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
        <p className="text-gray-500 text-md">You haven't booked any tours or hotels yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking, index) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          key={booking._id} 
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
            {booking.itemModel === 'Hotel' ? <Home className="text-emerald-500" size={28} /> : <Compass className="text-emerald-500" size={28} />}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{booking.itemModel}</span>
              {getStatusBadge(booking.status)}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.item?.name || booking.item?.title || 'Unknown Item'}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-emerald-500" />
                {new Date(booking.startDate).toLocaleDateString()} {booking.itemModel === 'Hotel' && `- ${new Date(booking.endDate).toLocaleDateString()}`}
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} className="text-emerald-500" />
                {booking.travelers} Guests
              </div>
            </div>
          </div>
          
          <div className="text-left md:text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 mt-2 md:mt-0">
            <div className="text-sm text-gray-500 mb-1">Total Price</div>
            <div className="text-2xl font-bold text-emerald-600">${booking.totalPrice}</div>
            <div className="text-xs text-gray-400 mt-1">Booked on {new Date(booking.createdAt).toLocaleDateString()}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Users wasn't imported in lucide-react above, adding it via another component or just fix import
import { Users } from 'lucide-react';
export default MyBookings;
