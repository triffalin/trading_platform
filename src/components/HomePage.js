import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header
        style={{
          padding: '100px 0',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          color: 'black',
          fontSize: '2rem'
        }}
      >
        Welcome to Our Trading Platform
      </header>
      <section style={{ margin: '40px 0', textAlign: 'center' }}>
        <p>
          Explore features and tools built for individual traders and
          sophisticated investors.
        </p>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#4b59f7',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HomePage;
