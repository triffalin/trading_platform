import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-binance-black shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="mr-4"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="#" className="text-white hover:text-binance-yellow">
            Trading Bots
          </Link>
          <Link href="#" className="text-white hover:text-binance-yellow">
            Features
          </Link>
          <Link href="#" className="text-white hover:text-binance-yellow">
            Plans
          </Link>
          <Link href="#" className="text-white hover:text-binance-yellow">
            Price Charts
          </Link>
          <Link href="#" className="text-white hover:text-binance-yellow">
            Developers
          </Link>
          <Link href="#" className="text-white hover:text-binance-yellow">
            Company
          </Link>
          <Link href="#" className="text-white hover:text-binance-yellow">
            Academy
          </Link>
        </div>

        {/* Authentication Links */}
        <div className="flex items-center space-x-2">
          {session ? (
            <button onClick={() => signOut()} className="btn-sign-out">
              Sign Out
            </button>
          ) : (
            <>
              <button onClick={() => signIn()} className="btn-sign-in">
                Sign In
              </button>
              <Link href="/register">
                <span className="btn-try-free">Try It Free</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
