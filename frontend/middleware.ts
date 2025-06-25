import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get('access_token');

  if (!token && pathname !== '/login' && pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
