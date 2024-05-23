import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log('Session Data:', session); // Log session data
  console.log('Session Status:', status); // Log session status

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignIn = () => router.push('/auth/login');
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  const handleRegister = () => router.push('/auth/registration');

  // Function to ensure that user is effectively logged in before showing "Sign Out"
  const isUserLoggedIn = () => {
    return status === 'authenticated'; // Check if the user is authenticated
  };

  return (
    <nav className="bg-[#181a20] shadow-lg">
      <div className="container max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          className="md:hidden"
        >
          <Image src="/menu-icon.svg" alt="Menu" width={24} height={24} />
        </button>
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="mr-4"
          />
        </Link>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-10`}
        >
          <Link
            href="/trading-bots"
            className="text-[#EAECEF] hover:text-[#FCD535]"
          >
            Trading Bots
          </Link>
          <Link
            href="/features"
            className="text-[#EAECEF] hover:text-[#FCD535]"
          >
            Features
          </Link>
          <Link href="/plans" className="text-[#EAECEF] hover:text-[#FCD535]">
            Plans
          </Link>
          <Link
            href="/price-charts"
            className="text-[#EAECEF] hover:text-[#FCD535]"
          >
            Price Charts
          </Link>
          <Link
            href="/developers"
            className="text-[#EAECEF] hover:text-[#FCD535]"
          >
            Developers
          </Link>
          <Link href="/company" className="text-[#EAECEF] hover:text-[#FCD535]">
            Company
          </Link>
          <Link href="/academy" className="text-[#EAECEF] hover:text-[#FCD535]">
            Academy
          </Link>
          {isUserLoggedIn() ? (
            <button
              onClick={handleSignOut}
              className="text-[#EAECEF] bg-transparent hover:bg-[#FCD535] py-2 px-4 rounded border border-[#FCD535] transition-all duration-300"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className="text-[#EAECEF] bg-transparent hover:bg-[#FCD535] py-2 px-4 rounded border border-[#FCD535] transition-all duration-300"
              >
                Sign In
              </button>
              <button
                onClick={handleRegister}
                className="text-[#181a20] bg-[#FCD535] hover:bg-[#F0B90B] py-2 px-4 rounded border border-[#FCD535] transition-all duration-300"
              >
                Try It Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
