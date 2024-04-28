import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-4">
      <div className="flex justify-between">
        <div>About Us</div>
        <div>Contacts</div>
        <div>Follow Us</div>
      </div>
    </footer>
  );
};

export default Footer;
