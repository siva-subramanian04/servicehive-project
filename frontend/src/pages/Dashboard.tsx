import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLeads, createLead, updateLead, deleteLead, exportLeadsCSV } from '../services/leadService';
import LeadFiltersComponent from '../components/leads/LeadFilters';
import LeadsTable from '../components/leads/LeadsTable';
import Modal from '../components/common/Modal';
import LeadForm from '../components/leads/LeadForm';
import ThemeToggle from '../components/common/ThemeToggle';
import { useDebounce } from '../hooks/useDebounce';
import type { Lead, LeadFilters, PaginationMeta } from '../types/lead';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);

  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    sort: 'Latest'
  });

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getLeads(filters);
      setLeads(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError('Failed to fetch leads.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const handleFilterChange = (key: keyof LeadFilters, value: string | number | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      alert('Failed to delete lead.');
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { page, ...exportFilters } = filters;
      await exportLeadsCSV(exportFilters);
    } catch (err) {
      alert('Failed to export CSV.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenModal = (lead?: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLead(undefined);
  };

  const handleFormSubmit = async (data: any) => {
    if (editingLead) {
      await updateLead(editingLead._id, data);
    } else {
      await createLead(data);
    }
    handleCloseModal();
    fetchLeads();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background glow effects for premium aesthetic */}
      <div className="absolute top-[-10%] left-[50%] w-[1000px] h-[500px] -translate-x-1/2 rounded-[100%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-slate-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 dark:bg-white flex items-center justify-center">
              <span className="text-white dark:text-zinc-950 font-bold text-xs">SL</span>
            </div>
            <h1 className="text-base font-semibold tracking-tight">Smart Leads</h1>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-zinc-800 pl-6">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium leading-none mb-1">{user?.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-semibold leading-none">{user?.role}</span>
              </div>
              <button onClick={logout} className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-2">Lead Intelligence</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Manage, filter, and export your lead pipeline.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="text-sm px-5 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
          >
            + New Lead
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50/50 dark:bg-rose-500/10 border border-rose-200/50 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm backdrop-blur-md">
            {error}
          </div>
        )}

        <LeadFiltersComponent 
          filters={filters}
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onFilterChange={handleFilterChange}
          onExport={handleExport}
          isExporting={isExporting}
        />

        <LeadsTable 
          leads={leads}
          isLoading={isLoading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          isAdmin={user?.role === 'Admin'}
        />

        {!isLoading && meta && meta.pages > 1 && (
          <div className="flex justify-between items-center mt-6 px-4">
            <span className="text-xs font-medium text-slate-500 dark:text-zinc-500">
              Page {meta.page} of {meta.pages} <span className="mx-2">•</span> {meta.total} records
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page === 1}
                className="px-4 py-2 text-xs font-medium border border-slate-200 dark:border-zinc-800 rounded-lg disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page === meta.pages}
                className="px-4 py-2 text-xs font-medium border border-slate-200 dark:border-zinc-800 rounded-lg disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          title={editingLead ? 'Update Pipeline Record' : 'Create Pipeline Record'}
        >
          <LeadForm 
            initialData={editingLead} 
            onSubmit={handleFormSubmit} 
            onCancel={handleCloseModal} 
          />
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;