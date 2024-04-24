import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import logo from '../../public/images/logo.svg';
const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Welcome to Trading Platform</title>
        <meta
          name="description"
          content="Your ultimate tool for smart trading."
        />
      </Head>
      {/* Homepage content goes here */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center">
        <Image
          src={logo}
          alt="Trading Platform Logo"
          width={200}
          height={100}
          priority
        />
        <h1 className="mt-5 text-4xl font-bold">Welcome to Trading Platform</h1>
        <p className="mt-2 text-lg">Your ultimate tool for smart trading.</p>
        {/* Other content sections */}
      </section>
    </>
  );
};

export default Home;
