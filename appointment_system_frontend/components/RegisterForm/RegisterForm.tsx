import React, { useState } from 'react';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';

type RegisterFormProps = {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

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
      <Group grow>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Group>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        mt="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        mt="md"
      />
      <Button type="submit" fullWidth mt="xl" size="md">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
