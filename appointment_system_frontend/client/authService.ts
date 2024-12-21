import apiClient from './apiClient';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  authToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const authService = {
  login: async (data: LoginRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<void> => {
    await apiClient.post('/auth/register', data);
  },
};

export default authService;
