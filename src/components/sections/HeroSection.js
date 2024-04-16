import React from 'react';
import '../../styles/HeroSection.css';
import heroBackground from '../../assets/trading-bot.png';

function HeroSection() {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <h1>Your Ultimate Crypto Trading Bot</h1>
      <p>Experience automated trading like never before</p>
      {/* Add any call to action button if needed */}
    </div>
  );
}

export default HeroSection;
