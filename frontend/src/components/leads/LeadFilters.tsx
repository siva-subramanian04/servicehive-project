import React from 'react';
import type { LeadFilters } from '../../types/lead';

interface LeadFiltersProps {
  filters: LeadFilters;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onFilterChange: (key: keyof LeadFilters, value: string | number | undefined) => void;
  onExport: () => void;
  isExporting: boolean;
}

const LeadFiltersComponent: React.FC<LeadFiltersProps> = ({
  filters,
  searchInput,
  onSearchInputChange,
  onFilterChange,
  onExport,
  isExporting
}) => {
  const inputBaseClasses = "px-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/30 transition-all dark:text-zinc-200";

  return (
    <div className="relative z-10 p-5 mb-8 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-800/50 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
      <div className="w-full md:w-1/3 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          className={`${inputBaseClasses} w-full pl-9`}
        />
      </div>
      
      <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
        <select
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value || undefined)}
          className={inputBaseClasses}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={filters.source || ''}
          onChange={(e) => onFilterChange('source', e.target.value || undefined)}
          className={inputBaseClasses}
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>

        <select
          value={filters.sort || 'Latest'}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className={inputBaseClasses}
        >
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
        </select>

        <button
          onClick={onExport}
          disabled={isExporting}
          className="text-sm px-5 py-2 rounded-lg font-medium bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {isExporting ? 'Exporting...' : 'Export CSV'}
        </button>
      </div>
    </div>
  );
};

export default LeadFiltersComponent;