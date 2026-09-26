import { useState } from 'react';
import { X, Calendar as CalendarIcon, Users, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookingForm = ({ isOpen, onClose, item, itemType }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [travelers, setTravelers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  if (!isOpen) return null;

  const price = itemType === 'Hotel' ? item.pricePerNight : item.price;
  const days = itemType === 'Hotel' 
    ? Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)))
    : 1; // Assuming tours are fixed price per person
  
  const totalPrice = price * travelers * days;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to make a booking');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        itemModel: itemType,
        item: item._id,
        provider: item.provider || item.createdBy || '60d0fe4f5311236168a109ca', // fallback for demo
        startDate,
        endDate: itemType === 'Hotel' ? endDate : undefined,
        travelers,
        totalPrice
      };

      await api.post('/bookings', payload);
      toast.success('Booking confirmed successfully!');
      onClose();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-1">Book Your Trip</h2>
              <p className="text-emerald-50 text-sm">{item.name || item.title}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleBooking} className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <CalendarIcon size={16} className="text-emerald-500" />
                    Start Date
                  </label>
                  <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-800"
                  />
                </div>

                {itemType === 'Hotel' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <CalendarIcon size={16} className="text-emerald-500" />
                      End Date
                    </label>
                    <DatePicker 
                      selected={endDate} 
                      onChange={(date) => setEndDate(date)}
                      minDate={startDate}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-800"
                    />
                  </div>
                )}

                <div className={`space-y-2 ${itemType !== 'Hotel' ? 'sm:col-span-2' : ''}`}>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users size={16} className="text-emerald-500" />
                    Guests
                  </label>
                  <select 
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-800"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard size={16} className="text-emerald-500" />
                  Price Summary
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>${price} x {travelers} guests {itemType === 'Hotel' && `x ${days} nights`}</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-200 text-lg">
                    <span>Total</span>
                    <span className="text-emerald-600">${totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:from-emerald-500 hover:to-teal-400 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;
