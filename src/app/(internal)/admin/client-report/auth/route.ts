import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  createClientReportCookieValue,
  getSessionMaxAgeSeconds,
  isValidPassword,
} from '../_lib/auth';

const COOKIE_NAME = 'client_report_access';

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get('password') ?? '').trim();

  if (!process.env.CLIENT_REPORT_PASSWORD) {
    return NextResponse.redirect(new URL('/admin/client-report/access?error=misconfigured', req.url), {
      status: 303,
    });
  }

  if (!password) {
    return NextResponse.redirect(new URL('/admin/client-report/access?error=missing', req.url), {
      status: 303,
    });
  }

  if (!isValidPassword(password)) {
    return NextResponse.redirect(new URL('/admin/client-report/access?error=invalid', req.url), {
      status: 303,
    });
  }

  const maxAge = getSessionMaxAgeSeconds();
  const secure = process.env.NODE_ENV === 'production';

  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: createClientReportCookieValue(),
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/admin/client-report',
    maxAge,
  });

  return NextResponse.redirect(new URL('/admin/client-report', req.url), { status: 303 });
}
