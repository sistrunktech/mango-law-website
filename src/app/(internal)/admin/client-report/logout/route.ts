import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'client_report_access';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin/client-report',
    maxAge: 0,
  });

  return NextResponse.redirect(new URL('/admin/client-report/access', req.url), { status: 303 });
}
