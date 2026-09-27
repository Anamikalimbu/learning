import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDestinations } from '../features/destinations/destinationSlice';
import { Link } from 'react-router-dom';
import { MapPin, Filter, Search, LayoutGrid, Map as MapIcon, X } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import { AnimatePresence, motion } from 'framer-motion';
import SkeletonLoader from '../components/SkeletonLoader';
import DestinationCard from '../components/DestinationCard';
import EmptyState from '../components/EmptyState';

const Destinations = () => {
  const dispatch = useDispatch();
  const { destinations, isLoading, isError, message } = useSelector(
    (state) => state.destination
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const provinces = ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'];
  const categories = ['Trekking', 'Heritage', 'Wildlife', 'Adventure', 'Leisure'];

  useEffect(() => {
    let query = '?';
    if (selectedProvince) query += `province=${selectedProvince}&`;
    if (selectedCategory) query += `category=${selectedCategory}&`;
    
    // Add debounced search term
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        query += `keyword=${searchTerm}&`;
      }
      dispatch(getDestinations(query));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, selectedProvince, selectedCategory, searchTerm]);

  // Remove local filtering
  const filteredDestinations = destinations;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight">
            Discover Nepal
          </h1>
          <p className="text-xl text-gray-200 mb-8 font-light drop-shadow-md">
            From the highest peaks to the deepest jungles.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex items-center border border-white/20 shadow-2xl">
            <div className="pl-4 text-white/70">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search destinations (e.g., Everest, Pokhara)..." 
              className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-white/60 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">
              {filteredDestinations.length} Destinations
            </h2>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-medium"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Sidebar Filters */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-lg">
                <Filter size={20} className="text-emerald-500" />
                Filters
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedCategory('')}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === '' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Province</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedProvince('')}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedProvince === '' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      All Provinces
                    </button>
                    {provinces.map(prov => (
                      <button 
                        key={prov}
                        onClick={() => setSelectedProvince(prov)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedProvince === prov ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="fixed inset-0 z-50 flex md:hidden"
              >
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFiltersOpen(false)}></div>
                <div className="relative w-[80%] max-w-sm bg-white h-full overflow-y-auto p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                      <Filter size={20} className="text-emerald-500" />
                      Filters
                    </div>
                    <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-800 p-2">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
                      <div className="space-y-2">
                        <button 
                          onClick={() => { setSelectedCategory(''); setIsMobileFiltersOpen(false); }}
                          className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${selectedCategory === '' ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
                        >
                          All Categories
                        </button>
                        {categories.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setIsMobileFiltersOpen(false); }}
                            className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${selectedCategory === cat ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Province</h3>
                      <div className="space-y-2">
                        <button 
                          onClick={() => { setSelectedProvince(''); setIsMobileFiltersOpen(false); }}
                          className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${selectedProvince === '' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
                        >
                          All Provinces
                        </button>
                        {provinces.map(prov => (
                          <button 
                            key={prov}
                            onClick={() => { setSelectedProvince(prov); setIsMobileFiltersOpen(false); }}
                            className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${selectedProvince === prov ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
                          >
                            {prov}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="flex-1">
            {/* View Toggle */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredDestinations.length} Destinations Found
              </h2>
              <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LayoutGrid size={16} className="mr-2" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <MapIcon size={16} className="mr-2" />
                  Map
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="py-4">
                <SkeletonLoader count={6} />
              </div>
            ) : isError ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center">
                <p className="font-semibold">Failed to load destinations</p>
                <p className="text-sm mt-1">{message}</p>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="py-12">
                <EmptyState 
                  icon={Filter}
                  title="No destinations found"
                  message="Try adjusting your filters or search term."
                  actionText="Clear Filters"
                  onAction={() => { setSearchTerm(''); setSelectedCategory(''); setSelectedProvince(''); }}
                />
              </div>
            ) : viewMode === 'map' ? (
              <InteractiveMap destinations={filteredDestinations} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((dest, index) => (
                  <DestinationCard key={dest._id} destination={dest} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
