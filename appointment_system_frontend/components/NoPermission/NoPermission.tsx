import React from 'react';
import { useRouter } from 'next/navigation';
import { IconLock } from '@tabler/icons-react';
import { Box, Button, Center, Text } from '@mantine/core';

const NoPermission: React.FC = () => {
  const router = useRouter();

  return (
    <Center style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Box
        p="xl"
        style={{
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <IconLock size={60} color="#ff6b6b" style={{ marginBottom: '16px' }} />
        <Text size="xl" mb="sm">
          Access Denied
        </Text>
        <Text color="dimmed" mb="lg">
          You don't have permission to access this page. If you think this is an error, contact your
          administrator.
        </Text>
        <Button variant="light" color="red" size="md" onClick={() => router.push('/')}>
          Go Back to Home
        </Button>
      </Box>
    </Center>
  );
};

export default NoPermission;
