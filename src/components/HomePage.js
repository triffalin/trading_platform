import React from 'react';
import HeroSection from './sections/HeroSection.js';
import FeaturesSection from './sections/FeaturesSection.js';
import TestimonialsSection from './sections/TestimonialsSection.js';
import CallToActionSection from './sections/CallToActionSection.js';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
}

export default HomePage;
