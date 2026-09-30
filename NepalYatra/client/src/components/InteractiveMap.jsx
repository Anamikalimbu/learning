import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix for default marker icon in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const InteractiveMap = ({ destinations = [], singleMode = false, center = [28.3949, 84.1240], zoom = 7 }) => {
  return (
    <div className={`w-full ${singleMode ? 'h-[300px]' : 'h-[400px] md:h-[600px]'} rounded-2xl overflow-hidden shadow-sm border border-gray-100 z-0`}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={!singleMode}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {destinations.map(dest => {
          if (!dest.lat || !dest.lng) return null;
          
          return (
            <Marker key={dest._id} position={[dest.lat, dest.lng]}>
              <Popup className="custom-popup">
                <div className="w-48 overflow-hidden rounded-lg">
                  <div className="h-24 overflow-hidden relative">
                    <img 
                      src={dest.images?.length > 0 ? `/api${dest.images[0]}` : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop'} 
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{dest.name}</h4>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin size={10} className="mr-1 text-emerald-500" />
                      {dest.province}
                    </div>
                    {!singleMode && (
                      <Link 
                        to={`/destinations/${dest._id}`}
                        className="block w-full text-center py-1.5 bg-emerald-50 text-emerald-600 rounded text-xs font-semibold hover:bg-emerald-100 transition-colors"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
