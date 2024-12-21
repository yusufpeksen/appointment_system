'use client';

import { Anchor, Container, Paper, Text, Title } from '@mantine/core';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

const Register: React.FC = () => {
  const { register } = useAuth();

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      await register(data);
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <Container size={600} my={40}>
      <Title style={{ fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>
        Create an account
      </Title>
      <Text color="dimmed" size="sm" mt={5} style={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <Anchor href="/login" size="sm">
          Login here
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <RegisterForm onSubmit={handleRegister} />
      </Paper>
    </Container>
  );
};

export default Register;
