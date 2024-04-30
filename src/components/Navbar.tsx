import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-[#181a20] shadow-lg">
      <div className="container max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
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
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Trading Bots
          </Link>
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Features
          </Link>
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Plans
          </Link>
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Price Charts
          </Link>
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Developers
          </Link>
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Company
          </Link>
          <Link href="#" className="text-[#EAECEF] hover:text-[#FCD535]">
            Academy
          </Link>
        </div>

        {/* Authentication Links */}
        <div className="flex items-center space-x-2">
          {session ? (
            <button
              onClick={() => signOut()}
              className="text-[#EAECEF] bg-transparent hover:bg-[#FCD535] py-2 px-4 rounded border border-[#FCD535] transition-all duration-300"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="text-[#EAECEF] bg-transparent hover:bg-[#FCD535] py-2 px-4 rounded border border-[#FCD535] transition-all duration-300"
              >
                Sign In
              </button>
              <Link href="/register">
                <span className="text-[#181a20] bg-[#FCD535] hover:bg-[#F0B90B] py-2 px-4 rounded border border-[#FCD535]">
                  Try It Free
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
