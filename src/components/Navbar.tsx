'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.svg';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:space-x-10">
          <div>
            <Link href="/" className="flex" passHref>
              <Image src={logo} width={150} height={40} alt="Logo" priority />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {/* Icon for Menu */}
              <span>Menu</span> {/* Replace with Menu Icon */}
            </button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              href="/auth/login"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              passHref
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              passHref
            >
              Try It Free
            </Link>
          </div>
        </div>

        {/* Mobile menu, show/hide based on mobile menu state. */}
        <div className={isMobileMenuOpen ? 'md:hidden' : 'hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            {/* Mobile Navigation Links */}
            <Link
              href="/trading-bots"
              className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              passHref
            >
              Trading Bots
            </Link>
            <Link
              href="/features"
              className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              passHref
            >
              Features
            </Link>
            {/* ... More Links */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
