'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconCalendar, IconLogin } from '@tabler/icons-react';
import { Button, Center, Container, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Container
      size="lg"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
      }}
    >
      <Paper
        radius="lg"
        p="xl"
        style={{
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <Center>
          <Group mb="lg">
            <IconCalendar size={80} color="#6AC4C7" stroke={1.5} />
          </Group>
        </Center>
        <Title order={1} size="h2" mb="md" c="cyan.6" style={{ fontWeight: 'bold' }}>
          Welcome to The Appointment System
        </Title>

        {!user ? (
          <>
            <Text size="lg" color="dimmed" mb="lg">
              Please log in to schedule and manage your appointments.
            </Text>
            <Button
              leftSection={<IconLogin size={20} />}
              size="md"
              radius="md"
              color="cyan.6"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Text size="lg" color="dimmed" mb="lg">
              Welcome back, <strong>{user.firstName}</strong>! Manage your appointments in the
              dashboard.
            </Text>
            <Button
              leftSection={<IconCalendar size={20} />}
              size="md"
              radius="md"
              color="cyan.6"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
