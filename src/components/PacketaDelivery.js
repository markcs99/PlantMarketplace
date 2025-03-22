import { useState, useEffect, useRef } from 'react';

/**
 * PacketaDelivery component for selecting pickup points
 * 
 * @param {Object} props
 * @param {Function} props.onSelect - Callback when a pickup point is selected
 * @param {Object} props.selectedPoint - Currently selected pickup point
 * @param {string} props.country - Country for filtering pickup points (default: Slovakia)
 */
export default function PacketaDelivery({ onSelect, selectedPoint, country = 'Slovakia' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pickupPoints, setPickupPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('list'); // 'list' or 'map'
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Mock function to initialize the map
  const initMap = () => {
    if (!mapRef.current || !pickupPoints.length || mapLoaded) return;
    
    // In a real implementation, this would use the Google Maps or Leaflet API
    // For demonstration purposes, we'll create a mock map
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = `
      <div class="relative w-full h-full">
        <img src="https://maps.googleapis.com/maps/api/staticmap?center=Bratislava,Slovakia&zoom=12&size=600x400&maptype=roadmap&markers=color:red|Bratislava,Slovakia&key=YOUR_API_KEY" 
             class="w-full h-full object-cover" 
             alt="Map of pickup points" />
        
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div class="text-center p-4 bg-white text-black rounded-lg shadow-lg">
            <p class="font-medium">Map View</p>
            <p class="text-sm text-gray-600 mt-1">Mock map for demonstration purposes</p>
            <p class="text-sm text-gray-600 mt-3">In a real application, this would be an interactive map with:</p>
            <ul class="text-xs text-left mt-2 list-disc pl-5">
              <li>Markers for each Packeta location</li>
              <li>Click functionality to select pickup points</li>
              <li>Location search and geolocation features</li>
              <li>Detailed information about each point</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    
    setMapLoaded(true);
  };

  // Mock pickup points data - in a real app, this would come from Packeta API
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call to get pickup points
    setTimeout(() => {
      const mockPoints = [
        {
          id: 'zp-001',
          name: 'Packeta Point - Aupark Shopping Center',
          address: 'Einsteinova 18, 851 01 Bratislava',
          city: 'Bratislava',
          zipCode: '85101',
          openingHours: 'Mon-Sun: 9:00-21:00',
          photo: 'https://images.unsplash.com/photo-1625680743768-4b671ded9531?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 48.133,
            lng: 17.111
          }
        },
        {
          id: 'zp-002',
          name: 'Packeta Point - OC Central',
          address: 'Metodova 6, 821 08 Bratislava',
          city: 'Bratislava',
          zipCode: '82108',
          openingHours: 'Mon-Fri: 9:00-20:00, Sat: 9:00-18:00, Sun: 10:00-18:00',
          photo: 'https://images.unsplash.com/photo-1673273649591-1146a54a73a7?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 48.155,
            lng: 17.118
          }
        },
        {
          id: 'zp-003',
          name: 'Packeta Point - OC Eurovea',
          address: 'Pribinova 8, 811 09 Bratislava',
          city: 'Bratislava',
          zipCode: '81109',
          openingHours: 'Mon-Sun: 9:00-21:00',
          photo: 'https://images.unsplash.com/photo-1620507930191-fe85217e8d41?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 48.142,
            lng: 17.126
          }
        },
        {
          id: 'zp-004',
          name: 'Packeta Point - OC Optima',
          address: 'Moldavská cesta 32, 040 11 Košice',
          city: 'Košice',
          zipCode: '04011',
          openingHours: 'Mon-Sun: 9:00-21:00',
          photo: 'https://images.unsplash.com/photo-1614310529331-ebb24b822fdc?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 48.716,
            lng: 21.258
          }
        },
        {
          id: 'zp-005',
          name: 'Packeta Point - žilina',
          address: 'Národná 8, 010 01 žilina',
          city: 'žilina',
          zipCode: '01001',
          openingHours: 'Mon-Fri: 8:00-20:00, Sat: 9:00-17:00',
          photo: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 49.224,
            lng: 18.739
          }
        },
        {
          id: 'zp-006',
          name: 'Packeta Point - Nitra',
          address: 'Akademická 1, 949 01 Nitra',
          city: 'Nitra',
          zipCode: '94901',
          openingHours: 'Mon-Fri: 9:00-18:00, Sat: 9:00-12:00',
          photo: 'https://images.unsplash.com/photo-1686485390043-daabc2819a6f?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 48.306,
            lng: 18.086
          }
        },
        {
          id: 'zp-007',
          name: 'Packeta Point - Banská Bystrica',
          address: 'Námestie SNP 27, 974 01 Banská Bystrica',
          city: 'Banská Bystrica',
          zipCode: '97401',
          openingHours: 'Mon-Fri: 8:00-18:00, Sat: 8:00-12:00',
          photo: 'https://images.unsplash.com/photo-1493799817216-4b57dda4229f?q=80&w=687&auto=format&fit=crop',
          coordinates: {
            lat: 48.736,
            lng: 19.146
          }
        }
      ];
      
      setPickupPoints(mockPoints);
      setFilteredPoints(mockPoints);
      setLoading(false);
    }, 800);
  }, []);

  // Initialize map when active view changes to map
  useEffect(() => {
    if (activeView === 'map') {
      initMap();
    }
  }, [activeView, pickupPoints]);

  // Filter pickup points based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPoints(pickupPoints);
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = pickupPoints.filter(point => 
        point.name.toLowerCase().includes(term) || 
        point.address.toLowerCase().includes(term) || 
        point.city.toLowerCase().includes(term) || 
        point.zipCode.includes(term)
      );
      setFilteredPoints(filtered);
    }
  }, [searchTerm, pickupPoints]);

  // Handle selecting a pickup point
  const handleSelectPoint = (point) => {
    onSelect(point);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Packeta Pickup Location</h3>
        
        {selectedPoint ? (
          <div className="border rounded-md p-3 bg-white cursor-pointer hover:border-yellow-500 transition-colors" onClick={() => setIsOpen(true)}>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                <img 
                  src={selectedPoint.photo} 
                  alt={selectedPoint.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64/F9A825/FFFFFF?text=Packeta';
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{selectedPoint.name}</p>
                <p className="text-sm text-gray-600 mb-1">{selectedPoint.address}</p>
                <p className="text-xs text-gray-500">{selectedPoint.openingHours}</p>
              </div>
              <div className="ml-2 text-yellow-600">
                <span className="text-sm font-medium">Change</span>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white text-left hover:border-yellow-500 transition-colors flex justify-between items-center"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center">
              <div className="mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="3" fill="#F9A825" />
                  <path d="M4 12H20M12 4V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-gray-700">Select Packeta Pickup Point</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium">Select Packeta Pickup Point</h2>
              <button 
                type="button" 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by city, address or ZIP code"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* View toggle */}
              <div className="mt-4 flex border rounded-md overflow-hidden">
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${activeView === 'list' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setActiveView('list')}
                >
                  List View
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${activeView === 'map' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setActiveView('map')}
                >
                  Map View
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <svg className="animate-spin h-6 w-6 text-yellow-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading pickup points...</span>
                </div>
              ) : filteredPoints.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No pickup points found. Try a different search term.</p>
                </div>
              ) : activeView === 'list' ? (
                <ul className="divide-y divide-gray-200 overflow-y-auto max-h-[50vh]">
                  {filteredPoints.map((point) => (
                    <li 
                      key={point.id} 
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleSelectPoint(point)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                          <img 
                            src={point.photo} 
                            alt={point.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64x64/F9A825/FFFFFF?text=Packeta';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{point.name}</p>
                          <p className="text-sm text-gray-600 mb-1">{point.address}</p>
                          <p className="text-xs text-gray-500">{point.openingHours}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-96" ref={mapRef}></div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end">
              <button 
                type="button" 
                className="text-gray-600 hover:text-gray-800 mr-4"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 