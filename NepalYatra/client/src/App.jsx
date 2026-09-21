import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Tours from './pages/Tours';
import ProtectedRoute from './components/ProtectedRoute';
import { logout } from './features/auth/authSlice';

// A simple dashboard component for MVP phase 1
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white">
          <h1 className="text-3xl font-bold">Welcome to NepalYatra</h1>
          <p className="opacity-80 mt-2">Your journey begins here.</p>
        </div>
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl uppercase">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                Role: {user?.role}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Public Routes */}
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/tours" element={<Tours />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
