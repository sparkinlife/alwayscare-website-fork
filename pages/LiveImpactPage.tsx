import React, { useState, useMemo, useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { AlertCircle, RefreshCw, SearchX, Loader2 } from 'lucide-react';
import { useLiveCases } from '../hooks/useLiveCases';
import { LiveCase } from '../types';
import LiveImpactHero from '../components/LiveImpactHero';
import FilterBar from '../components/FilterBar';
import CaseCard from '../components/CaseCard';
import CaseModal from '../components/CaseModal';
import ScrollToTop from '../components/ScrollToTop';

const ITEMS_PER_PAGE = 30;

const LiveImpactPage: React.FC = () => {
  const { cases: allCases, loading, error, retry } = useLiveCases();

  // Filter state
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');

  // Pagination
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Modal
  const [selectedCase, setSelectedCase] = useState<LiveCase | null>(null);

  usePageMeta({
    title: 'Live Impact — Arham Animal Ambulance',
    description: 'See real-time rescue cases. Browse live updates of animals rescued, treated, and rehabilitated across India.',
    canonical: 'https://arhamanimalambulance.com/live-impact',
  });

  // Reset pagination when search or sort changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, sortOrder]);

  // Filtered + sorted cases
  const filteredCases = useMemo(() => {
    let result = allCases;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.caseId.toLowerCase().includes(q) ||
        (c.address && c.address.toLowerCase().includes(q)) ||
        (c.doctorObservation && c.doctorObservation.toLowerCase().includes(q)) ||
        (c.informerName && c.informerName.toLowerCase().includes(q)) ||
        c.animalType.toLowerCase().includes(q) ||
        c.siteName.toLowerCase().includes(q) ||
        c.status.replace(/_/g, ' ').toLowerCase().includes(q) ||
        c.condition.toLowerCase().includes(q) ||
        (c.affectedBodyPart && c.affectedBodyPart.toLowerCase().includes(q)) ||
        (c.treatmentGiven && c.treatmentGiven.toLowerCase().includes(q)) ||
        (c.medicationDosage && c.medicationDosage.toLowerCase().includes(q)) ||
        (c.recommendation && c.recommendation.replace(/_/g, ' ').toLowerCase().includes(q)) ||
        (c.caseType && c.caseType.replace(/_/g, ' ').toLowerCase().includes(q))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.caseDate).getTime();
      const dateB = new Date(b.caseDate).getTime();
      return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [allCases, search, sortOrder]);

  // Stats
  const stats = useMemo(() => ({
    total: allCases.length,
  }), [allCases]);

  const visibleCases = filteredCases.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCases.length;

  const hasActiveFilters = search !== '';

  const clearAllFilters = () => {
    setSearch('');
  };

  return (
    <>
      <LiveImpactHero stats={stats} loading={loading} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        resultCount={filteredCases.length}
        hasActiveFilters={hasActiveFilters}
        onClearAll={clearAllFilters}
      />

      <div className="mx-auto px-4 md:px-6 py-6 max-w-[1300px]">
        {/* Loading skeleton */}
        {loading && (
          <div className="masonry-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="masonry-card bg-white rounded-[14px] overflow-hidden shadow-sm">
                <div className="img-shimmer w-full" style={{ aspectRatio: i % 3 === 0 ? '1/1' : i % 3 === 1 ? '4/5' : '3/2' }} />
                <div className="p-3 space-y-2">
                  <div className="h-4 w-2/3 bg-[#E8E0D8] rounded animate-pulse" />
                  <div className="h-3 w-full bg-[#F5F0EB] rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#F5F0EB] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto mb-4 text-[#B7312C]" size={48} />
            <h3 className="text-lg font-semibold text-[#44403C] mb-2">Failed to load cases</h3>
            <p className="text-sm text-[#78716C] mb-4">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B7312C] text-white rounded-lg hover:bg-[#9A2823] transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        )}

        {/* Empty filter state */}
        {!loading && !error && filteredCases.length === 0 && (
          <div className="text-center py-16">
            <SearchX className="mx-auto mb-4 text-[#D6CFC7]" size={48} />
            <h3 className="text-lg font-semibold text-[#44403C] mb-2">No cases match your filters</h3>
            <p className="text-sm text-[#78716C] mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F0EB] text-[#44403C] rounded-lg hover:bg-[#E8E0D8] transition-colors text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Cases grid */}
        {!loading && !error && filteredCases.length > 0 && (
          <>
            <p className="text-sm text-[#78716C] mb-4">
              Showing {visibleCases.length} of {filteredCases.length} cases
            </p>

            <div className="masonry-grid">
              {visibleCases.map((c) => (
                <CaseCard key={c.id} liveCase={c} onSelect={setSelectedCase} variant="masonry" />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B7312C] text-white rounded-xl hover:bg-[#9A2823] transition-colors font-medium shadow-sm"
                >
                  <Loader2 size={16} /> Load More Cases
                </button>
                <p className="text-xs text-[#A8A29E] mt-2">
                  {filteredCases.length - visibleCount} more remaining
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedCase && (
        <CaseModal liveCase={selectedCase} onClose={() => setSelectedCase(null)} />
      )}

      <ScrollToTop />
    </>
  );
};

export default LiveImpactPage;
