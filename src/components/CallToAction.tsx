import React from 'react';

interface CallToActionProps {
  onRegister: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onRegister }) => (
  <div className="call-to-action bg-[#FCD535] text-center p-6 rounded-lg">
    <h2 className="text-2xl font-bold mb-3">Ready to Start Trading?</h2>
    <button
      onClick={onRegister}
      aria-label="Join now to start trading"
      className="bg-[#1E2329] hover:bg-[#F0B90B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0B90B]"
    >
      Join Now
    </button>
  </div>
);

export default CallToAction;
