import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div className="dashboard-content">
      <div className="tabs-container flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === 'main'
              ? 'border-b-2 border-[#f0b90b] text-[#eaecef]}'
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
              : 'text-gray-00'
          }`}
          onClick={() => handleTabClick('guide')}
        >
          Beginner’s Guide
        </button>
      </div>
      {activeTab === 'main' && (
        <section className="dashboard-main-content">
          <h1 className="text-lg font-bold text-white mb-4">Dashboard</h1>
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
          <h1 className="text-lg font-bold text-white mb-4">
            Beginner’s Guide
          </h1>
          <p className="text-gray-300">Beginner’s Guide content...</p>
        </section>
      )}
    </div>
  );
};

export default DashboardContent;
