import React, { useState } from 'react';
import { MapPin, Camera, ChevronRight } from 'lucide-react';
import { LiveCase } from '../types';
import { formatTimeAgo, formatStatus, getGoogleDriveThumbnailUrl } from '../utils';


interface CaseCardProps {
  liveCase: LiveCase;
  onSelect: (liveCase: LiveCase) => void;
  variant?: 'grid' | 'feed' | 'masonry';
}

const conditionClasses = (condition: string): string => {
  const c = condition.toUpperCase();
  if (c === 'CRITICAL' || c === 'SEVERE') return 'bg-[#FDEAEA] text-[#B7312C] border-[#F5C5C3]';
  if (c === 'MODERATE' || c === 'MILD') return 'bg-[#FEF3E7] text-[#B8650A] border-[#FDDBB8]';
  return 'bg-[#E8F0E9] text-[#5F8A65] border-[#C5DBC8]';
};

const conditionOverlayClasses = (condition: string): string => {
  const c = condition.toUpperCase();
  if (c === 'CRITICAL' || c === 'SEVERE') return 'bg-[#B7312C]/80 text-white';
  if (c === 'MODERATE' || c === 'MILD') return 'bg-[#B8650A]/80 text-white';
  return 'bg-[#5F8A65]/80 text-white';
};

const statusClasses = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-[#E8F0E9] text-[#5F8A65] border-[#C5DBC8]';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-[#FEF3E7] text-[#B8650A] border-[#FDDBB8]';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-[#F5F0EB] text-[#78716C] border-[#E8E0D8]';
  return 'bg-[#FEF7ED] text-[#B8650A] border-[#F9E8C9]';
};

const statusOverlayClasses = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-[#5F8A65]/80 text-white';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-[#B8650A]/80 text-white';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-[#78716C]/80 text-white';
  return 'bg-[#B8650A]/80 text-white';
};

const statusDotClass = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'CASE_COMPLETED') return 'bg-[#5F8A65]';
  if (s === 'ON_THE_WAY' || s === 'IN_PROGRESS') return 'bg-[#B8650A] animate-pulse';
  if (s === 'ANIMAL_NOT_FOUND') return 'bg-[#A8A29E]';
  return 'bg-[#B8650A]';
};

const animalEmoji = (type: string): string => {
  const t = type.toLowerCase();
  if (t.includes('dog')) return '\u{1F415}';
  if (t.includes('cat')) return '\u{1F408}';
  if (t.includes('cow') || t.includes('buffalo')) return '\u{1F404}';
  if (t.includes('bird') || t.includes('parrot') || t.includes('pigeon')) return '\u{1F426}';
  if (t.includes('monkey')) return '\u{1F412}';
  if (t.includes('horse') || t.includes('donkey')) return '\u{1F40E}';
  return '\u{1F43E}';
};

const recommendationClasses = (rec: string): string => {
  const r = rec.toUpperCase();
  if (r === 'PROPER_FOOD_AND_CARE') return 'bg-[#E8F0E9] text-[#5F8A65] border-[#C5DBC8]';
  if (r === 'FOLLOW_UP_NEEDED') return 'bg-[#FEF3E7] text-[#B8650A] border-[#FDDBB8]';
  if (r === 'REFERRED_TO_HOSPITAL') return 'bg-[#FDEAEA] text-[#B7312C] border-[#F5C5C3]';
  return 'bg-[#FAF7F4] text-[#57534E] border-[#E8E0D8]';
};

const formatRecommendation = (rec: string): string => {
  return rec.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

const CardContent: React.FC<{ liveCase: LiveCase; compact?: boolean }> = ({ liveCase, compact }) => (
  <>
    {/* Header */}
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm font-bold text-[#292524] shrink-0">Case #{liveCase.caseId}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0 ${conditionClasses(liveCase.condition)}`}>
          {liveCase.condition}
        </span>
      </div>
      <span className="text-xs font-medium text-[#A8A29E] whitespace-nowrap ml-2 shrink-0">
        {formatTimeAgo(liveCase.caseDate)}
      </span>
    </div>

    {/* Animal + Ambulance */}
    <div className="text-xs text-[#78716C] mt-1">{liveCase.animalType} &bull; {liveCase.siteName}</div>

    {/* Address (conditional) */}
    {liveCase.address && (
      <div className="flex items-center gap-1 text-xs text-[#78716C] mt-1">
        <MapPin size={12} className="text-[#A8A29E] shrink-0" />
        <span className="truncate">{liveCase.address}</span>
      </div>
    )}

    {/* Doctor observation (conditional) */}
    {liveCase.doctorObservation && (
      <div className="mt-2">
        <p className="text-xs text-[#57534E] line-clamp-2">
          <span className="font-semibold text-[#78716C]">Observation:</span> {liveCase.doctorObservation}
        </p>
        {liveCase.affectedBodyPart && (
          <div className="mt-1 flex items-center gap-1">
            <span className="text-[10px] font-semibold text-[#78716C]">Affected Area:</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F0EB] text-[#78716C]">
              {liveCase.affectedBodyPart}
            </span>
          </div>
        )}
      </div>
    )}

    {/* Bottom bar */}
    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#FAF7F4] overflow-x-auto scrollbar-hide">
      {liveCase.caseType === 'FOLLOW_UP_CASE' && (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEF3E7] text-[#B8650A] border border-[#F9E8C9] font-medium whitespace-nowrap shrink-0">
          Follow-up
        </span>
      )}
      {!compact && (liveCase.preTreatmentPhoto ? (
        <span className="flex items-center gap-1 text-[10px] text-[#B8650A] bg-[#FEF3E7] px-1.5 py-0.5 rounded border border-[#F9E8C9] whitespace-nowrap shrink-0">
          <Camera size={10} /> Photo
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[10px] text-[#A8A29E] bg-[#FAF7F4] px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
          <Camera size={10} /> No Photos
        </span>
      ))}
      <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border font-medium whitespace-nowrap shrink-0 ${statusClasses(liveCase.status)}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass(liveCase.status)}`}></span>
        {formatStatus(liveCase.status)}
      </span>
      <ChevronRight size={14} className="text-[#D6CFC7] group-hover:text-[#D87E0F] transition-colors ml-auto shrink-0" />
    </div>
  </>
);

// --- Masonry variant ---
const MasonryCard: React.FC<{ liveCase: LiveCase; onSelect: (c: LiveCase) => void }> = ({ liveCase, onSelect }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = getGoogleDriveThumbnailUrl(liveCase.preTreatmentPhoto);
  const hasImage = !!thumbnailUrl && !imgError;
  const isOnTheWay = liveCase.status.toUpperCase() === 'ON_THE_WAY' || liveCase.status.toUpperCase() === 'IN_PROGRESS';
  const emoji = animalEmoji(liveCase.animalType);

  return (
    <div
      onClick={() => onSelect(liveCase)}
      className={`masonry-card bg-white rounded-[14px] overflow-hidden shadow-sm border border-transparent hover:border-[#F9E8C9] cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        isOnTheWay ? 'rescue-active' : ''
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {/* Image area */}
      <div className="relative">
        {thumbnailUrl && !imgError ? (
          <div className="relative">
            <img
              src={thumbnailUrl}
              alt={`Case #${liveCase.caseId}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Warm gradient overlay on bottom of image */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1C1917]/20 to-transparent pointer-events-none" />
            {/* Shimmer overlay — sits on top until image loads */}
            {!imgLoaded && (
              <div className="absolute inset-0 img-shimmer" />
            )}
          </div>
        ) : (
          /* No image placeholder */
          <div className="w-full bg-gradient-to-br from-[#F5F0EB] to-[#E8E0D8] flex flex-col items-center justify-center" style={{ aspectRatio: '4/5' }}>
            <span className="text-5xl mb-2">{emoji}</span>
            <span className="text-xs text-[#A8A29E] font-medium">
              {isOnTheWay ? 'Rescue in progress...' : 'No photo'}
            </span>
          </div>
        )}

        {/* Floating badges on image */}
        {(hasImage || !thumbnailUrl || imgError) && (
          <>
            {/* Top-left: Condition + Follow-up */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-[12px] ${conditionOverlayClasses(liveCase.condition)}`}>
                {liveCase.condition}
              </span>
              {liveCase.caseType === 'FOLLOW_UP_CASE' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#B8650A]/80 text-white backdrop-blur-[12px]">
                  Follow-up
                </span>
              )}
            </div>

            {/* Top-right: Case number */}
            <div className="absolute top-2 right-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-black/50 text-white backdrop-blur-[12px]">
                #{liveCase.caseId}
              </span>
            </div>

            {/* Bottom-left: Status */}
            <div className="absolute bottom-2 left-2">
              <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-[12px] ${statusOverlayClasses(liveCase.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${liveCase.status.toUpperCase() === 'CASE_COMPLETED' ? 'bg-[#8BB592]' : liveCase.status.toUpperCase() === 'ON_THE_WAY' || liveCase.status.toUpperCase() === 'IN_PROGRESS' ? 'bg-[#F0C590] animate-pulse' : 'bg-white/60'}`}></span>
                {formatStatus(liveCase.status)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 space-y-1.5" style={{ transition: 'background 0.2s' }}>
        {/* Line 1: Animal + site + time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0 text-sm">
            <span>{emoji}</span>
            <span className="font-bold text-[#292524] truncate">{liveCase.animalType}</span>
            <span className="text-[#D6CFC7]">&bull;</span>
            <span className="text-[#A8A29E] truncate text-xs">{liveCase.siteName}</span>
          </div>
          <span className="text-[10px] text-[#A8A29E] whitespace-nowrap ml-2 shrink-0">
            {formatTimeAgo(liveCase.caseDate)}
          </span>
        </div>

        {/* Line 2: Address */}
        {liveCase.address && (
          <div className="flex items-center gap-1 text-xs text-[#78716C]">
            <MapPin size={11} className="text-[#A8A29E] shrink-0" />
            <span className="truncate">{liveCase.address}</span>
          </div>
        )}

        {/* Line 3: Observation or dispatch message */}
        {liveCase.doctorObservation ? (
          <div>
            <p className="text-xs text-[#57534E] line-clamp-2">
              {liveCase.doctorObservation}
              {liveCase.affectedBodyPart && (
                <span className="text-[#A8A29E]"> &middot; {liveCase.affectedBodyPart}</span>
              )}
            </p>
          </div>
        ) : isOnTheWay ? (
          <p className="text-xs text-[#B8650A] italic">Team dispatched — awaiting update...</p>
        ) : null}

        {/* Line 4: Recommendation */}
        {liveCase.recommendation && liveCase.recommendation !== 'NO' && (
          <div className="pt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${recommendationClasses(liveCase.recommendation)}`}>
              {formatRecommendation(liveCase.recommendation)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const CaseCard: React.FC<CaseCardProps> = ({ liveCase, onSelect, variant = 'grid' }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = getGoogleDriveThumbnailUrl(liveCase.preTreatmentPhoto);
  const showImage = !!thumbnailUrl && !imgError;

  if (variant === 'masonry') {
    return <MasonryCard liveCase={liveCase} onSelect={onSelect} />;
  }

  if (variant === 'feed') {
    return (
      <div
        onClick={() => onSelect(liveCase)}
        className="bg-white border border-[#E8E0D8] p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#F9E8C9] cursor-pointer group"
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="flex gap-3">
          {showImage && (
            <img
              src={thumbnailUrl!}
              alt={`Case #${liveCase.caseId}`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shrink-0 bg-[#F5F0EB] self-center"
            />
          )}
          <div className="flex-1 min-w-0">
            <CardContent liveCase={liveCase} compact />
          </div>
        </div>
      </div>
    );
  }

  // variant === 'grid'
  return (
    <div
      onClick={() => onSelect(liveCase)}
      className="bg-white border border-[#E8E0D8] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#F9E8C9] cursor-pointer group overflow-hidden"
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {showImage && (
        <div className="bg-[#F5F0EB] relative overflow-hidden">
          <img
            src={thumbnailUrl!}
            alt={`Case #${liveCase.caseId}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full aspect-[3/2] object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1C1917]/20 to-transparent pointer-events-none" />
        </div>
      )}
      <div className="p-3">
        <CardContent liveCase={liveCase} />
      </div>
    </div>
  );
};

export default CaseCard;
