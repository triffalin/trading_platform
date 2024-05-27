import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

interface WidgetProps {
  title: string;
  content: string;
  icon: string;
  link: string;
}

interface WidgetData {
  title: string;
  content: string;
  icon: string;
  link: string;
}

const DashboardWidget: React.FC<WidgetProps> = React.memo(
  ({ title, content, icon, link }) => (
    <div className="widget flex flex-col justify-between">
      <div>
        <div className="icon mb-4">
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
        <h3 className="font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{content}</p>
      </div>
      <Link
        href={link}
        className="text-binance-yellow hover:text-hover-yellow flex items-center"
      >
        Learn more
        <Image
          src="/icons/link.svg"
          alt="link icon"
          width={16}
          height={16}
          className="ml-1"
        />
      </Link>
    </div>
  )
);

DashboardWidget.displayName = 'DashboardWidget';

const DashboardContent: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    router.query.tab === 'guide' ? 'guide' : 'main'
  );

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(tab === 'guide' ? '/dashboard?tab=guide' : '/dashboard');
  };

  const widgets: WidgetData[] = [
    {
      title: 'DCA Bot',
      content:
        'DCA Bot is infinitely flexible, but the core function is to buy and sell at advantageous times, based on market conditions.',
      icon: '/icons/dca-bot.svg',
      link: '#'
    },
    {
      title: 'GRID Bot',
      content:
        'Qtrading GRID Bot is a tool that can help you succeed from even the smallest price fluctuations in the market.',
      icon: '/icons/grid-bot.svg',
      link: '#'
    },
    {
      title: 'Signal Bot',
      content:
        'Manage your trading positions using webhooks, alerts, TradingView strategies, and custom filters that include manual signal confirmation.',
      icon: '/icons/signal-bot.svg',
      link: '#'
    },
    {
      title: 'SmartTrade',
      content:
        'Manage all your exchanges in one easy-to-use interface. Strategize your trades using advanced order conditions for entering and exiting deals.',
      icon: '/icons/smart-trade.svg',
      link: '#'
    }
  ];

  return (
    <div className="dashboard-content max-w-screen-xl mx-auto">
      <h1 className="text-lg font-bold text-white mb-4">Dashboard</h1>
      <div className="tabs-container flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === 'main'
              ? 'border-b-2 border-[#f0b90b] text-[#eaecef]'
              : 'text-gray-400'
          }`}
          onClick={() => handleTabClick('main')}
        >
          Main
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'guide'
              ? 'border-b-2 border-[#f0b90b] text-[#eaecef]'
              : 'text-gray-400'
          }`}
          onClick={() => handleTabClick('guide')}
        >
          Beginner’s Guide
        </button>
      </div>
      {activeTab === 'main' && (
        <section className="dashboard-main-content">
          <div className="widgets">
            {widgets.map((widget, index) => (
              <DashboardWidget
                key={index}
                title={widget.title}
                content={widget.content}
                icon={widget.icon}
                link={widget.link}
              />
            ))}
          </div>
        </section>
      )}
      {activeTab === 'guide' && (
        <section className="dashboard-guide-content">
          <div className="mb-4 bg-[#242731] p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center h-full">
              <div>
                <h2 className="text-lg font-bold text-white mb-2">
                  Product Tour
                </h2>
                <p className="text-gray-300 mb-2">
                  Explore how to use our platform with popular use cases
                </p>
              </div>
              <button className="btn-sign-in">Launch</button>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Learn the basics of trading
            </h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail1.jpg"
                  alt="Crypto Trading with DCA Bots"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
              <a
                href="#"
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail2.jpg"
                  alt="Crypto Trading with GRID Bots"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
              <a
                href="#"
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail3.jpg"
                  alt="Crypto Trading terminal SmartTrade"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Step by step instruction how to launch bots
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {widgets.map((widget, index) => (
                <DashboardWidget
                  key={index}
                  title={widget.title}
                  content={widget.content}
                  icon={widget.icon}
                  link={widget.link}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Video tutorial compilation
            </h2>
            <div className="flex flex-wrap space-x-4">
              <a
                href="#"
                className="video-thumbnail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail4.jpg"
                  alt="The Benefits Of Trading With Qtrading"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
              <a
                href="#"
                className="video-thumbnail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail5.jpg"
                  alt="How to Connect an Exchange to Qtrading"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
              <a
                href="#"
                className="video-thumbnail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail6.jpg"
                  alt="DCA Bots Part 1"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
              <a
                href="#"
                className="video-thumbnail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail7.jpg"
                  alt="How To Set Up A Grid Bot"
                  width={300}
                  height={150}
                  className="rounded-md shadow-md"
                />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardContent;
