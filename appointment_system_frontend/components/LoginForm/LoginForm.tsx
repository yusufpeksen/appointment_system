import React, { useState } from 'react';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';

type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        size="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        mt="md"
        size="md"
      />
      <Button type="submit" fullWidth mt="xl" size="md">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
