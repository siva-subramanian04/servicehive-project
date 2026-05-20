export type UserRole = 'Admin' | 'Sales User';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  status: string;
  data: User & { token: string };
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Record<string, string>) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}