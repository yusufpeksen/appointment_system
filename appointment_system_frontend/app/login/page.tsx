'use client';

import { Anchor, Container, Paper, Text, Title } from '@mantine/core';
import LoginForm from '@/components/LoginForm/LoginForm';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title style={{ fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>Welcome back!</Title>
      <Text color="dimmed" size="sm" mt="sm" style={{ textAlign: 'center' }}>
        Don’t have an account yet?{' '}
        <Anchor href="/register" size="sm">
          Create one
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Container>
  );
};

export default Login;
