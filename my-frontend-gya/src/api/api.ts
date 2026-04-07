import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user?: unknown;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
      useAuthStore.getState().setToken(data.accessToken);
      return data;
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message || err.message || 'Error de autenticación');
      throw error;
    }
  },
};

export interface CreatePresupuestoData {
  numero?: string;
  fecha?: string;
  cliente: string;
  ruc: string;
  obra: string;
  direccion: string;
  tipoServicio: string;
  productos: Array<{
    id: string;
    producto: string;
    descripcion: string;
    cantidad: number;
    total: number;
  }>;
  diagramas: Array<{
    id: string;
    titulo: string;
    subtitulo: string;
    svgCode: string;
    precio: number;
  }>;
  totalBruto: number;
  descuento: number;
  totalNeto: number;
  tiempoEntrega: string;
}

export const presupuestoApi = {
  async getAll(): Promise<unknown> {
    const { data } = await api.get('/presupuestos');
    return data;
  },
  async create(presupuestoData: CreatePresupuestoData): Promise<unknown> {
    const { data } = await api.post('/presupuestos', presupuestoData);
    return data;
  },
};

export interface SVGGenerateParams {
  descripcion: string;
}

export const svgApi = {
  async generate(params: SVGGenerateParams): Promise<{ svgCode: string }> {
    const { data } = await api.post<{ svgCode: string }>('/svg/generate', params);
    return data;
  },
};
