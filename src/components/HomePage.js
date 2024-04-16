import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Empower Your Trading Experience</h1>
          <p className="hero-subheading">
            Seize the potential of automated crypto trading with precision and
            speed, leveraging the power of advanced algorithms to stay ahead in
            the dynamic crypto market.
          </p>
          <button className="cta-button">Start Free Trial</button>
        </div>
        <div className="hero-image">
          {/* Ensure the path to your image is correct */}
          <img
            src={require('../assets/hero.svg').default}
            alt="Crypto Trading"
          />
        </div>
      </header>
      <section className="features-section">
        <h2 className="features-title">
          Maximize Your Trades Across Market Conditions
        </h2>
        <p className="features-intro">
          Tailored strategies for bear, bull, and sideways markets empower you
          to optimize every trade with our platform.
        </p>
        <div className="market-strategies">
          <div className="strategy">
            <h3>— Bear Markets</h3>
            <p>
              Deploy counter-trend strategies with our robust tools to
              capitalize on market downturns.
            </p>
          </div>
          <div className="strategy">
            <h3>— Bull Markets</h3>
            <p>
              Amplify your gains with strategies designed to ride the upward
              momentum to its peak.
            </p>
          </div>
          <div className="strategy">
            <h3>— Sideways Markets</h3>
            <p>
              Master the art of range trading with tools that help you profit
              from market stability.
            </p>
          </div>
        </div>
        <p className="features-outro">
          Discover the paths to consistent profits with the advanced technology
          of our trading platform.
        </p>
        <button className="cta-button">Start Free Trial</button>
      </section>
      <section className="features-part-two">
        <h2 className="features-part-two-title">
          Crypto is complex, but our platform simplifies success
        </h2>
        <div className="features-wrapper">
          <article className="feature-item">
            <h3>Intelligent Trading Systems</h3>
            <p>
              Automate your trading with our intelligent systems that learn
              market patterns and execute trades at the best possible times.
            </p>
            <button className="features-cta-button">Sign Up</button>
          </article>
          <article className="feature-item">
            <h3>Portfolio Management</h3>
            <p>
              Centralize your crypto assets and manage your investment portfolio
              with precision and ease on our platform.
            </p>
            <button className="features-cta-button">
              Create your portfolio
            </button>
          </article>
          <article className="feature-item">
            <h3>Trade with Bots</h3>
            <p>
              Copy trade settings from seasoned experts or create your own with
              our customizable bot presets, simplifying your trading journey.
            </p>
            <button className="features-cta-button">
              Select a trading bot
            </button>
          </article>
        </div>
      </section>
      <section className="testimonials-section">
        {/* ... Your testimonials section code ... */}
      </section>
      <section className="call-to-action-section">
        {/* ... Your call to action section code ... */}
      </section>
    </div>
  );
};

export default HomePage;
