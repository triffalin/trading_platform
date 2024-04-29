import { useSession } from 'next-auth/react';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar session={session} />
      {/* Main content */}
      <main className="main-content">
        <section className="hero">{/* Hero section content */}</section>
        <section className="benefits">{/* Benefits section content */}</section>
        {/* Other sections */}
      </main>
      <Footer />
    </div>
  );
}