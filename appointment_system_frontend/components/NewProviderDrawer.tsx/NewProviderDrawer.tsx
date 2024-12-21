'use client';

import React, { useEffect, useState } from 'react';
import { Button, Group, LoadingOverlay, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import providerService from '@/client/providerService';
import userService, { UserDetailsResponse } from '@/client/userService';

interface NewProviderDrawerProps {
  closeDrawer: () => void;
  refreshDashboard: () => void;
}

const NewProviderDrawer: React.FC<NewProviderDrawerProps> = ({ closeDrawer, refreshDashboard }) => {
  const [users, setUsers] = useState<UserDetailsResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((data) => {
        const filteredUsers = data.filter((user) => user.role === 'USER');
        setUsers(filteredUsers);
      })
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);

  const handleAddProvider = async () => {
    if (!selectedUser) {
      notifications.show({
        title: 'Missing Selection',
        message: 'Please select a user to assign as a provider.',
        color: 'red',
      });
      return;
    }

    setLoading(true);

    try {
      await providerService.addProvider(Number(selectedUser));

      notifications.show({
        title: 'Success',
        message: 'User has been successfully added as a provider.',
        color: 'green',
      });

      closeDrawer();
      refreshDashboard();
    } catch (error) {
      console.error('Failed to add provider:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to add the user as a provider. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      <Select
        label="Select User"
        placeholder="Choose a user to assign as provider"
        data={users.map((user) => ({
          value: user.userId.toString(),
          label: `${user.firstName} ${user.lastName} (${user.email})`,
        }))}
        value={selectedUser}
        onChange={setSelectedUser}
        required
      />

      <Group align="right" mt="xl">
        <Button onClick={handleAddProvider}>Add Provider</Button>
      </Group>
    </div>
  );
};

export default NewProviderDrawer;
