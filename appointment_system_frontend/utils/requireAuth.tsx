'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const requireAuth = (WrappedComponent: React.FC): React.FC => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default requireAuth;
