'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/admin-layout';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-session', {
          method: 'GET',
        });
        const data = await response.json();
        if (!data.authenticated) {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
