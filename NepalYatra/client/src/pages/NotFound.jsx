import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 drop-shadow-sm">
            404
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Looks like you're lost!</h2>
          <p className="mt-2 text-md text-gray-600">
            The page you're looking for has wandered off into the Himalayas.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-1"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            to="/destinations"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 border border-emerald-200 text-base font-medium rounded-full text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all transform hover:-translate-y-1"
          >
            <Compass size={18} />
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
