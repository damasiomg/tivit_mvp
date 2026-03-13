'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAuth } from '@/auth/authService';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored?.token) {
      const role = stored?.role ?? 'user';
      router.replace(role === 'admin' ? '/admin' : '/user');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #E7E8EB', borderTopColor: '#D22D2F', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
    </div>
  );
}
