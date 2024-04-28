import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      <div className="logo">
        <Link href="/">
          <a>Trading Platform</a>
        </Link>
      </div>
      <div>
        {session ? (
          <Link href="/dashboard">
            <a className="p-2">Dashboard</a>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
            <Link href="/register">
              <a className="p-2">Register</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
