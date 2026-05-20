import api from './api';
import type { Lead, PaginatedResponse, LeadFilters } from '../types/lead';

export const getLeads = async (filters: LeadFilters): Promise<PaginatedResponse<Lead>> => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await api.get<PaginatedResponse<Lead>>(`/leads?${params.toString()}`);
  return response.data;
};

export const createLead = async (data: Omit<Lead, '_id' | 'createdAt' | 'updatedAt'>): Promise<Lead> => {
  const response = await api.post<{ status: string; data: Lead }>('/leads', data);
  return response.data.data;
};

export const updateLead = async (id: string, data: Partial<Lead>): Promise<Lead> => {
  const response = await api.put<{ status: string; data: Lead }>(`/leads/${id}`, data);
  return response.data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeadsCSV = async (filters: Omit<LeadFilters, 'page'>): Promise<void> => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await api.get(`/leads/export?${params.toString()}`, {
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'leads_export.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};