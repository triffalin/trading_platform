import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../../styles/globals.css';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Trading Platform</title>
        <meta name="description" content="Auto-trading platform" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
