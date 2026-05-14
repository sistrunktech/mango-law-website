import { NextRequest, NextResponse } from 'next/server';

const canonicalOviPath = '/ovi-dui-defense-delaware-oh';

function redirectToCanonicalOviPage(request: NextRequest) {
  return NextResponse.redirect(new URL(canonicalOviPath, request.url), {
    status: 308,
  });
}

export function GET(request: NextRequest) {
  return redirectToCanonicalOviPage(request);
}

export function HEAD(request: NextRequest) {
  return redirectToCanonicalOviPage(request);
}
