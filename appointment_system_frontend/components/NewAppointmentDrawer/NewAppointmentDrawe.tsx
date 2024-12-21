'use client';

import React, { useEffect, useState } from 'react';
import { Button, Group, LoadingOverlay, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import appointmentService from '@/client/appointmentService';
import providerService from '@/client/providerService';
import { useAuth } from '@/hooks/useAuth';

type Provider = {
  id: number;
  name: string;
};

const NewAppointmentDrawer: React.FC<{ closeDrawer: () => void; refreshDashboard: () => void }> = ({
  closeDrawer,
  refreshDashboard,
}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const hours = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ];

  useEffect(() => {
    providerService
      .getAllProvider()
      .then((data) =>
        setProviders(data.map((p) => ({ id: p.providerId, name: `${p.firstName} ${p.lastName}` })))
      )
      .catch((err) => console.error(err));
  }, []);

  const fetchAvailableSlots = (providerId: string, date: Date) => {
    setLoading(true);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    appointmentService
      .getProviderAvailableSlots(Number(providerId), utcDate.toISOString().split('T')[0])
      .then((data) => setAvailableSlots(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const isPastTime = (time: string): boolean => {
    if (!selectedDate) return false;

    const now = new Date();
    const selectedDateTime = new Date(selectedDate);

    const [hours, minutes] = time.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    return selectedDateTime < now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !selectedDate || !selectedTime) {
      notifications.show({
        title: 'Missing Fields',
        message: 'Please fill in all the required fields.',
        color: 'red',
      });
      return;
    }

    const utcDate = new Date(
      Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    );

    try {
      await appointmentService.createAppointment({
        providerId: Number(selectedProvider),
        userId: user?.userId || 0,
        date: utcDate.toISOString().split('T')[0], // Tarih UTC formatında gönderiliyor
        time: selectedTime,
      });

      notifications.show({
        title: 'Success',
        message: 'Appointment successfully created!',
        color: 'green',
      });

      closeDrawer();
      refreshDashboard();
    } catch (error) {
      console.error('Failed to create appointment:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create appointment. Please try again later.',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

      {/* Sağlayıcı seçimi */}
      <Select
        label="Provider"
        placeholder="Select a provider"
        data={providers.map((provider) => ({
          value: provider.id.toString(),
          label: provider.name,
        }))}
        value={selectedProvider}
        onChange={(value) => {
          setSelectedProvider(value);
          setAvailableSlots([]);
          setSelectedDate(null);
        }}
        required
      />

      {/* Tarih seçimi */}
      <DatePickerInput
        label="Date"
        placeholder="Select a date"
        value={selectedDate}
        minDate={new Date()} // Geçmiş tarihler seçilemez
        onChange={(date) => {
          setSelectedDate(date);
          if (selectedProvider && date) fetchAvailableSlots(selectedProvider, date);
        }}
        required
        mt="md"
      />

      {/* Saat seçimi */}
      <Select
        label="Time Slot"
        placeholder="Select a time slot"
        data={hours.map((hour) => ({
          value: hour,
          label: hour,
          disabled: !availableSlots.includes(hour) || isPastTime(hour), // Dolu ve geçmiş saatleri devre dışı bırak
        }))}
        value={selectedTime}
        onChange={setSelectedTime}
        required
        mt="md"
      />

      {/* Gönder butonu */}
      <Group align="right" mt="xl">
        <Button type="submit">Book Appointment</Button>
      </Group>
    </form>
  );
};

export default NewAppointmentDrawer;
