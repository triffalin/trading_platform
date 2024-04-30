import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#181a20] text-[#EAECEF] min-h-screen">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 py-10">
        <section
          className="hero mb-10 bg-cover bg-hero-pattern"
          style={{ backgroundImage: 'url(/path-to-hero-bg.jpg)' }}
        >
          <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">
              Meet Your New Crypto Trading Bots
            </h1>
            <p className="text-xl mb-6">
              Streamline your trading with advanced, automated tools designed
              for all market conditions.
            </p>
            <button className="bg-[#FCD535] hover:bg-[#F0B90B] text-black font-bold py-2 px-4 rounded">
              Start Trading
            </button>
          </div>
        </section>
        <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="feature-item bg-[#1E2329] p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Automated Trading</h2>
            <p>
              Optimize your strategies with bots that trade 24/7, keeping you
              ahead in every market scenario.
            </p>
          </div>
          <div className="feature-item bg-[#1E2329] p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Market Analytics</h2>
            <p>
              Access real-time insights and analytics to make informed decisions
              quickly and efficiently.
            </p>
          </div>
          <div className="feature-item bg-[#1E2329] p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Security</h2>
            <p>
              Top-tier security measures to keep your investments safe and your
              mind at ease.
            </p>
          </div>
        </section>
        <section className="testimonials bg-[#1E2329] p-6 rounded-lg mb-10">
          <h2 className="text-center font-bold text-2xl mb-4">
            Why Traders Choose Us
          </h2>
          <p className="text-center">
            Discover why our platform is the preferred choice for traders
            worldwide.
          </p>
        </section>
        <section className="call-to-action bg-[#FCD535] text-center p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Trading?</h2>
          <button className="bg-[#1E2329] hover:bg-[#F0B90B] text-white font-bold py-2 px-4 rounded">
            Join Now
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
