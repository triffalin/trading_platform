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
  const [activeStrategyTab, setActiveStrategyTab] = useState('launch');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(tab === 'guide' ? '/dashboard?tab=guide' : '/dashboard');
  };

  const handleStrategyTabClick = (tab: string) => {
    setActiveStrategyTab(tab);
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
        <section className="dashboard-main-content space-y-8">
          <div className="bg-[#242731] p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/icons/exclamation.svg"
                alt="Exclamation Icon"
                width={32}
                height={32}
              />
              <div>
                <h2 className="text-lg font-bold text-white">
                  Choose your subscription plan
                </h2>
                <p className="text-gray-300">
                  Buy subscription to continue using Qtrading
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/users/subscriptions/pricing')}
              className="btn-sign-in"
            >
              Buy Subscription
            </button>
          </div>

          <div className="bg-[#242731] p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">
              Top exchanges for your country
            </h2>
            <table className="w-full text-gray-300">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-2">Exchange</th>
                  <th className="p-2">Account types</th>
                  <th className="p-2">Instruments</th>
                  <th className="p-2">Connect existing account</th>
                  <th className="p-2">Create new account</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row */}
                <tr className="border-b border-gray-600">
                  <td className="p-2">Binance</td>
                  <td className="p-2">Spot | Futures | Margin</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Bybit</td>
                  <td className="p-2">Spot | Futures</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">OKX</td>
                  <td className="p-2">Spot | Futures</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">KuCoin</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Binance TR</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Binance US</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Bitfinex</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Bitget USDT-M Futures</td>
                  <td className="p-2">Futures</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Bitstamp</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Coinbase Advanced</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Gate.io</td>
                  <td className="p-2">Spot | Futures</td>
                  <td className="p-2">SmartTrade | DCA | GRID</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Gemini</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">HTX</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-2">Kraken</td>
                  <td className="p-2">Spot</td>
                  <td className="p-2">SmartTrade | DCA | GRID | Signal</td>
                  <td className="p-2">
                    <button className="btn-sign-in">Connect</button>
                  </td>
                  <td className="p-2">
                    <button className="btn-sign-in">Create</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>

          <div className="bg-[#242731] p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">
                Trading Opportunities
              </h2>
              <div className="flex space-x-4">
                <button
                  className={`py-2 px-4 ${
                    activeStrategyTab === 'launch'
                      ? 'text-[#eaecef] border-b-2 border-[#f0b90b]'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleStrategyTabClick('launch')}
                >
                  Launch Strategies
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeStrategyTab === 'copy'
                      ? 'text-[#eaecef] border-b-2 border-[#f0b90b]'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleStrategyTabClick('copy')}
                >
                  Copy Bot
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeStrategyTab === 'signal'
                      ? 'text-[#eaecef] border-b-2 border-[#f0b90b]'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleStrategyTabClick('signal')}
                >
                  Start Signal Bot
                </button>
              </div>
            </div>
            <div className="flex space-x-8">
              <div className="flex-1">
                {activeStrategyTab === 'launch' && (
                  <>
                    <h3 className="text-xl font-bold text-white">
                      Launch popular ready-made strategies
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Utilize various trading strategies designed for different
                      market conditions. A simple and quick way to start
                      automated trading.
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => router.push('/bots/new')}
                        className="btn-sign-in"
                      >
                        DCA strategies
                      </button>
                      <button
                        onClick={() => router.push('/grid_bots')}
                        className="btn-sign-in"
                      >
                        GRID strategies
                      </button>
                    </div>
                  </>
                )}
                {activeStrategyTab === 'copy' && (
                  <>
                    <h3 className="text-xl font-bold text-white">
                      Copy DCA Bots using Presets
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Presets are successful bots created by experienced users.
                    </p>
                    <button
                      onClick={() => router.push('/marketplace')}
                      className="btn-sign-in"
                    >
                      All
                    </button>
                  </>
                )}
                {activeStrategyTab === 'signal' && (
                  <>
                    <h3 className="text-xl font-bold text-white">
                      Start Signal Bot
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Signal bot allows flexible use of TradingView
                      functionality. If you have a TradingView subscription, you
                      can limit alerts or parts of strategies and eventually use
                      them in the bot.
                    </p>
                    <button
                      onClick={() => router.push('/signal_bots')}
                      className="btn-sign-in"
                    >
                      Start
                    </button>
                  </>
                )}
              </div>
              <div className="flex-1">
                <Image
                  src={
                    activeStrategyTab === 'launch'
                      ? '/images/launch-strategies.png'
                      : activeStrategyTab === 'copy'
                      ? '/images/copy-bot.png'
                      : '/images/signal-bot.png'
                  }
                  alt="Trading Opportunities"
                  width={450}
                  height={200}
                  className="rounded-md shadow-md"
                />
              </div>
            </div>
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
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail1.jpg"
                  alt="Crypto Trading with DCA Bots"
                  width={450}
                  height={200}
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
                  width={450}
                  height={200}
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
                  width={450}
                  height={200}
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
              <DashboardWidget
                title="DCA Bot"
                content="DCA Bot is infinitely flexible, but the core function is to buy and sell at advantageous times, based on market conditions."
                icon="/icons/dca-bot.svg"
                link="#"
              />
              <DashboardWidget
                title="GRID Bot"
                content="Qtrading GRID Bot is a tool that can help you succeed from even the smallest price fluctuations in the market."
                icon="/icons/grid-bot.svg"
                link="#"
              />
              <DashboardWidget
                title="Signal Bot"
                content="Manage your trading positions using webhooks, alerts, TradingView strategies, and custom filters that include manual signal confirmation."
                icon="/icons/signal-bot.svg"
                link="#"
              />
              <DashboardWidget
                title="SmartTrade"
                content="Manage all your exchanges in one easy-to-use interface. Strategize your trades using advanced order conditions for entering and exiting deals."
                icon="/icons/smart-trade.svg"
                link="#"
              />
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Video tutorial compilation
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <a
                href="#"
                className="video-thumbnail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/thumbnails/thumbnail4.jpg"
                  alt="The Benefits Of Trading With Qtrading"
                  width={450}
                  height={200}
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
                  width={450}
                  height={200}
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
                  width={450}
                  height={200}
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
                  width={450}
                  height={200}
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
