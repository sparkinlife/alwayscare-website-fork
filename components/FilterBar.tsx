import React from 'react';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  sortOrder: 'recent' | 'oldest';
  onSortChange: (v: 'recent' | 'oldest') => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  search, onSearchChange,
  sortOrder, onSortChange,
  resultCount, hasActiveFilters, onClearAll,
}) => {
  return (
    <div className="sticky top-[57px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 space-y-3">
        {/* Search + Sort row */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search cases, locations, observations..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as 'recent' | 'oldest')}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Results counter + clear */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">{resultCount} results</span>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
            >
              <X size={12} /> Clear search
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
