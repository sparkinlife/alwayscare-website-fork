import { AmbulanceLocation } from './types';

export const API_BASE_URL = 'https://api-alwayscare.arham.org/api';

export const AMBULANCE_DATA: AmbulanceLocation[] = [
  // Gujarat
  { id: '1', city: 'Ahmedabad', phone: '6262 0909 15', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { id: '2', city: 'Bhavnagar', phone: '8989 8080 46', state: 'Gujarat', lat: 21.7645, lng: 72.1519 },
  { id: '3', city: 'Gondal', phone: '6262 0909 89', state: 'Gujarat', lat: 21.9619, lng: 70.7923 },
  { id: '4', city: 'Junagadh', phone: '9913910108', state: 'Gujarat', lat: 21.5222, lng: 70.4579 },
  { id: '5', city: 'Madiya Hatina', phone: '6262 0606 74', state: 'Gujarat', lat: 21.1500, lng: 70.3000 },
  { id: '6', city: 'Mandvi - Kutch', phone: '8585 0202 63', state: 'Gujarat', lat: 22.8400, lng: 69.3500 },
  { id: '7', city: 'Palitana', phone: '6262 8080 03', state: 'Gujarat', lat: 21.5200, lng: 71.8200 },
  { id: '8', city: 'Surat', area: 'Vesu', phone: '86 8989 0505', state: 'Gujarat', lat: 21.1500, lng: 72.7800 },
  { id: '9', city: 'Surat', area: 'Varachha', phone: '8989 0505 81', state: 'Gujarat', lat: 21.2100, lng: 72.8600 },
  { id: '10', city: 'Vadodara', phone: '8989 0303 73', state: 'Gujarat', lat: 22.3072, lng: 73.1812 },
  { id: '11', city: 'Veraval', phone: '6262 0505 90', state: 'Gujarat', lat: 20.9159, lng: 70.3629 },
  { id: '12', city: 'Jamnagar', area: 'K9 Vision', phone: '8238113555', state: 'Gujarat', lat: 22.4707, lng: 70.0577 },

  // Maharashtra
  { id: '13', city: 'Mumbai', area: 'Andheri', phone: '7662 00 5401', state: 'Maharashtra', lat: 19.1136, lng: 72.8697 },
  { id: '14', city: 'Mumbai', area: 'Malad', phone: '7662 00 5402', state: 'Maharashtra', lat: 19.1874, lng: 72.8489 },
  { id: '15', city: 'Mumbai', area: 'Mira Road', phone: '7662 00 5403', state: 'Maharashtra', lat: 19.2813, lng: 72.8561 },
  { id: '16', city: 'Mumbai', area: 'Ghatkopar', phone: '7662 00 5404', state: 'Maharashtra', lat: 19.0860, lng: 72.9090 },
  { id: '17', city: 'Mumbai', area: 'Mulund', phone: '7662 00 5406', state: 'Maharashtra', lat: 19.1726, lng: 72.9425 },
  { id: '18', city: 'Mumbai', area: 'Kandivali', phone: '9619619721', state: 'Maharashtra', lat: 19.2045, lng: 72.8376 },
  { id: '19', city: 'Mumbai', area: 'Dadar', phone: '7662 00 5409', state: 'Maharashtra', lat: 19.0178, lng: 72.8478 },
  { id: '20', city: 'Mumbai', area: 'Nasik Highway', phone: '8989 0909 67', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { id: '21', city: 'Nagpur', phone: '9090 6767 08', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { id: '22', city: 'Pune', area: 'PMC', phone: '8989 0303 90', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { id: '23', city: 'Pune', area: 'PCMC', phone: '8989 0303 17', state: 'Maharashtra', lat: 18.6298, lng: 73.7997 },

  // Other States
  { id: '24', city: 'Delhi', phone: '8989 0808 78', state: 'Other', lat: 28.6139, lng: 77.2090 },
  { id: '25', city: 'Chennai', phone: '95665 08046', state: 'Other', lat: 13.0827, lng: 80.2707 },
  { id: '26', city: 'Hyderabad', phone: '6262 0909 70', state: 'Other', lat: 17.3850, lng: 78.4867 },
  { id: '27', city: 'Indore', phone: '8989 0808 48', state: 'Other', lat: 22.7196, lng: 75.8577 },

  // NGO Partners
  { id: '28', city: 'Bengaluru', area: 'Friend for Animal Trust', phone: '814762003', state: 'NGO Partner', lat: 12.9716, lng: 77.5946 },
  { id: '29', city: 'Bengaluru', area: 'ALAI', phone: '9739288282', state: 'NGO Partner', lat: 13.0, lng: 77.6 },
  { id: '30', city: 'Wadala', area: 'Hope for Indies Trust', phone: '9167119135', state: 'NGO Partner', lat: 19.0216, lng: 72.8646 },
  { id: '31', city: 'Kolkata', area: 'Chaya', phone: '9830211138', state: 'NGO Partner', lat: 22.5726, lng: 88.3639 },
  { id: '32', city: 'Rajkot', area: 'Jeev daya Ghar', phone: '9664554155', state: 'NGO Partner', lat: 22.3039, lng: 70.8022 },
  { id: '33', city: 'Rajkot', area: 'Sadbhavna Vrudhashram', phone: '9664554155', state: 'NGO Partner', lat: 22.25, lng: 70.75 },
  { id: '34', city: 'Vapi', area: 'Tinku memorial', phone: '8980838888', state: 'NGO Partner', lat: 20.3893, lng: 72.9106 },
];

export const CLINIC_DATA: AmbulanceLocation[] = [
  { id: 'c1', city: 'Mumbai', area: 'Ghatkopar', phone: '7463036303', state: 'Maharashtra', lat: 19.0860, lng: 72.9090, type: 'clinic' },
  { id: 'c2', city: 'Mumbai', area: 'Kandivali', phone: '7304983822', state: 'Maharashtra', lat: 19.2045, lng: 72.8376, type: 'clinic' },
  { id: 'c3', city: 'Rajkot', phone: '7567075680', state: 'Gujarat', lat: 22.3039, lng: 70.8022, type: 'clinic' },
  { id: 'c4', city: 'Junagadh', phone: '1234567890', state: 'Gujarat', lat: 21.5222, lng: 70.4579, type: 'clinic' },
];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Live Impact', href: '#impact' },
  { name: 'Ambulances', href: '#ambulances' },
  { name: 'Volunteer', href: '#volunteer' },
];