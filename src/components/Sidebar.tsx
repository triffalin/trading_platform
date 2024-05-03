import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

type MenuLink = {
  path: string;
  label: string;
};

const Sidebar = () => {
  const router = useRouter();
  const [isDcaOpen, setDcaOpen] = useState(false);
  const [isSmartTradeOpen, setSmartTradeOpen] = useState(false);

  const menuClasses = (path: string) =>
    classNames(
      'block px-3 py-2 rounded-md transition duration-300 ease-in-out',
      {
        'bg-gray-800 text-white': router.pathname === path,
        'text-gray-300 hover:bg-gray-700 hover:text-white':
          router.pathname !== path
      }
    );

  const menuLink = (path: string, label: string) => (
    <li>
      <Link href={path} className={menuClasses(path)}>
        {label}
      </Link>
    </li>
  );

  const expandableMenu = (
    label: string,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    links: MenuLink[]
  ) => (
    <li className="group">
      <button
        className={menuClasses('') + ' flex justify-between w-full text-left'}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className="pl-8">
          {links.map(link => menuLink(link.path, link.label))}
        </ul>
      )}
    </li>
  );

  return (
    <aside className="sidebar bg-binance-black text-gray-300 w-64 space-y-4 py-7 pl-5 fixed inset-y-0 left-0 transform md:relative transition duration-200 ease-in-out">
      <ul className="text-sm">
        <li className="text-gray-400 uppercase tracking-wide mb-2">Trading</li>
        {menuLink('/dashboard', 'Dashboard')}
        {menuLink('/accounts', 'My Portfolio')}
        {menuLink('/control_panel', 'Control Panel')}
        {menuLink('/signal_bots', 'Signal Bot')}
        {expandableMenu('DCA Bot', isDcaOpen, setDcaOpen, [
          { path: '/deals', label: 'My Deals' },
          { path: '/deals/history', label: 'History' },
          { path: '/marketplace/presets', label: 'Presets' }
        ])}
        {menuLink('/grid_bots', 'GRID Bot')}
        {expandableMenu('Smart Trade', isSmartTradeOpen, setSmartTradeOpen, [
          { path: '/about_st', label: 'Introduction' },
          { path: '/smart_trades/history', label: 'History' }
        ])}
        {menuLink('/trades_terminal', 'Terminal')}
        {menuLink('/marketplace', 'Marketplace')}
        <li className="text-gray-400 uppercase tracking-wide mt-4">Other</li>
        {menuLink('/dashboard/apps', 'Store')}
        {menuLink('/tracking_codes', 'Invite Friends')}
        {menuLink('/users/subscriptions/pricing', 'Subscriptions')}
      </ul>
    </aside>
  );
};

export default Sidebar;
