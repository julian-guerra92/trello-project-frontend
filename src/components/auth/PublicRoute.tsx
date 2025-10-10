'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage, isTokenExpired } from '@/utils/auth';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = () => {
      const token = authStorage.getToken();

      if (token && !isTokenExpired(token)) {
        router.push('/dashboard');
        return;
      }

      if (token && isTokenExpired(token)) {
        authStorage.clear();
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
