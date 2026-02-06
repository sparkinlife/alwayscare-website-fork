import React, { useState, useMemo, useEffect } from 'react';
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

  // Page title
  useEffect(() => {
    document.title = 'Live Impact — Always Care Project';
    return () => { document.title = 'Always Care Project'; };
  }, []);

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

      <div className="container mx-auto px-4 py-6">
        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm animate-pulse">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-5 w-24 bg-slate-200 rounded" />
                  <div className="h-4 w-16 bg-slate-200 rounded" />
                </div>
                <div className="h-3 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                <div className="h-3 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="flex gap-2 pt-2 border-t border-slate-50">
                  <div className="h-5 w-16 bg-slate-200 rounded" />
                  <div className="h-5 w-20 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto mb-4 text-red-400" size={48} />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Failed to load cases</h3>
            <p className="text-sm text-slate-500 mb-4">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        )}

        {/* Empty filter state */}
        {!loading && !error && filteredCases.length === 0 && (
          <div className="text-center py-16">
            <SearchX className="mx-auto mb-4 text-slate-300" size={48} />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No cases match your filters</h3>
            <p className="text-sm text-slate-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Cases grid */}
        {!loading && !error && filteredCases.length > 0 && (
          <>
            <p className="text-sm text-slate-500 mb-4">
              Showing {visibleCases.length} of {filteredCases.length} cases
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleCases.map((c, index) => (
                <div
                  key={c.id}
                  className="animate-fadeUp"
                  style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 50}ms` }}
                >
                  <CaseCard liveCase={c} onSelect={setSelectedCase} variant="grid" />
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-sm"
                >
                  <Loader2 size={16} /> Load More Cases
                </button>
                <p className="text-xs text-slate-400 mt-2">
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
