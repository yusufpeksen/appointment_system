import apiClient from './apiClient';

export interface UserDetailsResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const userService = {
  getUserDetails: async (email: string): Promise<UserDetailsResponse> => {
    const response = await apiClient.get<UserDetailsResponse>(`/user/${email}`);
    return response.data;
  },

  getAllUsers: async (): Promise<UserDetailsResponse[]> => {
    const response = await apiClient.get<UserDetailsResponse[]>('/user');
    return response.data;
  },
};

export default userService;
