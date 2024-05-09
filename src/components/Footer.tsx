import React, { memo } from 'react';

interface FooterLinkProps {
  title: string;
  links: { name: string; url: string }[];
}

const FooterColumn: React.FC<FooterLinkProps> = memo(({ title, links }) => (
  <div aria-label={`${title} links`} className="text-left">
    <h5 className="font-bold mb-3">{title}</h5>
    <ul>
      {links.map(link => (
        <li key={link.name}>
          <a href={link.url} className="hover:underline">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
));

FooterColumn.displayName = 'FooterColumn';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Trading Software',
      links: [
        { name: 'Features', url: '#' },
        { name: 'GRID Bot', url: '#' },
        { name: 'DCA Bot', url: '#' },
        { name: 'Signal Bot', url: '#' },
        { name: 'Smart Trade', url: '#' },
        { name: 'TradingView', url: '#' },
        { name: 'Crypto-Signals', url: '#' },
        { name: 'Exchanges', url: '#' },
        { name: 'System Status', url: '#' }
      ]
    },
    {
      title: 'Trading Bots',
      links: [
        { name: 'Binance', url: '#' },
        { name: 'Bitstamp', url: '#' },
        { name: 'Bitfinex', url: '#' },
        { name: 'Coinbase', url: '#' },
        { name: 'OKX', url: '#' },
        { name: 'KuCoin', url: '#' },
        { name: 'HTX', url: '#' },
        { name: 'Bybit', url: '#' },
        { name: 'Krakon', url: '#' },
        { name: 'Ripple', url: '#' },
        { name: 'Ethereum', url: '#' },
        { name: 'Dogecoin', url: '#' }
      ]
    },
    {
      title: 'For Developers',
      links: [
        { name: 'Qtrading Apps', url: '#' },
        { name: 'Apps Chat', url: '#' },
        { name: 'API Git', url: '#' },
        { name: 'API Chat', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Affiliate program', url: '#' },
        { name: 'Qtrading & Binance', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Knowledge Base', url: '#' },
        { name: 'FAQ', url: '#' },
        { name: 'Reviews', url: '#' }
      ]
    }
    // More columns...
  ];

  return (
    <footer className="bg-[#181a20] text-[#EAECEF] text-sm p-10 mx-auto">
      <div className="container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
        {footerLinks.map(column => (
          <FooterColumn
            key={column.title}
            title={column.title}
            links={column.links}
          />
        ))}
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>© Qtrading, 2024. All rights reserved.</p>
        <p>
          Qtrading provides software only. Any references to trading, exchange,
          etc. are references to services provided by third-party service
          providers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
