import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Navbar from '@/components/Navbar/Navbar';
import { AuthProvider } from '@/hooks/useAuth';
import { theme } from '../theme';

export const metadata = {
  title: 'Appointment System',
  description: 'Online Appointment System',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <AuthProvider>
            <Navbar />
            <Notifications />
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
