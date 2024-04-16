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
        {/* ... Your features section code ... */}
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
