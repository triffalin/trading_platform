import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Logo className="navbar-logo" />
      <div className="navbar-links">{/* Add links here */}</div>
      <div className="navbar-user-actions">{/* Sign in, Sign up, etc */}</div>
    </nav>
  );
}

export default NavBar;
