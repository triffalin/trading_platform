import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={require('../assets/logo.svg').default} alt="Logo" />
      </Link>
      <div className="navbar-links">
        <Link to="/trading-bots">Trading Bots</Link>
        <Link to="/features">Features</Link>
        <Link to="/plans">Plans</Link>
        <Link to="/price-charts">Price Charts</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/company">Company</Link>
        <Link to="/academy">Academy</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up" className="navbar-signup">
          Try It Free
        </Link>
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </nav>
  );
};

export default NavBar;
