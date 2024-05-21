import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

interface CustomToken extends JWT {
  roles: string[];
}

/**
 * Checks if the token includes specific roles.
 * @param token - The token to check.
 * @returns {boolean} Whether the token includes roles.
 */
function isCustomToken(token: any): token is CustomToken {
  return token && Array.isArray(token.roles);
}

/**
 * Middleware to handle token validation and role-based access control.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const token = (await getToken({ req: request })) as CustomToken;

    if (!token) {
      console.error('No token found, redirecting to login.');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (isCustomToken(token)) {
      if (!token.roles.includes('admin')) {
        console.error('Access denied for non-admin user.');
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } else {
      console.error('Invalid token structure:', token);
      return NextResponse.redirect(new URL('/error', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
