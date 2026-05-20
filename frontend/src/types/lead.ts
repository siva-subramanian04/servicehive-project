export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  meta: PaginationMeta;
}

export interface LeadFilters {
  page: number;
  status?: string;
  source?: string;
  search?: string;
  sort?: 'Latest' | 'Oldest';
}