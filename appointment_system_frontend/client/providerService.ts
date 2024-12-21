import apiClient from './apiClient';

export interface Provider {
  providerId: number;
  firstName: string;
  lastName: string;
}

const providerService = {
  getAllProvider: async (): Promise<Provider[]> => {
    const response = await apiClient.get<Provider[]>('/provider/getAllProviders');
    return response.data;
  },

  getProviderById: async (providerId: number): Promise<Provider> => {
    const response = await apiClient.get<Provider>(`/provider/${providerId}`);
    return response.data;
  },

  addProvider: async (userId: number): Promise<Provider> => {
    const response = await apiClient.post<Provider>('/provider/add', null, { params: { userId } });
    return response.data;
  },
};

export default providerService;
