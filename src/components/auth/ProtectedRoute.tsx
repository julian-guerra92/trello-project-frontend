'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage, isTokenExpired } from '@/utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = () => {
      const token = authStorage.getToken();

      if (!token) {
        router.push('/login');
        return;
      }

      if (isTokenExpired(token)) {
        authStorage.clear();
        router.push('/login');
        return;
      }

      setIsValidating(false);
    };

    validateAuth();
  }, [router]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return <>{children}</>;
};
