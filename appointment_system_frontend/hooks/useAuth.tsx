'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/client/apiClient';
import authService from '@/client/authService';
import userService from '@/client/userService';

interface UserDetailsResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserDetailsResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetailsResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setAuthToken(token);

      try {
        const parsedUser = JSON.parse(storedUser) as UserDetailsResponse;
        setUser(parsedUser);
      } catch (error) {
        console.error('Stored user is not valid JSON:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });

    localStorage.setItem('authToken', response.authToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    setAuthToken(response.authToken);

    const userData = await userService.getUserDetails(email);
    setUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));

    router.push('/dashboard');
  };

  const register = async (data: any) => {
    await authService.register(data);
    router.push('/login');
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
