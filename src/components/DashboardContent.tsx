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

interface Exchange {
  name: string;
  accountTypes: string;
  instruments: string;
  icon: string;
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
          src="/icons/link2.svg"
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
  const [showAllExchanges, setShowAllExchanges] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );

  const hasConnectedPlatforms = false; // Replace with actual condition based on user's connected platforms

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(tab === 'guide' ? '/dashboard?tab=guide' : '/dashboard');
  };

  const handleStrategyTabClick = (tab: string) => {
    setActiveStrategyTab(tab);
  };

  const handleShowMoreToggle = () => {
    setShowAllExchanges(prev => !prev);
  };

  const handleConnectClick = (exchange: Exchange) => {
    setSelectedExchange(exchange);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
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

  const exchanges: Exchange[] = [
    {
      name: 'Binance',
      accountTypes: 'Spot | Futures | Margin',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/binance.svg'
    },
    {
      name: 'Bybit',
      accountTypes: 'Spot | Futures',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/bybit.svg'
    },
    {
      name: 'OKX',
      accountTypes: 'Spot | Futures',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/okx.svg'
    },
    {
      name: 'KuCoin',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/kucoin.svg'
    },
    {
      name: 'Binance TR',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID',
      icon: '/icons/binance.svg'
    },
    {
      name: 'Binance US',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/binance.svg'
    },
    {
      name: 'Bitfinex',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | Signal',
      icon: '/icons/bitfinex.svg'
    },
    {
      name: 'Bitget USDT-M Futures',
      accountTypes: 'Futures',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/bitget.svg'
    },
    {
      name: 'Bitstamp',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | Signal',
      icon: '/icons/bitstamp.svg'
    },
    {
      name: 'Coinbase Advanced',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/coinbase.svg'
    },
    {
      name: 'Gate.io',
      accountTypes: 'Spot | Futures',
      instruments: 'SmartTrade | DCA | GRID',
      icon: '/icons/gateio.svg'
    },
    {
      name: 'Gemini',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/gemini.svg'
    },
    {
      name: 'HTX',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID',
      icon: '/icons/htx.svg'
    },
    {
      name: 'Kraken',
      accountTypes: 'Spot',
      instruments: 'SmartTrade | DCA | GRID | Signal',
      icon: '/icons/kraken.svg'
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
          {hasConnectedPlatforms ? (
            <>
              <div className="bg-[#242731] p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4">
                  Aggregate Account Balance
                </h2>
                <div className="balance-details flex justify-between">
                  <div className="balance-circle">
                    <p className="text-gray-300">
                      Number of assets: <span>1</span>
                    </p>
                    <p className="text-gray-300">
                      Total / Change 24 hr: <span>$0.01</span>{' '}
                      <span>+83.11%</span>
                    </p>
                    <p className="text-gray-300">
                      ≈0 BTC <span>+83.14%</span>
                    </p>
                  </div>
                  <div className="balance-graph">
                    {/* Placeholder for the graph */}
                  </div>
                </div>
              </div>

              <div className="bg-[#242731] p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-white">
                    Exchange Area
                  </h2>
                  <button className="btn-connect">Add an exchange</button>
                </div>
                <div className="connected-exchanges grid grid-cols-3 gap-4">
                  <div className="exchange bg-[#2d2f36] p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold text-white">My Binance</h4>
                    <p className="text-gray-300">Binance Spot</p>
                    <p className="text-gray-300">Total: &lt;$0.01 / 0 BTC</p>
                    <p className="text-gray-300">
                      24hr changes: <span>+83.23% +83.14%</span>
                    </p>
                    <button className="btn-sign-in mt-2">Deposit</button>
                  </div>
                  <div className="exchange bg-[#2d2f36] p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold text-white">My Binance</h4>
                    <p className="text-gray-300">Binance Futures COIN-M</p>
                    <p className="text-gray-300">Insufficient funds</p>
                    <button className="btn-sign-in mt-2">Transfer</button>
                  </div>
                </div>
              </div>

              <div className="bg-[#242731] p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4">Tokens</h2>
                <div className="token-list grid grid-cols-3 gap-4">
                  <div className="token bg-[#2d2f36] p-4 rounded-lg shadow-md">
                    <p className="text-gray-300">APENFT</p>
                    <p className="text-gray-300">Quantity: 1,419.064018</p>
                    <p className="text-gray-300">Price: $0</p>
                    <p className="text-gray-300">Change (24h): +0.38%</p>
                    <p className="text-gray-300">Total: $0</p>
                  </div>
                  <div className="token bg-[#2d2f36] p-4 rounded-lg shadow-md">
                    <p className="text-gray-300">LDUSDT</p>
                    <p className="text-gray-300">Quantity: 46.06634597</p>
                    <p className="text-gray-300">Price: $0</p>
                    <p className="text-gray-300">Change (24h): 0%</p>
                    <p className="text-gray-300">Total: $0</p>
                  </div>
                  <div className="token bg-[#2d2f36] p-4 rounded-lg shadow-md">
                    <p className="text-gray-300">VeThor Token</p>
                    <p className="text-gray-300">Quantity: 0.00000661</p>
                    <p className="text-gray-300">Price: &lt;$0.01</p>
                    <p className="text-gray-300">Change (24h): +0.08%</p>
                    <p className="text-gray-300">Total: &lt;$0.01</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#242731] p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4">
                  Futures Contracts
                </h2>
                <p className="text-gray-300">No futures contracts</p>
                <button className="btn-sign-in mt-2">Create trade</button>
              </div>
            </>
          ) : (
            <>
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
                <table className="w-full text-gray-300 text-center">
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
                    {exchanges
                      .slice(0, showAllExchanges ? exchanges.length : 3)
                      .map((exchange, index) => (
                        <tr key={index} className="border-b border-gray-600">
                          <td className="p-2 flex items-center justify-center space-x-2">
                            <Image
                              src={exchange.icon}
                              alt={`${exchange.name} icon`}
                              width={16}
                              height={16}
                            />
                            <span>{exchange.name}</span>
                          </td>
                          <td className="p-2">{exchange.accountTypes}</td>
                          <td className="p-2">{exchange.instruments}</td>
                          <td className="p-2 flex justify-center items-center space-x-2">
                            <button
                              className="btn-connect flex items-center space-x-2"
                              onClick={() => handleConnectClick(exchange)}
                            >
                              <Image
                                src="/icons/link2.svg"
                                alt="Link icon"
                                width={16}
                                height={16}
                              />
                              <span>Connect</span>
                            </button>
                          </td>
                          <td className="p-2">
                            <Link href="#" className="btn-sign-in">
                              Create
                            </Link>
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td colSpan={5} className="text-center">
                        <button
                          onClick={handleShowMoreToggle}
                          className="text-binance-yellow hover:text-hover-yellow flex justify-center items-center space-x-2 mx-auto"
                        >
                          {showAllExchanges ? (
                            <>
                              <Image
                                src="/icons/arrow-up.svg"
                                alt="Up Arrow"
                                width={16}
                                height={16}
                              />
                              <span>Show less</span>
                            </>
                          ) : (
                            <>
                              <Image
                                src="/icons/arrow-down.svg"
                                alt="Down Arrow"
                                width={16}
                                height={16}
                              />
                              <span>Show more</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
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
                          Utilize various trading strategies designed for
                          different market conditions. A simple and quick way to
                          start automated trading.
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
                          Presets are successful bots created by experienced
                          users.
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
                          functionality. If you have a TradingView subscription,
                          you can limit alerts or parts of strategies and
                          eventually use them in the bot.
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
            </>
          )}
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

      {isPopupVisible && selectedExchange && (
        <div className="popup">
          <div className="popupContent">
            <button className="closeButton" onClick={handleClosePopup}>
              &times;
            </button>
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Image
                  src={selectedExchange.icon}
                  alt={selectedExchange.name}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Connect exchange {selectedExchange.name}
              </h3>
            </div>
            <ol className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Image
                  src="/icons/step1.svg"
                  alt="Step 1"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Click on the &quot;Connect&quot; button
              </li>
              <li className="flex items-center">
                <Image
                  src="/icons/step2.svg"
                  alt="Step 2"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Log in to your account on the website {selectedExchange.name}
              </li>
              <li className="flex items-center">
                <Image
                  src="/icons/step3.svg"
                  alt="Step 3"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Confirm your connection to Qtrading
              </li>
            </ol>
            <div className="my-4">
              <button className="connectButton w-full py-2 text-center">
                Connect {selectedExchange.name}
              </button>
            </div>
            <p className="text-gray-300 flex items-center">
              Don&apos;t have an account?{' '}
              <Link
                href="#"
                className="text-binance-yellow hover:text-hover-yellow flex items-center ml-1"
              >
                Create a new {selectedExchange.name} account{' '}
                <Image
                  src="/icons/external-link.svg"
                  alt="external link"
                  width={16}
                  height={16}
                />
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
