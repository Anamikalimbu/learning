import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { User, Heart, Calendar, Settings, LogOut } from 'lucide-react';
import MyBookings from '../components/MyBookings';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('bookings');

  const handleLogout = () => {
    dispatch(logout());
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white text-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-4xl font-bold shadow-inner mb-4 border-2 border-white/30">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-emerald-50 text-sm">{user?.email}</p>
                <div className="mt-3 inline-block px-3 py-1 bg-black/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {user?.role}
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        activeTab === tab.id 
                        ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 min-h-[500px]">
              
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500">Full Name</label>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-800">{user?.name}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500">Email Address</label>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-800">{user?.email}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500">Account Type</label>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-800">{user?.role}</div>
                    </div>
                  </div>
                  <button className="mt-8 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
                  <MyBookings />
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
                  <p className="text-gray-500">You haven't saved any destinations to your wishlist yet.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                  <p className="text-gray-500">Settings coming soon.</p>
                </div>
              )}
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
