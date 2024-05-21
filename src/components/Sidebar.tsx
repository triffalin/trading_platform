import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface MenuLink {
  path: string;
  label: string;
}

interface ExpandableMenuProps {
  label: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  links: MenuLink[];
}

const MenuLinkComponent: React.FC<MenuLink> = ({ path, label }) => {
  const router = useRouter();
  const linkClass = classNames(
    'block px-3 py-2 rounded-md transition duration-300 ease-in-out',
    {
      'bg-gray-800 text-white': router.pathname === path,
      'text-gray-300 hover:bg-gray-700 hover:text-white':
        router.pathname !== path
    }
  );

  return (
    <li>
      <Link href={path} className={linkClass}>
        {label}
      </Link>
    </li>
  );
};

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({
  label,
  isOpen,
  setIsOpen,
  links
}) => (
  <li className="group">
    <button
      className="flex justify-between w-full text-left px-3 py-2 rounded-md"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
    >
      {label}
      <span>{isOpen ? '▼' : '►'}</span>
    </button>
    {isOpen && (
      <ul className="pl-6">
        {links.map((link, index) => (
          <MenuLinkComponent key={index} path={link.path} label={link.label} />
        ))}
      </ul>
    )}
  </li>
);

const Sidebar: React.FC = () => {
  const [isDcaOpen, setDcaOpen] = useState(false);
  const [isSmartTradeOpen, setSmartTradeOpen] = useState(false);

  const dcaLinks: MenuLink[] = [
    { path: '/deals', label: 'My Deals' },
    { path: '/deals/history', label: 'History' },
    { path: '/marketplace/presets', label: 'Presets' }
  ];

  const smartTradeLinks: MenuLink[] = [
    { path: '/about_st', label: 'Introduction' },
    { path: '/smart_trades/history', label: 'History' }
  ];

  return (
    <aside className="sidebar bg-gray-800 text-white w-64 space-y-4 py-7 pl-5 fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform md:duration-200 ease-in-out">
      <ul className="text-sm">
        <li className="text-gray-400 uppercase tracking-wide mb-2">Trading</li>
        <MenuLinkComponent path="/dashboard" label="Dashboard" />
        <MenuLinkComponent path="/accounts" label="My Portfolio" />
        <MenuLinkComponent path="/control_panel" label="Control Panel" />
        <MenuLinkComponent path="/signal_bots" label="Signal Bot" />
        <ExpandableMenu
          label="DCA Bot"
          isOpen={isDcaOpen}
          setIsOpen={setDcaOpen}
          links={dcaLinks}
        />
        <MenuLinkComponent path="/grid_bots" label="GRID Bot" />
        <ExpandableMenu
          label="Smart Trade"
          isOpen={isSmartTradeOpen}
          setIsOpen={setSmartTradeOpen}
          links={smartTradeLinks}
        />
        <MenuLinkComponent path="/trades_terminal" label="Terminal" />
        <MenuLinkComponent path="/marketplace" label="Marketplace" />
        <li className="text-gray-400 uppercase tracking-wide mt-4 mb-2">
          Other
        </li>
        <MenuLinkComponent path="/dashboard/apps" label="Store" />
        <MenuLinkComponent path="/tracking_codes" label="Invite Friends" />
        <MenuLinkComponent
          path="/users/subscriptions/pricing"
          label="Subscriptions"
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
