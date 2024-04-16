import React from 'react';
import '../styles/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">YourLogo</a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/features">Features</a>
        </li>
        <li>
          <a href="/pricing">Pricing</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="/support">Support</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
