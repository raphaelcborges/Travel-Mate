import React, { useState } from 'react';
import { UserPlus, ArrowRight } from 'lucide-react';

interface PartnerLinkProps {
  onLink: (partnerEmail: string) => void;
  onSkip: () => void;
}

function PartnerLink({ onLink, onSkip }: PartnerLinkProps) {
  const [partnerEmail, setPartnerEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLink(partnerEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-pink-100 mb-4">
            <UserPlus className="w-8 h-8 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Link with Partner</h2>
          <p className="text-gray-600">
            Connect with your partner to find matching travel destinations together
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Partner's Email
            </label>
            <input
              type="email"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              placeholder="Enter your partner's email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
          >
            Link with Partner
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-600 text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerLink;