export interface AmbulanceLocation {
  id: string;
  city: string;
  area?: string;
  phone: string;
  state: 'Gujarat' | 'Maharashtra' | 'Other' | 'NGO Partner';
  lat: number;
  lng: number;
  type?: 'ambulance' | 'clinic';
}

export interface CaseStat {
  count: number;
  label: string;
}

export interface ApiDailySummary {
  total_cases: number;
  active_ambulances: number;
  locations_covered: number;
  last_updated: string;
  recent_treatments: Array<{
    id: string;
    type: string;
    location: string;
    timestamp: string;
    imageUrl?: string;
  }>;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}