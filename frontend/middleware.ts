import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // const token = req.cookies.get('access_token');

  // if (!token && req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  // return NextResponse.next();
}
