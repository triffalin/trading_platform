import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

interface CustomToken extends JWT {
  roles: string[];
  // Add other expected properties of the token here
}

function isCustomToken(token: any): token is CustomToken {
  return token && Array.isArray(token.roles);
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (isCustomToken(token)) {
      // Now it's safe to assume token is of type CustomToken
      if (!token.roles.includes('admin')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } else {
      // Token is not of type CustomToken
      console.error('Invalid token structure:', token);
      return NextResponse.redirect(new URL('/error', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
