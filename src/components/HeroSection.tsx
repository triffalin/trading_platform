const HeroSection = () => (
  <section
    className="hero mb-10 bg-cover bg-hero-pattern"
    style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
  >
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">
        Meet Your New Crypto Trading Bots
      </h1>
      <p className="text-xl mb-6">
        Streamline your trading with advanced, automated tools designed for all
        market conditions.
      </p>
      <button className="bg-[#FCD535] hover:bg-[#F0B90B] text-black font-bold py-2 px-4 rounded">
        Start Trading
      </button>
    </div>
  </section>
);

export default HeroSection;
