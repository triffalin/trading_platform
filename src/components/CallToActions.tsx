// components/CallToAction.tsx
import React from 'react';

interface CallToActionProps {
  onRegister: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onRegister }) => (
  <section className="call-to-action bg-[#FCD535] text-center p-6 rounded-lg">
    <h2 className="text-2xl font-bold mb-3">Ready to Start Trading?</h2>
    <button
      onClick={onRegister}
      className="bg-[#1E2329] hover:bg-[#F0B90B] text-white font-bold py-2 px-4 rounded"
    >
      Join Now
    </button>
  </section>
);

export default CallToAction;
