import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';

interface MenuLink {
  path: string;
  label: string;
  icon: string;
}

interface ExpandableMenuProps {
  label: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  links: MenuLink[];
  icon: string;
}

const MenuLinkComponent: React.FC<MenuLink> = ({ path, label, icon }) => {
  const router = useRouter();
  const linkClass = classNames(
    'block flex items-center px-3 py-2 rounded-md transition duration-300 ease-in-out',
    {
      'bg-gray-700 text-white': router.pathname === path,
      'text-gray-300 hover:bg-gray-700 hover:text-white':
        router.pathname !== path
    }
  );

  return (
    <li>
      <Link href={path} className={linkClass}>
        <Image src={icon} alt={label} width={16} height={16} className="mr-2" />
        {label}
      </Link>
    </li>
  );
};

const ExpandableMenu: React.FC<ExpandableMenuProps> = ({
  label,
  isOpen,
  setIsOpen,
  links,
  icon
}) => (
  <li className="group">
    <button
      className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
    >
      <div className="flex items-center">
        <Image src={icon} alt={label} width={16} height={16} className="mr-2" />
        {label}
      </div>
      <span>{isOpen ? '▼' : '►'}</span>
    </button>
    {isOpen && (
      <ul className="pl-6">
        {links.map((link, index) => (
          <MenuLinkComponent
            key={index}
            path={link.path}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </ul>
    )}
  </li>
);

const Sidebar: React.FC = () => {
  const [isDcaOpen, setDcaOpen] = useState(false);
  const [isSmartTradeOpen, setSmartTradeOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const dcaLinks: MenuLink[] = [
    { path: '/deals', label: 'My Deals', icon: '/icons/deals.svg' },
    {
      path: '/deals/history',
      label: 'History',
      icon: '/icons/trader-diary.svg'
    },
    {
      path: '/marketplace/presets',
      label: 'Presets',
      icon: '/icons/presets.svg'
    }
  ];

  const smartTradeLinks: MenuLink[] = [
    {
      path: '/about_st',
      label: 'Introduction',
      icon: '/icons/introduction.svg'
    },
    {
      path: '/smart_trades/history',
      label: 'History',
      icon: '/icons/trader-diary.svg'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={`bg-[#181a20] text-white w-60 space-y-4 py-7 pl-5 fixed top-17 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } 2xl:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <ul className="text-sm">
        <li className="text-gray-400 uppercase tracking-wide mb-2">Trading</li>
        <MenuLinkComponent
          path="/dashboard"
          label="Dashboard"
          icon="/icons/dashboard.svg"
        />
        <MenuLinkComponent
          path="/accounts"
          label="My Portfolio"
          icon="/icons/portfolios.svg"
        />
        <MenuLinkComponent
          path="/control_panel"
          label="Control Panel"
          icon="/icons/control-panel.svg"
        />
        <MenuLinkComponent
          path="/signal_bots"
          label="Signal Bot"
          icon="/icons/signal-bot.svg"
        />
        <ExpandableMenu
          label="DCA Bot"
          isOpen={isDcaOpen}
          setIsOpen={setDcaOpen}
          links={dcaLinks}
          icon="/icons/dca-bot.svg"
        />
        <MenuLinkComponent
          path="/grid_bots"
          label="GRID Bot"
          icon="/icons/grid-bot.svg"
        />
        <ExpandableMenu
          label="Smart Trade"
          isOpen={isSmartTradeOpen}
          setIsOpen={setSmartTradeOpen}
          links={smartTradeLinks}
          icon="/icons/smart-trade.svg"
        />
        <MenuLinkComponent
          path="/trades_terminal"
          label="Terminal"
          icon="/icons/terminal.svg"
        />
        <MenuLinkComponent
          path="/marketplace"
          label="Marketplace"
          icon="/icons/marketplace.svg"
        />
        <li className="text-gray-400 uppercase tracking-wide mt-4 mb-2">
          Other
        </li>
        <MenuLinkComponent
          path="/dashboard/apps"
          label="Store"
          icon="/icons/store.svg"
        />
        <MenuLinkComponent
          path="/tracking_codes"
          label="Invite Friends"
          icon="/icons/invite-friends.svg"
        />
        <MenuLinkComponent
          path="/users/subscriptions/pricing"
          label="Subscriptions"
          icon="/icons/subscription.svg"
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
