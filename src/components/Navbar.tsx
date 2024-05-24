import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignIn = () => router.push('/auth/login');
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  const handleRegister = () => router.push('/auth/registration');

  return (
    <nav className="bg-[#181a20] shadow-lg">
      <div className="container max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          className="md:hidden"
        >
          <Image src="/menu-icon.svg" alt="Menu" width={80} height={80} />
        </button>
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="mr-4"
            priority
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
          {status === 'authenticated' ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-[#EAECEF] bg-transparent hover:bg-[#FCD535] py-2 px-4 rounded border border-[#FCD535] transition-all duration-300"
              >
                {session?.user?.email || 'User'}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                  <Link
                    href="/users/subscriptions/pricing"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Subscriptions
                  </Link>
                  <Link
                    href="/users/subscriptions/promo_code"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Promo code
                  </Link>
                  <Link
                    href="/tracking_codes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Invite Friends
                  </Link>
                  <Link
                    href="/portfolios/my_portfolios"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Portfolios
                  </Link>
                  <Link
                    href="/trader_diary"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Trader&apos;s Diary
                  </Link>
                  <Link
                    href="/users/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/api_access_tokens"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Qtrading API
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
