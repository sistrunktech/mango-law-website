import type { Metadata } from 'next';
import ForgotPasswordPage from '@/views/ForgotPasswordPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Forgot Password | Mango Law LLC',
  noindex: true,
  url: '/admin/forgot-password',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <ForgotPasswordPage />;
}
