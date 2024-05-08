const features = [
  {
    title: 'Automated Trading',
    description:
      'Optimize your strategies with bots that trade 24/7, keeping you ahead in every market scenario.'
  },
  {
    title: 'Market Analytics',
    description:
      'Access real-time insights and analytics to make informed decisions quickly and efficiently.'
  },
  {
    title: 'Security',
    description:
      'Top-tier security measures to keep your investments safe and your mind at ease.'
  }
];

const Features = () => (
  <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    {features.map(feature => (
      <div
        key={feature.title}
        className="feature-item bg-[#1E2329] p-6 rounded-lg shadow-lg"
      >
        <h2 className="font-bold text-lg">{feature.title}</h2>
        <p>{feature.description}</p>
      </div>
    ))}
  </section>
);

export default Features;
