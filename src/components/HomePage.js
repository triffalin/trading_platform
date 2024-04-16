import React from 'react';
import NavBar from './NavBar';
import HeroSection from './sections/HeroSection.js';
import FeaturesSection from './sections/FeaturesSection.js';
import TestimonialsSection from './sections/TestimonialsSection.js';
import CallToActionSection from './sections/CallToActionSection.js';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}

export default HomePage;
