import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/features">Features</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/pricing">Pricing</Link>
          {/* ... other links ... */}
        </div>

        {/* Authentication Links */}
        <div className="flex items-center space-x-2">
          {session ? (
            <button
              onClick={() => signOut()}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
              >
                Sign In
              </button>
              <Link href="/register">
                <span className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300">
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
