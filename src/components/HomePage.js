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
