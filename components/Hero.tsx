import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Sparkles, Search, Map as MapIcon, ArrowRight, Heart, UserPlus } from 'lucide-react';
import { AMBULANCE_DATA, CLINIC_DATA } from '../constants';
import { LiveCase } from '../types';
import { useLiveCases } from '../hooks/useLiveCases';
import CaseCard from './CaseCard';
import CaseModal from './CaseModal';

// Animated count-up hook for stat numbers
function useCountUp(end: number, duration = 1500, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  return value;
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const Hero: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const userMarkerRef = useRef<any>(null);
  const [dailyCases, setDailyCases] = useState<number | string>('...');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeTab, setActiveTab] = useState<'ambulance' | 'clinic'>('ambulance');
  const [liveGpsData, setLiveGpsData] = useState<Map<string, {lat: number, lng: number}>>(new Map());
  const { cases: liveCases, totalCount, loading: liveCasesLoading } = useLiveCases(6);
  const [selectedCase, setSelectedCase] = useState<LiveCase | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [donationSelection, setDonationSelection] = useState<
    { type: 'monthly'; amount: 50 | 100 } |
    { type: 'onetime'; amount: 100 | 500 | 1000 } |
    { type: 'custom'; amount: string }
  >({ type: 'monthly', amount: 100 });

  // Animated count-up values for stats
  const countAmbulances = useCountUp(43, 1500, 400);
  const countVets = useCountUp(75, 1500, 600);

  // Set today's date
  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
  }, []);

  // Get user's location for sorting ambulances by distance
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Geolocation denied or unavailable:', error.message),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Filter and sort by distance logic
  const filteredData = useMemo(() => {
    const data = activeTab === 'ambulance' ? AMBULANCE_DATA : CLINIC_DATA;
    let filtered = data.filter(item =>
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.area && item.area.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort by distance if user location is available
    if (userLocation) {
      filtered = [...filtered].sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return filtered;
  }, [searchTerm, activeTab, userLocation]);

  // Fetch daily cases
  useEffect(() => {
    fetch('https://api-alwayscare.arham.org/api/cases/today/summary')
      .then(res => res.json())
      .then(data => setDailyCases(data.totalCases))
      .catch(() => setDailyCases(142));
  }, []);

  // Fetch live GPS data for ambulances
  useEffect(() => {
    fetch('https://api-alwayscare.arham.org/api/map/devices')
      .then(res => res.json())
      .then((devices: any[]) => {
        const gpsMap = new Map<string, {lat: number, lng: number}>();
        devices.forEach(device => {
          if (device.latitude && device.longitude && device.site?.contactNo) {
            // Match by phone number (normalize by removing spaces)
            const phone = device.site.contactNo.replace(/\s/g, '');
            gpsMap.set(phone, { lat: device.latitude, lng: device.longitude });
          }
        });
        setLiveGpsData(gpsMap);
      })
      .catch(err => console.error('Failed to fetch live GPS data:', err));
  }, []);

  // Update marker positions when live GPS data arrives
  useEffect(() => {
    if (liveGpsData.size === 0) return;

    liveGpsData.forEach((coords, phone) => {
      const marker = markersRef.current.get(phone);
      if (marker) {
        marker.setLatLng([coords.lat, coords.lng]);
      }
    });
  }, [liveGpsData]);

  // Add blue dot for user's location on the map
  useEffect(() => {
    if (!userLocation || mapStatus !== 'ready' || !mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Remove previous marker if it exists
    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
    }

    const userIcon = L.divIcon({
      className: '',
      html: `<div style="position:relative;width:20px;height:20px;">
        <div class="user-location-pulse" style="position:absolute;inset:0;background:#3b82f6;border-radius:50%;"></div>
        <div style="position:absolute;inset:4px;background:#3b82f6;border:2.5px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
      </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
      .addTo(mapInstanceRef.current)
      .bindPopup('You are here');
  }, [userLocation, mapStatus]);

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
        }).setView([26, 71], 5);

        if (L.Browser.mobile) {
          map.dragging.enable();
          map.tap?.enable();
        }

        mapInstanceRef.current = map;
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Locate Me button (above zoom controls)
        const LocateControl = L.Control.extend({
          options: { position: 'bottomright' },
          onAdd: function () {
            const btn = L.DomUtil.create('div', '');
            btn.innerHTML = `<button style="
              width: 34px; height: 34px; background: white; border: none; border-radius: 4px;
              box-shadow: 0 1px 5px rgba(0,0,0,0.25); cursor: pointer; display: flex;
              align-items: center; justify-content: center; margin-bottom: 8px;
            " title="My location">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
              </svg>
            </button>`;
            L.DomEvent.disableClickPropagation(btn);
            btn.querySelector('button')!.addEventListener('click', () => {
              if (userLocation) {
                map.flyTo([userLocation.lat, userLocation.lng], 13, { animate: true, duration: 1 });
              } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    setUserLocation(loc);
                    map.flyTo([loc.lat, loc.lng], 13, { animate: true, duration: 1 });
                  },
                  () => alert('Could not get your location. Please enable location access.'),
                  { enableHighAccuracy: true, timeout: 10000 }
                );
              }
            });
            return btn;
          },
        });
        new LocateControl().addTo(map);

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
          const marker = L.marker([ambulance.lat, ambulance.lng], { icon: createIcon(false) })
            .addTo(map)
            .bindPopup(`<b>${ambulance.city}</b><br>${ambulance.phone}`);
          // Store marker with phone as key for later updates
          const normalizedPhone = ambulance.phone.replace(/\s/g, '');
          markersRef.current.set(normalizedPhone, marker);
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

  const flyToLocation = (item: { id: string; phone: string; lat: number; lng: number }) => {
    // Try to get live GPS coordinates, fallback to static
    const normalizedPhone = item.phone.replace(/\s/g, '');
    const liveCoords = liveGpsData.get(normalizedPhone);

    const lat = liveCoords?.lat || item.lat;
    const lng = liveCoords?.lng || item.lng;

    setSelectedAmbulanceId(item.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
      mapInstanceRef.current.closePopup();

      // On mobile, scroll to map when an ambulance is selected
      if (window.innerWidth < 1024) {
        document.getElementById('ambulance-map-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  return (
    <div id="home" className="relative bg-gradient-to-br from-white via-red-50/30 to-amber-50/20 flex flex-col pt-16 lg:h-screen lg:overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-56 h-56 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-100/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row w-full flex-1 lg:h-full">
        
        {/* LEFT COLUMN: Mission Control (Title, Stats, Live Feed) */}
        {/* Mobile: Natural scroll. Desktop: Internal scroll */}
        <div className="w-full lg:w-[45%] flex flex-col p-5 md:p-6 lg:p-8 bg-gradient-to-b from-white via-white to-slate-50/80 z-20 shadow-xl lg:shadow-[8px_0_30px_-5px_rgba(0,0,0,0.08)] lg:overflow-y-auto order-1">
          
          {/* 1. Header & Title */}
          <div className="mb-4 md:mb-6">
            <div className="animate-fadeUp animate-badgeGlow inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>Vision of Param Namramuni Gurudev</span>
            </div>
            <h1 className="animate-fadeUp text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-3" style={{ fontFamily: "'Open Runde', sans-serif", animationDelay: '100ms' }}>
              India's Fast & Free <br /><span className="bg-gradient-to-r from-red-600 via-rose-500 to-red-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Animal Ambulance Network</span>
            </h1>
            <p className="animate-fadeUp text-slate-700 text-base md:text-lg font-normal leading-relaxed max-w-xl" style={{ fontFamily: "'Open Runde', sans-serif", animationDelay: '200ms' }}>
              On call, free first-aid and treatment for every injured street animal.
            </p>
            <div className="animate-fadeUp flex items-center gap-3 mt-4" style={{ animationDelay: '250ms' }}>
              <div className="h-0.5 w-16 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 rounded-full" />
              <img src="/images/aysg-logo.png" alt="AYSG" className="w-6 h-6 rounded" />
              <span className="text-sm font-semibold bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Powered by Arham Yuva Seva Group</span>
            </div>
          </div>

          {/* 2. Impact Stats Row */}
          <div className="animate-fadeUp grid grid-cols-4 gap-2 mb-4 md:mb-6" style={{ animationDelay: '300ms' }}>

            {/* Card 1 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-slate-200/80 border-l-4 border-l-red-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider bg-slate-200/50 inline-block px-1.5 py-0.5 rounded mb-1 self-start">{currentDate}</div>
              <div className="text-xl md:text-2xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">
                {dailyCases === '...' ? (
                  <span className="inline-block w-12 h-6 bg-slate-200 rounded animate-pulse"></span>
                ) : (
                  dailyCases
                )}
              </div>
              <div className="text-[10px] md:text-xs text-slate-600 font-medium leading-tight mt-auto">Cases Treated Today</div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-slate-200/80 border-l-4 border-l-rose-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Lives Saved</div>
              <div className="text-xl md:text-2xl font-black text-red-600 group-hover:scale-105 transition-transform origin-left">1.5 Lakh+</div>
              <div className="text-[10px] md:text-xs text-slate-600 font-medium leading-tight mt-auto">In Last 3 Years</div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-slate-200/80 border-l-4 border-l-amber-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Across India</div>
              <div className="text-xl md:text-2xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">{countAmbulances}+</div>
              <div className="text-[10px] md:text-xs text-slate-600 font-medium leading-tight mt-auto">Ambulance & Clinics</div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-slate-200/80 border-l-4 border-l-emerald-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">On Ground</div>
              <div className="text-xl md:text-2xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">{countVets}+</div>
              <div className="text-[10px] md:text-xs text-slate-600 font-medium leading-tight mt-auto">Vets & Paravets</div>
            </div>

          </div>

          {/* 3. Live Cases Feed (Light Theme) */}
          <div className="animate-fadeUp flex-1 bg-amber-50/50 border border-amber-100 animate-borderGlow rounded-2xl p-4 md:p-5 mb-4 flex flex-col min-h-[180px] shadow-sm" style={{ animationDelay: '400ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold flex items-center gap-2 text-slate-900 text-sm md:text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/10"></span>
                Live Cases
                <span className="text-xs text-slate-400 font-normal">&middot; {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </h2>
              <span className="btn-shine text-xs text-amber-700 bg-amber-100 border border-amber-200 px-2 py-1 rounded font-medium">Real-time Feed</span>
            </div>
            
            <div className="space-y-3 overflow-y-auto scrollbar-hide pr-2 flex-1 max-h-[300px] lg:max-h-none">
              {liveCasesLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-3 rounded-xl animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                  </div>
                ))
              ) : liveCases.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No cases found</div>
              ) : (
                liveCases.map((item) => (
                  <CaseCard key={item.id} liveCase={item} onSelect={setSelectedCase} variant="feed" />
                ))
              )}
            </div>
            <Link to="/live-impact" className="w-full mt-3 text-xs text-center text-slate-500 hover:text-red-600 font-medium flex items-center justify-center gap-1 transition-colors py-2">
              View all cases <ArrowRight size={12} />
            </Link>
          </div>

          {/* 4. Action Buttons (Donate + Volunteer) */}
          {/* Stack on mobile, row on larger screens */}
          <div className="animate-fadeUp flex flex-col sm:flex-row gap-3 mt-auto" style={{ animationDelay: '500ms' }}>
             <a href="#donate" className="btn-shine flex-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white py-3 md:py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base">
                <Heart size={18} className="fill-current" />
                Donate Now
             </a>
             <a href="#volunteer" className="btn-shine flex-1 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white py-3 md:py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base">
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
           <div className="absolute top-4 left-4 bottom-4 w-[340px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] z-40 flex flex-col border border-white/50 hidden lg:flex">
              
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
                  <button
                    onClick={() => setActiveTab('ambulance')}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md shadow-sm transition-colors ${
                      activeTab === 'ambulance'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Ambulance
                  </button>
                  <button
                    onClick={() => setActiveTab('clinic')}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${
                      activeTab === 'clinic'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Clinics
                  </button>
                </div>
              </div>

              {/* List Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredData.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <p>No {activeTab === 'ambulance' ? 'ambulances' : 'clinics'} found{searchTerm && ` matching "${searchTerm}"`}</p>
                  </div>
                ) : (
                  filteredData.map(item => (
                    <div
                      key={item.id}
                      onClick={() => flyToLocation(item)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAmbulanceId === item.id
                        ? 'bg-red-50 border-red-200 ring-1 ring-red-200'
                        : 'bg-white border-slate-100 hover:border-red-200 hover:bg-slate-50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{item.city}</h4>
                          <div className="text-xs text-slate-500 mt-0.5">{item.area || item.state}</div>
                        </div>
                        <a href={`tel:${item.phone.replace(/\s/g, '')}`} aria-label={`Call ${item.city} ambulance`} className="bg-red-100 p-2.5 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                          <Phone size={14} />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
           </div>

           {/* Desktop Donation Widget (top-right of map) */}
           <div className="absolute top-4 right-16 w-[320px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] z-40 border border-white/50 hidden lg:flex flex-col p-4">
             {/* Header */}
             <div className="flex items-start gap-2 mb-3">
               <span className="text-xl leading-none mt-0.5">❤️</span>
               <div>
                 <h4 className="font-bold text-sm text-slate-900">Save Street Animals</h4>
                 <p className="text-[11px] text-slate-500 whitespace-nowrap">₹100 helps one injured animal · <span className="text-red-600 font-semibold">1.5L+ saved</span></p>
               </div>
             </div>

             {/* Support Monthly */}
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Support Monthly (Recommended)</p>
             <div className="grid grid-cols-2 gap-2 mb-3">
               <button
                 onClick={() => setDonationSelection({ type: 'monthly', amount: 50 })}
                 className={`p-2 rounded-lg border text-center transition-all ${
                   donationSelection.type === 'monthly' && donationSelection.amount === 50
                     ? 'border-red-300 bg-red-50/50'
                     : 'border-slate-200 hover:border-slate-300'
                 }`}
               >
                 <div className="text-sm font-bold text-slate-900">₹50 / day</div>
                 <div className="text-[10px] text-slate-400">₹1500 / month</div>
               </button>
               <button
                 onClick={() => setDonationSelection({ type: 'monthly', amount: 100 })}
                 className={`p-2 rounded-lg border text-center transition-all ${
                   donationSelection.type === 'monthly' && donationSelection.amount === 100
                     ? 'border-red-400 bg-red-50/60'
                     : 'border-slate-200 hover:border-slate-300'
                 }`}
               >
                 <div className="text-sm font-bold text-red-600">₹100 / day</div>
                 <div className="text-[10px] text-slate-400">₹3000 / month</div>
               </button>
             </div>

             {/* One-time donation */}
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">One-time donation</p>
             <div className="grid grid-cols-4 gap-1.5 mb-4">
               {([100, 500, 1000] as const).map((val) => (
                 <button
                   key={val}
                   onClick={() => setDonationSelection({ type: 'onetime', amount: val })}
                   className={`py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                     donationSelection.type === 'onetime' && donationSelection.amount === val
                       ? 'border-red-300 bg-red-50 text-red-600'
                       : 'border-slate-200 text-slate-700 hover:border-slate-300'
                   }`}
                 >
                   {`₹${val}`}
                 </button>
               ))}
               {donationSelection.type === 'custom' ? (
                 <div className="relative">
                   <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">₹</span>
                   <input
                     type="number"
                     autoFocus
                     placeholder="Amt"
                     value={donationSelection.amount}
                     onChange={(e) => setDonationSelection({ type: 'custom', amount: e.target.value })}
                     className="w-full py-1.5 pl-5 pr-1 rounded-lg border border-red-300 bg-red-50 text-xs font-semibold text-red-600 focus:outline-none focus:ring-1 focus:ring-red-400"
                   />
                 </div>
               ) : (
                 <button
                   onClick={() => setDonationSelection({ type: 'custom', amount: '' })}
                   className="py-1.5 rounded-lg border text-xs font-semibold transition-all border-slate-200 text-slate-700 hover:border-slate-300"
                 >
                   Custom
                 </button>
               )}
             </div>

             {/* Donate button */}
             <a
               href="#donate"
               className="btn-shine w-4/5 mx-auto bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 hover:shadow-xl transition-all duration-200"
             >
               <span>❤️</span>
               Donate
             </a>
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
                  {/* Mobile Toggle Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setActiveTab('ambulance')}
                      className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${
                        activeTab === 'ambulance'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      Ambulance
                    </button>
                    <button
                      onClick={() => setActiveTab('clinic')}
                      className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${
                        activeTab === 'clinic'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      Clinics
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards List - Internally Scrollable */}
              <div className="px-4 pb-8 overflow-y-auto scrollbar-hide max-h-[65vh]">
                 <div className="space-y-4">
                     {filteredData.map(item => (
                        <div
                           key={item.id}
                           className={`bg-white p-4 rounded-xl shadow-sm border ${selectedAmbulanceId === item.id ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'}`}
                        >
                           <div className="flex justify-between items-start mb-3">
                              <div>
                                 <h3 className="font-bold text-lg text-slate-900">{item.city} {activeTab === 'ambulance' ? 'Ambulance' : 'Clinic'}</h3>
                                 <p className="text-slate-500 text-sm mt-0.5">+91 {item.phone}</p>
                              </div>
                              <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                 ACTIVE
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-3">
                              <button
                                 onClick={() => flyToLocation(item)}
                                 className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                              >
                                 <MapIcon size={16} />
                                 Show on Map
                              </button>
                              <a
                                 href={`tel:${item.phone.replace(/\s/g, '')}`}
                                 className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
                              >
                                 <Phone size={16} className="fill-current" />
                                 Call Now
                              </a>
                           </div>
                        </div>
                     ))}
                     {filteredData.length === 0 && (
                        <div className="text-center py-8 text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                           <p>No {activeTab === 'ambulance' ? 'ambulances' : 'clinics'} found{searchTerm && ` matching "${searchTerm}"`}</p>
                        </div>
                     )}
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <CaseModal liveCase={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
};

export default Hero;
