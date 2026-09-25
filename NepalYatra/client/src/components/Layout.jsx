import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
