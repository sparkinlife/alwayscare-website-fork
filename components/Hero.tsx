import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Phone, MapPin, AlertCircle, Navigation, Search, Filter, Map as MapIcon, FileText, Video, Camera, ArrowRight, Heart, UserPlus } from 'lucide-react';
import { AMBULANCE_DATA } from '../constants';

const Hero: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [dailyCases, setDailyCases] = useState<number | string>('...');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // Set today's date
  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
  }, []);

  // Filter logic
  const filteredAmbulances = useMemo(() => {
    return AMBULANCE_DATA.filter(amb => 
      amb.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (amb.area && amb.area.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  // Fetch daily cases
  useEffect(() => {
    fetch('https://api-alwayscare.arham.org/api/cases/today/summary')
      .then(res => res.json())
      .then(data => setDailyCases(data.total_cases))
      .catch(() => setDailyCases(142)); 
  }, []);

  // Initialize Map with loading state and error handling
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check for Leaflet with retry logic
    const initializeMap = () => {
      if (typeof (window as any).L === 'undefined') {
        return false;
      }

      const L = (window as any).L;

      if (mapInstanceRef.current) return true;

      try {
        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
          dragging: !L.Browser.mobile
        }).setView([20.5937, 78.9629], 5);

        if (L.Browser.mobile) {
          map.dragging.enable();
          map.tap?.enable();
        }

        mapInstanceRef.current = map;
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 20
        }).addTo(map);

        const createIcon = (isSelected: boolean) => L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background-color: ${isSelected ? '#b91c1c' : '#ef4444'};
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="${isSelected ? '18' : '14'}" height="${isSelected ? '18' : '14'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>`,
          iconSize: isSelected ? [36, 36] : [28, 28],
          iconAnchor: isSelected ? [18, 18] : [14, 14],
        });

        AMBULANCE_DATA.forEach(ambulance => {
          L.marker([ambulance.lat, ambulance.lng], { icon: createIcon(false) })
            .addTo(map)
            .bindPopup(`<b>${ambulance.city}</b><br>${ambulance.phone}`);
        });

        setMapStatus('ready');
        return true;
      } catch (error) {
        console.error('Failed to initialize map:', error);
        setMapStatus('error');
        return false;
      }
    };

    // Try to initialize immediately
    if (initializeMap()) return;

    // If Leaflet not loaded yet, retry with timeout
    let retryCount = 0;
    const maxRetries = 10;
    const retryInterval = setInterval(() => {
      retryCount++;
      if (initializeMap()) {
        clearInterval(retryInterval);
      } else if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        setMapStatus('error');
      }
    }, 500);

    return () => {
      clearInterval(retryInterval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const flyToLocation = (lat: number, lng: number, id: string) => {
    setSelectedAmbulanceId(id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 13, { animate: true, duration: 1.5 });
      mapInstanceRef.current.closePopup();
      
      // On mobile, scroll to map when an ambulance is selected
      if (window.innerWidth < 1024) {
        document.getElementById('ambulance-map-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Mock Data for "Live Rescue Feed" - Simulating your backend
  const liveCases = [
    { id: 2045, type: 'Fracture', animal: 'Stray Dog', location: 'Andheri, Mumbai', time: '10 min ago', status: 'Admitted' },
    { id: 2044, type: 'Viral Infection', animal: 'Calf', location: 'Gondal', time: '25 min ago', status: 'Treatment Started' },
    { id: 2043, type: 'Accident', animal: 'Cat', location: 'Vesu, Surat', time: '42 min ago', status: 'Ambulance dispatched' },
    { id: 2042, type: 'Dehydration', animal: 'Pigeon', location: 'Ahmedabad', time: '1 hr ago', status: 'Released' },
  ];

  return (
    <div id="home" className="relative bg-slate-50 flex flex-col pt-16 lg:pt-20 lg:h-screen lg:overflow-hidden">
      
      <div className="flex flex-col lg:flex-row w-full flex-1 lg:h-full">
        
        {/* LEFT COLUMN: Mission Control (Title, Stats, Live Feed) */}
        {/* Mobile: Natural scroll. Desktop: Internal scroll */}
        <div className="w-full lg:w-[45%] flex flex-col p-5 md:p-6 lg:p-8 bg-white z-20 shadow-xl lg:overflow-y-auto custom-scrollbar order-1">
          
          {/* 1. Header & Title */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
              <AlertCircle size={14} />
              <span>EMERGENCY RESPONSE</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-3">
              India's Free Animal <br /> <span className="text-red-600">Ambulance Network</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-lg">
              On call Free first-aid and treatment, for every injured street animal.
            </p>
          </div>

          {/* 2. Detailed Impact Stats Grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-8">
            
            {/* Card 1 */}
            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-28 md:h-32 hover:border-red-200 transition-colors">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider bg-slate-200/50 self-start px-2 py-0.5 rounded">{currentDate}</div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 my-1">
                {dailyCases === '...' ? (
                  <span className="inline-block w-16 h-8 bg-slate-200 rounded animate-pulse"></span>
                ) : (
                  dailyCases
                )}
              </div>
              <div className="text-xs text-slate-600 font-medium">Cases Treated Today</div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-28 md:h-32 hover:border-red-200 transition-colors">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">In Last 3 Years</div>
              <div className="text-2xl md:text-3xl font-black text-red-600 my-1">1.5 Lakh+</div>
              <div className="text-xs text-slate-600 font-medium">Lives Saved</div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-28 md:h-32 hover:border-red-200 transition-colors">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Across India</div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 my-1">43+</div>
              <div className="text-xs text-slate-600 font-medium">Ambulances & Clinics</div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-28 md:h-32 hover:border-red-200 transition-colors">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">On Ground Daily</div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 my-1">75+</div>
              <div className="text-xs text-slate-600 font-medium">Vets & Paravets</div>
            </div>

          </div>

          {/* 3. Live Cases Feed (Light Theme) */}
          <div className="flex-1 bg-amber-50/50 border border-amber-100 rounded-2xl p-4 md:p-5 mb-6 flex flex-col min-h-[220px] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2 text-slate-900 text-sm md:text-base">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Cases
              </h3>
              <span className="text-xs text-amber-700 bg-amber-100 border border-amber-200 px-2 py-1 rounded font-medium">Real-time Feed</span>
            </div>
            
            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1 max-h-[300px] lg:max-h-none">
              {liveCases.map((item) => (
                <div key={item.id} className="bg-white border border-slate-100 hover:border-red-200 p-3 rounded-xl transition-all shadow-sm cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        Case #{item.id}
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-normal whitespace-nowrap">{item.type}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{item.animal} • {item.location}</div>
                    </div>
                    <div className="text-xs font-medium text-slate-400 whitespace-nowrap ml-2">{item.time}</div>
                  </div>
                  {/* Simulated Media Icons */}
                  <div className="flex gap-2 mt-3 pt-2 border-t border-slate-50 overflow-x-auto scrollbar-hide">
                     <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors whitespace-nowrap">
                        <Camera size={12} className="text-slate-600" /> Photos
                     </div>
                     <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors whitespace-nowrap">
                        <Video size={12} className="text-slate-600" /> Video
                     </div>
                     <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 whitespace-nowrap">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {item.status}
                     </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-xs text-center text-slate-500 hover:text-red-600 font-medium flex items-center justify-center gap-1 transition-colors py-2">
              View All 150+ Daily Cases <ArrowRight size={12} />
            </button>
          </div>

          {/* 4. Action Buttons (Donate + Volunteer) */}
          {/* Stack on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
             <a href="#donate" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 md:py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all text-sm md:text-base">
                <Heart size={18} className="fill-current" />
                Donate Now
             </a>
             <a href="#volunteer" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 md:py-3.5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all text-sm md:text-base">
                <UserPlus size={18} />
                Join as Volunteer
             </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Map + List */}
        <div id="ambulance-map-col" className="w-full lg:w-[55%] relative bg-slate-100 flex flex-col lg:block order-2">
           
           {/* The Map Container */}
           <div
             id="ambulance-map-container"
             className="w-full h-[380px] lg:h-full z-0 shrink-0 shadow-md lg:shadow-none relative"
           >
             <div ref={mapContainerRef} className="w-full h-full" />

             {/* Map Loading State */}
             {mapStatus === 'loading' && (
               <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center z-10">
                 <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-600 font-medium">Loading map...</p>
               </div>
             )}

             {/* Map Error State */}
             {mapStatus === 'error' && (
               <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center z-10 p-6 text-center">
                 <MapPin className="w-16 h-16 text-slate-300 mb-4" />
                 <p className="text-slate-700 font-bold text-lg mb-2">Map Unavailable</p>
                 <p className="text-slate-500 text-sm mb-4">Please use the list below to find an ambulance near you.</p>
                 <button
                   onClick={() => window.location.reload()}
                   className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                 >
                   Try Again
                 </button>
               </div>
             )}
           </div>

           {/* Desktop Floating List (Hidden on Mobile) */}
           <div className="absolute top-4 left-4 bottom-4 w-[340px] bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl z-[400] flex flex-col border border-slate-200 hidden lg:flex">
              
              {/* List Header */}
              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search city or area..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 text-xs font-semibold py-1.5 bg-slate-900 text-white rounded-md shadow-sm">Ambulance</button>
                  <button className="flex-1 text-xs font-semibold py-1.5 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-md border border-slate-200">Clinics</button>
                </div>
              </div>

              {/* List Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {filteredAmbulances.map(amb => (
                  <div 
                    key={amb.id}
                    onClick={() => flyToLocation(amb.lat, amb.lng, amb.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAmbulanceId === amb.id 
                      ? 'bg-red-50 border-red-200 ring-1 ring-red-200' 
                      : 'bg-white border-slate-100 hover:border-red-200 hover:bg-slate-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{amb.city}</h4>
                        <div className="text-xs text-slate-500 mt-0.5">{amb.area || amb.state}</div>
                      </div>
                      <a href={`tel:${amb.phone.replace(/\s/g, '')}`} className="bg-red-100 p-1.5 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                        <Phone size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Mobile List Section (Visible only on Mobile) */}
           <div className="lg:hidden flex flex-col bg-slate-100 border-t border-slate-200">
              
              {/* Filter/Search Bar for Mobile - Fixed top relative to this section */}
              <div className="p-4 pb-2 bg-slate-100 z-10 sticky top-0">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search city (e.g. Surat)" 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Cards List - Internally Scrollable */}
              <div className="px-4 pb-8 overflow-y-auto custom-scrollbar max-h-[65vh]">
                 <div className="space-y-4">
                     {filteredAmbulances.map(amb => (
                        <div 
                           key={amb.id} 
                           className={`bg-white p-4 rounded-xl shadow-sm border ${selectedAmbulanceId === amb.id ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'}`}
                        >
                           <div className="flex justify-between items-start mb-3">
                              <div>
                                 <h3 className="font-bold text-lg text-slate-900">{amb.city} Ambulance</h3>
                                 <p className="text-slate-500 text-sm mt-0.5">+91 {amb.phone}</p>
                              </div>
                              <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                 ACTIVE
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-3">
                              <button 
                                 onClick={() => flyToLocation(amb.lat, amb.lng, amb.id)}
                                 className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                              >
                                 <MapIcon size={16} />
                                 Show on Map
                              </button>
                              <a 
                                 href={`tel:${amb.phone.replace(/\s/g, '')}`} 
                                 className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
                              >
                                 <Phone size={16} className="fill-current" />
                                 Call Now
                              </a>
                           </div>
                        </div>
                     ))}
                     {filteredAmbulances.length === 0 && (
                        <div className="text-center py-8 text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                           <p>No ambulances found matching "{searchTerm}"</p>
                        </div>
                     )}
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
