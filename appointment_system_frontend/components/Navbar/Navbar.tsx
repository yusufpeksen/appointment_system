'use client';

import { useRouter } from 'next/navigation';
import { Button, Flex, Group, Text } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Flex h={60} px="md" bg="rgba(0, 0, 0, .3)" justify="space-between" align="center">
      <Text onClick={() => router.push('/')} w={700} size="lg" style={{ cursor: 'pointer' }}>
        Appointment System
      </Text>

      <Group>
        {user ? (
          <>
            <Text c="white">Welcome, {user.firstName || 'User'}</Text>
            <Button onClick={() => router.push('/dashboard')} variant="filled">
              Dashboard
            </Button>
            {user.role == 'ADMIN' ? (
              <Button onClick={() => router.push('/adminPanel')} variant="filled">
                Admin Panel
              </Button>
            ) : (
              ''
            )}
            <Button onClick={logout} variant="default">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => router.push('/login')} variant="default">
              Login
            </Button>
            <Button onClick={() => router.push('/register')} variant="filled">
              Sign Up
            </Button>
          </>
        )}
      </Group>
    </Flex>
  );
}
