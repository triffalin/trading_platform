import React from 'react';
import AnalyticsIcon from '../../assets/analytics-icon.svg';
import SecurityIcon from '../../assets/security-icon.svg';

function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="feature-card">
        <img src={AnalyticsIcon} alt="Advanced Analytics" />
        <h2>Advanced Analytics</h2>
        <p>
          Utilize powerful analytical tools to maximize your trading efficiency.
        </p>
      </div>
      <div className="feature-card">
        <img src={SecurityIcon} alt="Secure Transactions" />
        <h2>Secure Transactions</h2>
        <p>
          Trade with confidence with the highest security measures in place.
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
