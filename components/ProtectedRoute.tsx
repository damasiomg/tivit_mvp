'use client';

import React, { useEffect, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'user' | 'admin';
}

const ProtectedRoute = memo(function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    const userRole = user?.role ?? '';
    if (userRole !== requiredRole) {
      if (userRole === 'admin') {
        router.replace('/admin');
      } else if (userRole === 'user') {
        router.replace('/user');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, user?.role, requiredRole, router]);

  if (!isAuthenticated || (user?.role ?? '') !== requiredRole) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="btn__spinner" style={{ width: 32, height: 32, border: '3px solid #E7E8EB', borderTopColor: '#D22D2F', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      </div>
    );
  }

  return <>{children}</>;
});

export default ProtectedRoute;
