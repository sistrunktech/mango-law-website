import type { Metadata } from 'next';
import ResetPasswordPage from '@/views/ResetPasswordPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Reset Password | Mango Law LLC',
  noindex: true,
  url: '/admin/reset-password',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <ResetPasswordPage />;
}
