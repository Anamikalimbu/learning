import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDestination, clearDestination } from '../features/destinations/destinationSlice';
import { toggleWishlist } from '../features/auth/authSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Compass, ArrowLeft, Loader2, Star, CheckCircle2, Heart, MessageSquare } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import api from '../services/api';

const DestinationDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const { destination, isLoading, isError, message } = useSelector(
    (state) => state.destination
  );
  const { user } = useSelector((state) => state.auth);

  const isWishlisted = user?.wishlist?.includes(id);

  const handleWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(toggleWishlist(id));
  };

  useEffect(() => {
    dispatch(getDestination(id));
    
    // Fetch reviews
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/destinations/${id}/reviews`);
        setReviews(res.data.data);
      } catch (err) {
        console.error("Failed to fetch reviews");
      }
    };
    fetchReviews();

    return () => {
      dispatch(clearDestination());
    };
  }, [dispatch, id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError('');
    try {
      const res = await api.post(`/destinations/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment
      });
      // Add new review to state
      setReviews([...reviews, { ...res.data.data, user: { name: user.name } }]);
      setReviewComment('');
      setReviewRating(5);
    } catch (err) {
      setReviewError(err.response?.data?.error || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (isLoading || !destination) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="animate-spin text-emerald-500" size={64} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <Link to="/destinations" className="text-emerald-600 hover:underline">Back to Destinations</Link>
        </div>
      </div>
    );
  }

  const bgImage = destination.images?.length > 0 ? `/api${destination.images[0]}` : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
        </div>
        
        {/* Nav */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
          <Link to="/destinations" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 w-full p-6 md:p-12 z-20">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-bold tracking-wider uppercase mb-4 shadow-lg shadow-emerald-500/30">
              {destination.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-xl">{destination.name}</h1>
            <div className="flex flex-wrap items-center text-gray-200 gap-4 mt-4 font-medium text-lg">
              <span className="flex items-center"><MapPin size={20} className="mr-1 text-emerald-400" /> {destination.province} Province</span>
              {destination.bestSeason && (
                <span className="flex items-center"><Calendar size={20} className="mr-1 text-teal-400" /> {destination.bestSeason}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-30">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-10 border border-gray-100 flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Details */}
          <div className="flex-1 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Compass className="mr-2 text-emerald-500" /> Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">{destination.description}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.attractions?.length > 0 && (
                <section className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Key Attractions</h3>
                  <ul className="space-y-3">
                    {destination.attractions.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <Star className="text-amber-400 mr-2 shrink-0 mt-0.5" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {destination.activities?.length > 0 && (
                <section className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100/50">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Top Activities</h3>
                  <ul className="space-y-3">
                    {destination.activities.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <CheckCircle2 className="text-teal-500 mr-2 shrink-0 mt-0.5" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Map Preview */}
            {destination.lat && destination.lng && (
              <section className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="mr-2 text-emerald-500" /> Location Map
                </h3>
                <InteractiveMap 
                  destinations={[destination]} 
                  singleMode={true} 
                  center={[destination.lat, destination.lng]} 
                  zoom={10} 
                />
              </section>
            )}

            {/* Reviews Section */}
            <section className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare className="mr-2 text-emerald-500" /> Traveler Reviews ({reviews.length})
              </h3>
              
              <div className="space-y-6 mb-8">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map(review => (
                    <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800">{review.user?.name || 'Anonymous User'}</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {user ? (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4">Leave a Review</h4>
                  {reviewError && <div className="text-red-500 text-sm mb-4">{reviewError}</div>}
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select 
                        value={reviewRating} 
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Experience</label>
                      <textarea 
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows="3" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Tell us about your trip..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={reviewLoading}
                      className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70"
                    >
                      {reviewLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <p className="text-amber-800 font-medium">Please log in to leave a review.</p>
                  <Link to="/login" className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold text-sm hover:bg-amber-700">Login</Link>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Action / Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Plan Your Trip</h3>
                <p className="text-sm text-gray-500 mb-6">Add this destination to your itinerary or wishlist.</p>
                
                <div className="space-y-3">
                  <button 
                    onClick={handleWishlist}
                    className={`w-full py-3 px-4 font-bold rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                      isWishlisted 
                      ? 'bg-rose-50 text-rose-500 border border-rose-200 hover:bg-rose-100' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
                    {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold rounded-xl shadow-sm transition-all duration-300">
                    Find Tours Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
