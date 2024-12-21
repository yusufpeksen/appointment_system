'use client';

import React, { useState } from 'react';
import { Button, Container, Drawer, Group, Paper, Text } from '@mantine/core';
import NewProviderDrawer from '@/components/NewProviderDrawer.tsx/NewProviderDrawer';
import NoPermission from '@/components/NoPermission/NoPermission';
import { useAuth } from '@/hooks/useAuth';
import requireAuth from '@/utils/requireAuth';

const AdminPanel: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { user } = useAuth();

  const refreshDashboard = () => {
    window.location.reload();
  };

  if (user?.role != 'ADMIN') {
    return <NoPermission />;
  }

  return (
    <Container size="lg" mt="xl">
      <Paper shadow="sm" p="md" radius="md">
        <Text size="lg" mb="md">
          Admin Panel
        </Text>
        <Group align="right">
          <Button onClick={() => setDrawerOpened(true)}>New Provider</Button>
        </Group>
      </Paper>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Add New Provider"
        padding="xl"
        size="md"
        position="right"
      >
        <NewProviderDrawer
          closeDrawer={() => setDrawerOpened(false)}
          refreshDashboard={refreshDashboard}
        />
      </Drawer>
    </Container>
  );
};

export default requireAuth(AdminPanel);
