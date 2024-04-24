'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Footer sections */}
        <div>
          <h2 className="font-bold mb-2">Trading software</h2>
          {/* Add other links here */}
          <Link href="/features" className="block hover:text-gray-300">
            Features
          </Link>
          {/* ... */}
        </div>
        {/* Repeat for other columns */}

        {/* Social media and other links */}
        <div>
          <h2 className="font-bold mb-2">Follow us</h2>
          {/* Add social media links here */}
          {/* ... */}
        </div>

        {/* Logo and subscription form */}
        <div className="col-span-1 md:col-span-4">
          <div className="flex items-center justify-between">
            <Image src={logo} width={150} height={40} alt="Logo" />
            {/* Subscription form */}
            <form className="w-full max-w-sm">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email"
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-1 md:col-span-4 text-center md:text-left">
          <p>© 2024 My Trading Platform. All rights reserved.</p>
          {/* Add payment method images here */}
          {/* ... */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
