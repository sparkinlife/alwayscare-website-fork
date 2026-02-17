import React, { useEffect, useState } from 'react';
import { X, MapPin, Camera, Video, User, ExternalLink } from 'lucide-react';
import { LiveCase } from '../types';
import { formatTimeAgo, formatStatus, getGoogleDriveThumbnailUrl } from '../utils';

interface CaseModalProps {
  liveCase: LiveCase;
  onClose: () => void;
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

const recommendationClasses = (rec: string): string => {
  const r = rec.toUpperCase();
  if (r === 'PROPER_FOOD_AND_CARE') return 'bg-green-100 text-green-700';
  if (r === 'FOLLOW_UP_NEEDED') return 'bg-amber-100 text-amber-700';
  if (r === 'REFERRED_TO_HOSPITAL') return 'bg-red-100 text-red-700';
  return 'bg-slate-100 text-slate-600';
};

const formatRecommendation = (rec: string): string => {
  return rec.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const PreTreatmentImage: React.FC<{ url: string; caseId: string }> = ({ url, caseId }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = getGoogleDriveThumbnailUrl(url, 600);

  if (imgError || !thumbnailUrl) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-sm font-medium hover:bg-blue-100 transition-colors"
      >
        <Camera size={14} /> View Pre-Treatment Photo
      </a>
    );
  }

  return (
    <div className="space-y-2">
      <a href={url} target="_blank" rel="noreferrer" className="block relative group/img">
        <img
          src={thumbnailUrl}
          alt={`Pre-treatment photo for Case #${caseId}`}
          onError={() => setImgError(true)}
          className="w-full rounded-lg object-cover max-h-[300px] bg-slate-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
          <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <ExternalLink size={12} /> Open full size
          </span>
        </div>
      </a>
    </div>
  );
};

const CaseModal: React.FC<CaseModalProps> = ({ liveCase, onClose }) => {
  // Escape key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hasMedicalData = liveCase.doctorObservation || liveCase.treatmentGiven || liveCase.medicationDosage || liveCase.affectedBodyPart;
  const hasPhotos = liveCase.preTreatmentPhoto || liveCase.postTreatmentPhotosAndVideosFolderURL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto"
        style={{ animation: 'modalIn 200ms ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-5 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900">Case #{liveCase.caseId}</h2>
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${conditionClasses(liveCase.condition)}`}>
                  {liveCase.condition}
                </span>
                <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-medium ${statusClasses(liveCase.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass(liveCase.status)}`}></span>
                  {formatStatus(liveCase.status)}
                </span>
              </div>
              <div className="text-sm text-slate-500 mt-1">{liveCase.animalType} &bull; {liveCase.siteName}</div>
              <div className="text-xs text-slate-400 mt-1">
                {formatTimeAgo(liveCase.caseDate)} &bull; {formatDateTime(liveCase.caseDate)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 shrink-0"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Rescue Info */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Rescue Info</h3>
            {liveCase.address && (
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span>{liveCase.address}</span>
              </div>
            )}
            {liveCase.informerName && (
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <User size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span>Reported by: {liveCase.informerName}</span>
              </div>
            )}
            {liveCase.caseType && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  liveCase.caseType === 'FOLLOW_UP_CASE'
                    ? 'bg-purple-50 text-purple-600 border border-purple-100'
                    : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {liveCase.caseType === 'FOLLOW_UP_CASE' ? 'Follow-up Case' : 'New Case'}
                </span>
              </div>
            )}
          </div>

          {/* Medical Details (conditional) */}
          {hasMedicalData && (
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Medical Details</h3>

              {liveCase.doctorObservation && (
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Observation</p>
                  <p className="text-sm text-slate-700">{liveCase.doctorObservation}</p>
                </div>
              )}

              {liveCase.affectedBodyPart && (
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Affected Area</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-medium">
                    {liveCase.affectedBodyPart}
                  </span>
                </div>
              )}

              {liveCase.treatmentGiven && (
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Treatment</p>
                  <p className="text-sm text-slate-700">{liveCase.treatmentGiven}</p>
                </div>
              )}

              {liveCase.medicationDosage && (
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Medication</p>
                  <div className="font-mono text-xs text-slate-800 bg-white rounded-lg p-3 border border-slate-200 space-y-1">
                    {liveCase.medicationDosage.split('\n').map((line, i) => (
                      <div key={i}>{line.trim()}</div>
                    ))}
                  </div>
                </div>
              )}

              {liveCase.recommendation && liveCase.recommendation !== 'NO' && (
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Recommendation</p>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${recommendationClasses(liveCase.recommendation)}`}>
                    {formatRecommendation(liveCase.recommendation)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Photos & Video (conditional) */}
          {hasPhotos && (
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Photos & Video</h3>
              {liveCase.preTreatmentPhoto && (
                <PreTreatmentImage url={liveCase.preTreatmentPhoto} caseId={liveCase.caseId} />
              )}
              {liveCase.postTreatmentPhotosAndVideosFolderURL && (
                <a
                  href={liveCase.postTreatmentPhotosAndVideosFolderURL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  <Video size={14} /> View Post-Treatment Photos & Videos
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CaseModal;
