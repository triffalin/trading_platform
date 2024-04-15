import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Qtrading</div>
      <nav>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
        <a href="/password-reset">Forgot Password?</a>
      </nav>
    </header>
  );
}

export default Header;
