'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Container, Flex, Stack, Text } from '@mantine/core';
import appointmentService, { Appointment } from '@/client/appointmentService';
import providerService, { Provider } from '@/client/providerService';
import { useAuth } from '@/hooks/useAuth';

interface AppointmentWithProviderName extends Appointment {
  providerName?: string;
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentWithProviderName[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.userId) return;

      try {
        const appointmentsData = await appointmentService.getUserAppointments(user.userId);

        const providers = await providerService.getAllProvider();
        const providersMap = new Map(
          providers.map((p) => [p.providerId, `${p.firstName} ${p.lastName}`])
        );

        const appointmentsWithNames = appointmentsData.map((appointment) => ({
          ...appointment,
          providerName: providersMap.get(appointment.providerId) || 'Unknown',
        }));

        setAppointments(appointmentsWithNames);
      } catch (error) {
        console.error('Failed to fetch appointments or provider names:', error);
      }
    };

    fetchAppointments();
  }, [user]);

  const getBadgeColor = (date: string) => {
    const today = new Date();
    const appointmentDate = new Date(date);

    if (appointmentDate < today) return 'red';
    return 'green';
  };

  return (
    <Stack>
      {appointments.length > 0 ? (
        appointments
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((appointment, index) => (
            <Flex
              direction={'column'}
              pb={15}
              pl={10}
              mb={10}
              style={{
                borderBottom: '1px solid gray',
                borderLeft: `5px solid ${getBadgeColor(appointment.date)}`,
              }}
              key={index}
            >
              <Text c={'white'} style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Provider Name : {appointment.providerName || 'Loading...'}
              </Text>
              <Text my={3}>Appointment Date : {appointment.date}</Text>
              <Text>Appointment Time : {appointment.time}</Text>
            </Flex>
          ))
      ) : (
        <Text style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          You don't have any appintment
        </Text>
      )}
      <Container>
        <Text>
          <span style={{ color: 'red', fontWeight: 'bold' }}>Red</span> = Expired Date ,{' '}
          <span style={{ color: 'green', fontWeight: 'bold' }}>Green</span> = Coming Date
        </Text>
      </Container>
    </Stack>
  );
};

export default AppointmentList;
