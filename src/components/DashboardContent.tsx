import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface WidgetProps {
  title: string;
  content: string;
}

interface WidgetData {
  title: string;
  content: string;
}

const DashboardWidget: React.FC<WidgetProps> = React.memo(
  ({ title, content }) => (
    <div className="widget">
      <h2 className="font-semibold text-white">{title}</h2>
      <p className="text-gray-300">{content}</p>
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
    { title: 'Trading Summary', content: 'Content detailing trading stats...' },
    {
      title: 'Active Strategies',
      content: 'Content about current strategies in play...'
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
                className="video-thumbnail"
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
                className="video-thumbnail"
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
                className="video-thumbnail"
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
              <div className="widget">
                <h3 className="font-semibold text-white">
                  DCA Bot <span className="icon">🡺</span>
                </h3>
                <p className="text-gray-300">
                  DCA Bot is infinitely flexible...
                </p>
                <a
                  href="#"
                  className="text-binance-yellow hover:text-hover-yellow"
                >
                  Learn more
                </a>
              </div>
              <div className="widget">
                <h3 className="font-semibold text-white">
                  GRID Bot <span className="icon">🡺</span>
                </h3>
                <p className="text-gray-300">Qtrading GRID Bot is a tool...</p>
                <a
                  href="#"
                  className="text-binance-yellow hover:text-hover-yellow"
                >
                  Learn more
                </a>
              </div>
              <div className="widget">
                <h3 className="font-semibold text-white">
                  Signal Bot <span className="icon">🡺</span>
                </h3>
                <p className="text-gray-300">
                  Manage your trading positions...
                </p>
                <a
                  href="#"
                  className="text-binance-yellow hover:text-hover-yellow"
                >
                  Learn more
                </a>
              </div>
              <div className="widget">
                <h3 className="font-semibold text-white">
                  SmartTrade <span className="icon">🡺</span>
                </h3>
                <p className="text-gray-300">Manage all your exchanges...</p>
                <a
                  href="#"
                  className="text-binance-yellow hover:text-hover-yellow"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Video tutorial compilation
            </h2>
            <div className="flex space-x-4">
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
