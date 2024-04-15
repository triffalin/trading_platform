import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Qtrading</div>
      <nav aria-label="Main navigation">
        <a href="/signin" aria-label="Sign in">
          Sign In
        </a>
        <a href="/signup" aria-label="Sign up">
          Sign Up
        </a>
        <a href="/password-reset" aria-label="Forgot password">
          Forgot Password?
        </a>
      </nav>
    </header>
  );
}

export default Header;
