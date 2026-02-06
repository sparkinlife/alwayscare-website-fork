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

export interface LiveCase {
  id: string;
  caseId: string;
  caseDate: string;
  animalType: string;
  address: string | null;
  informerName: string | null;
  status: string;
  caseType: string | null;
  condition: string;
  doctorObservation: string | null;
  affectedBodyPart: string | null;
  treatmentGiven: string | null;
  medicationDosage: string | null;
  recommendation: string | null;
  preTreatmentPhoto: string | null;
  postTreatmentPhotosAndVideosFolderURL: string | null;
  createdAt: string | null;
  siteName: string;
}