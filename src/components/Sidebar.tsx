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
          <Link href="/accounts">My Portfolio</Link>
        </li>
        <li className={router.pathname === '/trading' ? 'active' : ''}>
          <Link href="/control_panel">Control Panel</Link>
        </li>
        <li className={router.pathname === '/trading' ? 'active' : ''}>
          <Link href="/signal_bots">Signal Bot</Link>
        </li>
        <li className={router.pathname === '/trading' ? 'active' : ''}>
          <Link href="/bots">DCA Bot</Link>
        </li>
        <li className={router.pathname === '/trading' ? 'active' : ''}>
          <Link href="/grid_bots">GRID Bot</Link>
        </li>
        <li className={router.pathname === '/trading' ? 'active' : ''}>
          <Link href="/smart_trades/new">Smart Trade</Link>
        </li>
        <li className={router.pathname === '/terminal' ? 'active' : ''}>
          <Link href="/trades_terminal">Terminal</Link>
        </li>
        <li className={router.pathname === '/marketplace' ? 'active' : ''}>
          <Link href="/marketplace">Marketplace</Link>
        </li>
        <li className={router.pathname === '/marketplace' ? 'active' : ''}>
          <Link href="/dashboard/apps">Store</Link>
        </li>
        <li className={router.pathname === '/marketplace' ? 'active' : ''}>
          <Link href="/tracking_codes">Invite Friends</Link>
        </li>
        <li className={router.pathname === '/marketplace' ? 'active' : ''}>
          <Link href="/users/subscriptions/pricing">Subscriptions</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
