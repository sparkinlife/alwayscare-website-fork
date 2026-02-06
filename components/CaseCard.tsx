import React from 'react';
import { MapPin, Camera, ChevronRight } from 'lucide-react';
import { LiveCase } from '../types';
import { formatTimeAgo, formatStatus } from '../utils';

interface CaseCardProps {
  liveCase: LiveCase;
  onSelect: (liveCase: LiveCase) => void;
}

const conditionClasses = (condition: string): string => {
  const c = condition.toUpperCase();
  if (c === 'CRITICAL' || c === 'SEVERE') return 'bg-red-100 text-red-700 border-red-200';
  if (c === 'MODERATE' || c === 'MILD') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-green-100 text-green-700 border-green-200';
};

const statusClasses = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-green-50 text-green-600 border-green-100';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-amber-50 text-amber-600 border-amber-100';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-slate-100 text-slate-500 border-slate-200';
  return 'bg-blue-50 text-blue-600 border-blue-100';
};

const statusDotClass = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-green-500';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-amber-500 animate-pulse';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-slate-400';
  return 'bg-blue-500';
};

const CaseCard: React.FC<CaseCardProps> = ({ liveCase, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(liveCase)}
      className="bg-white border border-slate-100 p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
    >
      {/* Row 1: Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-bold text-slate-900 shrink-0">Case #{liveCase.caseId}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0 ${conditionClasses(liveCase.condition)}`}>
            {liveCase.condition}
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap ml-2 shrink-0">
          {formatTimeAgo(liveCase.caseDate)}
        </span>
      </div>

      {/* Row 2: Animal + Ambulance */}
      <div className="text-xs text-slate-500 mt-1">{liveCase.animalType} &bull; {liveCase.siteName}</div>

      {/* Row 3: Address (conditional) */}
      {liveCase.address && (
        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
          <MapPin size={12} className="text-slate-400 shrink-0" />
          <span className="truncate">{liveCase.address}</span>
        </div>
      )}

      {/* Row 4: Doctor observation (conditional) */}
      {liveCase.doctorObservation && (
        <div className="mt-2">
          <p className="text-xs text-slate-600 line-clamp-2">{liveCase.doctorObservation}</p>
          {liveCase.affectedBodyPart && (
            <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
              {liveCase.affectedBodyPart}
            </span>
          )}
        </div>
      )}

      {/* Row 5: Bottom bar */}
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-50 overflow-x-auto scrollbar-hide">
        {liveCase.caseType === 'FOLLOW_UP_CASE' && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100 font-medium whitespace-nowrap shrink-0">
            Follow-up
          </span>
        )}
        {liveCase.preTreatmentPhoto ? (
          <span className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 whitespace-nowrap shrink-0">
            <Camera size={10} /> Photo
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
            <Camera size={10} /> No Photos
          </span>
        )}
        <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border font-medium whitespace-nowrap shrink-0 ${statusClasses(liveCase.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass(liveCase.status)}`}></span>
          {formatStatus(liveCase.status)}
        </span>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-red-400 transition-colors ml-auto shrink-0" />
      </div>
    </div>
  );
};

export default CaseCard;
