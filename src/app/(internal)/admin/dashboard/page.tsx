import type { Metadata } from 'next';
import AdminDashboardPage from '@/views/AdminDashboardPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Admin Dashboard | Mango Law LLC',
  noindex: true,
  url: '/admin/dashboard',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <AdminDashboardPage />;
}
