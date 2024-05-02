import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="sidebar">
      <ul>
        <li className={router.pathname === '/dashboard' ? 'active' : ''}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={router.pathname === '/portfolio' ? 'active' : ''}>
          <Link href="/portfolio">My Portfolio</Link>
        </li>
        <li className={router.pathname === '/trading' ? 'active' : ''}>
          <Link href="/trading">Trading Bot</Link>
        </li>
        <li className={router.pathname === '/terminal' ? 'active' : ''}>
          <Link href="/terminal">Terminal</Link>
        </li>
        <li className={router.pathname === '/marketplace' ? 'active' : ''}>
          <Link href="/marketplace">Marketplace</Link>
        </li>
        {/* Add more sections as necessary */}
      </ul>
    </aside>
  );
};

export default Sidebar;
