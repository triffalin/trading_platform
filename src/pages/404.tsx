import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Custom404: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#181a20] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">
        Oops! The page you are looking for has disappeared or never existed.
      </p>
      <Link
        href="/"
        className="text-[#FCD535] hover:text-[#F0B90B] text-xl font-semibold"
        aria-label="Return to the homepage"
      >
        Go back home
      </Link>
      <div className="mt-8">
        <Image src="/logo.svg" alt="Logo" width={300} height={150} priority />
      </div>
    </main>
  );
};

export default Custom404;
