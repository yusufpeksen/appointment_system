'use client';

import React, { useState } from 'react';
import { Button, Container, Drawer, Flex, Grid, Group, Paper, Text } from '@mantine/core';
import AppointmentList from '@/components/AppointmentList/AppointmentList';
import NewAppointmentDrawer from '@/components/NewAppointmentDrawer/NewAppointmentDrawe';
import requireAuth from '@/utils/requireAuth';

const Dashboard: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  // Dashboard'ı yenilemek için bir fonksiyon tanımlayın
  const refreshDashboard = () => {
    window.location.reload(); // Sayfayı yenileyerek listeyi güncelle
  };

  return (
    <Container size="lg" mt="xl">
      <Flex justify={'center'} align={'center'} direction={'column'}>
        <Group align="right">
          <Button onClick={() => setDrawerOpened(true)}>New Appointment</Button>
        </Group>
        <Paper miw={700} shadow="sm" p="md" radius="md" mt={20}>
          <AppointmentList />
        </Paper>
      </Flex>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="New Appointment"
        padding="xl"
        size="md"
        position="right"
      >
        <NewAppointmentDrawer
          closeDrawer={() => setDrawerOpened(false)}
          refreshDashboard={refreshDashboard}
        />
      </Drawer>
    </Container>
  );
};

export default requireAuth(Dashboard);
