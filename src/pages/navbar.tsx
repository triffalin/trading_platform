import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      {/* Logo and Navigation Links */}
      <Link href="/">Home</Link>
      {/* ... other links ... */}

      {/* Authentication Links */}
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign In</button>
          <Link href="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
