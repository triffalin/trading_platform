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
      <section className="features-part-three">
        <h2 className="features-part-three-title">
          The right tools for every kind of market.
        </h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Security</h3>
            <p>
              Experience secure trading with our platform's advanced encryption
              and two-factor authentication to protect your assets.
            </p>
          </div>
          <div className="feature-card">
            <h3>Trade Automation</h3>
            <p>
              Our trade automation tools keep your portfolio growing 24/7 with
              algorithms that adapt in real-time to market changes.
            </p>
          </div>
          <div className="feature-card">
            <h3>Analytics</h3>
            <p>
              Gain insights into your trades with comprehensive analytics that
              help you make informed decisions quickly.
            </p>
          </div>
        </div>
        <div className="features-part-three-outro">
          <h3>
            Level up your trading game with advanced AI crypto trading tools.
          </h3>
          <p>
            Our suite of tools is designed to give you an edge in 14 of the
            biggest exchanges, providing you with strategies that were once only
            available to professionals.
          </p>
          <button className="cta-button">Start trial</button>
        </div>
      </section>
      <section className="testimonials-section">
        <h2 className="testimonials-title">Why Traders Trust Our Platform</h2>
        <div className="testimonials-wrapper">
          <div className="testimonial-item">
            <p className="testimonial-quote">
              "The intuitive design and the automated trading bots have
              transformed my trading strategy. Absolutely recommend!"
            </p>
            <p className="testimonial-author">— Morgan, Verified User</p>
          </div>
          <div className="testimonial-item">
            <p className="testimonial-quote">
              "Their customer support and analytics tools are top-notch. Made
              learning crypto trading so much easier!"
            </p>
            <p className="testimonial-author">— Casey, Active Trader</p>
          </div>
          <div className="testimonial-item">
            <p className="testimonial-quote">
              "Seeing substantial returns on my investments, thanks to the
              sophisticated trade algorithms. Solid platform."
            </p>
            <p className="testimonial-author">— Alex, Crypto Enthusiast</p>
          </div>
        </div>
      </section>
      <section className="call-to-action-section-last">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Take the Lead?</h2>
          <p className="cta-text">
            Unlock your trading potential with the advanced features and
            intuitive interface of our platform.
          </p>
          <button className="cta-button">Join Us Now</button>
        </div>
      </section>
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-column">
            <h4 className="footer-heading">Trading Software</h4>
            {/* List of links */}
          </div>
          {/* ... More footer columns */}

          <div className="footer-bottom">
            <p>&copy; 2024 Qtrading. All rights reserved.</p>
            {/* Social media icons */}
            {/* Payment icons */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
