import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Tours from './pages/Tours';
import Hotels from './pages/Hotels';
import ProtectedRoute from './components/ProtectedRoute';
import { logout } from './features/auth/authSlice';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Public Routes */}
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetails />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/hotels" element={<Hotels />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
