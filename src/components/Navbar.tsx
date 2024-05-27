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
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleSignIn = () => router.push('/auth/login');
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  const handleRegister = () => router.push('/auth/registration');

  const showSidebarButton =
    status === 'authenticated' && router.pathname !== '/';

  return (
    <nav className="bg-[#181a20] shadow-lg">
      <div className="container max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
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
          {showSidebarButton && (
            <button
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              className="ml-4"
            >
              <Image
                src={
                  isSidebarOpen
                    ? '/icons/toggle-sidebar2.svg'
                    : '/icons/toggle-sidebar.svg'
                }
                alt="Sidebar Toggle"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            className="md:hidden"
          >
            <Image
              src={isOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              alt="Menu"
              width={24}
              height={24}
            />
          </button>
          <div
            className={`md:flex md:items-center md:space-x-10 ${
              isOpen ? 'block' : 'hidden'
            }`}
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
            <Link
              href="/company"
              className="text-[#EAECEF] hover:text-[#FCD535]"
            >
              Company
            </Link>
            <Link
              href="/academy"
              className="text-[#EAECEF] hover:text-[#FCD535]"
            >
              Academy
            </Link>
            {status === 'authenticated' ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-[#EAECEF] bg-transparent hover:bg-[#FCD535] py-2 px-4 rounded transition-all duration-300"
                >
                  <Image
                    src="/icons/profile-icon.svg"
                    alt="Profile"
                    width={24}
                    height={24}
                    className="mr-4"
                  />
                  {isDropdownOpen ? (
                    <Image
                      src="/icons/arrow-up.svg"
                      alt="Arrow Up"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Image
                      src="/icons/arrow-down.svg"
                      alt="Arrow Down"
                      width={16}
                      height={16}
                    />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#242731] border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-[#EAECEF]">
                      {session?.user?.email}
                    </div>
                    <div className="border-t border-gray-300"></div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/dashboard.svg"
                        alt="Dashboard"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Dashboard
                    </Link>
                    <Link
                      href="/users/subscriptions/pricing"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/subscription.svg"
                        alt="Subscription"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Subscriptions
                    </Link>
                    <Link
                      href="/users/subscriptions/promo_code"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/promo-code.svg"
                        alt="Promo code"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Promo code
                    </Link>
                    <Link
                      href="/tracking_codes"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/invite-friends.svg"
                        alt="Invite Friends"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Invite Friends
                    </Link>
                    <Link
                      href="/portfolios/my_portfolios"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/portfolio.svg"
                        alt="Portfolio"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      My Portfolios
                    </Link>
                    <Link
                      href="/trader_diary"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/trader-diary.svg"
                        alt="Trader Diary"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Trader&apos;s Diary
                    </Link>
                    <Link
                      href="/users/profile"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/settings.svg"
                        alt="Settings"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Settings
                    </Link>
                    <Link
                      href="/api_access_tokens"
                      className="block px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/api.svg"
                        alt="API"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      API
                    </Link>
                    <div className="border-t border-gray-300"></div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-[#EAECEF] hover:bg-gray-700 hover:text-white"
                    >
                      <Image
                        src="/icons/logout.svg"
                        alt="Log Out"
                        width={16}
                        height={16}
                        className="inline mr-2"
                      />
                      Log Out
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
      </div>
    </nav>
  );
};

export default Navbar;
