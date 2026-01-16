import type { Metadata } from 'next';
import AdminLoginPage from '@/views/AdminLoginPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Admin Login | Mango Law LLC',
  noindex: true,
  url: '/admin/login',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <AdminLoginPage />;
}
