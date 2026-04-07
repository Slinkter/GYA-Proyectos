import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';

interface LoginCredentials {
  email: string;
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
  obraNombre: string;
  obraDireccion: string;
  tiempoEntrega?: string;
  clienteNombre: string;
  clienteRuc?: string;
  clienteDireccion?: string;
  incluyeIgv: boolean;
  subtotal: number;
  descuento: number;
  total: number;
  notas?: string;
  items: Array<{
    producto: string;
    sistema?: string;
    descripcion: string;
    altura?: number;
    ancho?: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }>;
  diagramas: Array<{
    titulo: string;
    subtitulo?: string;
    svgCode: string;
    precio?: number;
    promptOriginal?: string;
  }>;
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
