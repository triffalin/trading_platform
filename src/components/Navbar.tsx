import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = () => router.push('/auth/login');
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  const handleRegister = () => router.push('/auth/registration');

  return (
    <nav className="bg-[#181a20] shadow-lg">
      <div className="container max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="mr-4"
          />
        </Link>

        {/* Navigation Links */}
        {/* TODO: Update these links to actual paths once page sections are ready */}
        <div className="hidden md:flex items-center space-x-4">
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
        </div>

        {/* Authentication Links */}
        <div className="flex items-center space-x-2">
          {session ? (
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
                className="text-[#181a20] bg-[#FCD535] hover:bg-[#F0B90B] py-2 px-4 rounded border border-[#FCD535]"
              >
                Try It Free
              </button>
            </>
          )}
        </div>
      </div>
      {/* TODO: Implement a hamburger menu for mobile responsiveness */}
    </nav>
  );
};

export default Navbar;
