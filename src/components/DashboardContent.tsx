import React, { memo } from 'react';

interface WidgetProps {
  title: string;
  content: string;
}

interface WidgetData {
  title: string;
  content: string;
}

const DashboardWidget = memo<WidgetProps>(({ title, content }) => (
  <div className="widget">
    <h2 className="font-semibold text-white">{title}</h2>
    <p className="text-gray-300">{content}</p>
  </div>
));

DashboardWidget.displayName = 'DashboardWidget';

const DashboardContent: React.FC = () => {
  const widgets: WidgetData[] = [
    { title: 'Trading Summary', content: 'Content detailing trading stats...' },
    {
      title: 'Active Strategies',
      content: 'Content about current strategies in play...'
    }
  ];

  return (
    <section className="dashboard-content">
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
  );
};

export default DashboardContent;
