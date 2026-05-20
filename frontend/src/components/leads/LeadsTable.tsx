import React from 'react';
import type { Lead } from '../../types/lead';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, isLoading, onEdit, onDelete, isAdmin }) => {
  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-800/50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="w-full min-h-[400px] rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-800/50 flex flex-col items-center justify-center text-slate-500 dark:text-zinc-500">
        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p className="text-base font-medium">No records found</p>
        <p className="text-sm mt-1">Adjust your filters to find leads.</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full overflow-hidden rounded-2xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-zinc-800/80 text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-medium bg-slate-50/50 dark:bg-zinc-900/50">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 dark:text-zinc-300">
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b last:border-0 border-slate-100 dark:border-zinc-800/50 hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lead.name}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-zinc-400">{lead.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border
                    ${lead.status === 'New' ? 'bg-blue-50/50 text-blue-600 border-blue-200/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' : ''}
                    ${lead.status === 'Contacted' ? 'bg-amber-50/50 text-amber-600 border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' : ''}
                    ${lead.status === 'Qualified' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : ''}
                    ${lead.status === 'Lost' ? 'bg-rose-50/50 text-rose-600 border-rose-200/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' : ''}
                  `}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-zinc-400">{lead.source}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-zinc-400">{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: 1 }}>
                    <button 
                      onClick={() => onEdit(lead)}
                      className="text-xs font-medium text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => onDelete(lead._id)}
                        className="text-xs font-medium text-slate-400 hover:text-rose-600 dark:text-zinc-500 dark:hover:text-rose-400 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;