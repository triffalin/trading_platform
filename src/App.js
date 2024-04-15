import React from 'react';
import Header from './components/Header.js';
import HomePage from './components/HomePage.js';
import Footer from './components/Footer.js';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default App;
