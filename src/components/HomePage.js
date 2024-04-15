import React from 'react';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="intro-section">
        <h1>Trade Smarter, Faster, and Safer</h1>
        <p>
          Welcome to Qtrading, where we harness the power of technology to
          elevate your trading experience. Our platform is designed to bring
          unparalleled efficiency to your financial ventures.
        </p>
        <button>Start Trading</button>
      </section>

      <section className="features-section">
        <div className="feature">
          <h2>Advanced Analytics</h2>
          <p>
            Gain insights like never before with our state-of-the-art analytics
            tools, tailored to provide you with the data you need to make
            informed decisions.
          </p>
        </div>
        <div className="feature">
          <h2>Automated Strategies</h2>
          <p>
            Let our automated trading systems implement your strategies round
            the clock, ensuring you never miss an opportunity.
          </p>
        </div>
        <div className="feature">
          <h2>Secure Transactions</h2>
          <p>
            Your security is our priority. Trade with confidence, knowing your
            data and investments are protected by cutting-edge security
            measures.
          </p>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Traders Say</h2>
        <div className="testimonial">
          <blockquote>
            "Qtrading transformed the way I trade. The intuitive design and
            powerful tools have made it easier than ever to stay on top of the
            market."
          </blockquote>
          <cite>- Alex Mercer, Day Trader</cite>
        </div>
        <div className="testimonial">
          <blockquote>
            "The analytics on Qtrading are unmatched. I've been able to optimize
            my strategies and see a real impact on my returns."
          </blockquote>
          <cite>- Jamie Lawson, Crypto Investor</cite>
        </div>
      </section>

      <section className="call-to-action-section">
        <h2>Join the Qtrading Community</h2>
        <p>
          Discover a new realm of trading possibilities. Register now and take
          the first step towards trading excellence.
        </p>
        <button>Sign Up Now</button>
      </section>
    </div>
  );
}

export default HomePage;
