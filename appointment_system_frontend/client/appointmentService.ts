import apiClient from './apiClient';

export interface Appointment {
  providerId: number;
  userId: number;
  date: string;
  time: string;
}

const appointmentService = {
  getUserAppointments: async (userId: number | undefined): Promise<Appointment[]> => {
    const response = await apiClient.get<Appointment[]>(`/appointments/${userId}`);
    return response.data;
  },

  getProviderAvailableSlots: async (providerId: number, date: string): Promise<string[]> => {
    const response = await apiClient.get<string[]>(`/appointments/availability/${providerId}`, {
      params: { date },
    });
    return response.data;
  },

  createAppointment: async (appointmentData: Appointment): Promise<void> => {
    await apiClient.post('/appointments/create', appointmentData);
  },
};

export default appointmentService;
