import React from 'react';
import { ArrowLeft, MapPin, UserPlus } from 'lucide-react';


interface MatchesProps {
  onBack: () => void;
  hasPartner: boolean;
}

function Matches({ onBack, hasPartner }: MatchesProps) {
  // Mock data for matches
  const matches = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      matchedWith: hasPartner ? 'Partner' : null,
      matchDate: '2024-02-20',
      superMatch: hasPartner,
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      matchedWith: hasPartner ? 'Partner' : null,
      matchDate: '2024-02-19',
      superMatch: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-sm flex items-center gap-4">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-pink-500">Your Matches</h1>
      </div>

      <div className="max-w-md mx-auto p-4">
        {!hasPartner && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Link with your partner to see matching destinations!
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={match.image}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-xl font-bold">{match.name}</h2>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {match.matchedWith
                      ? `Matched with ${match.matchedWith} on ${new Date(
                          match.matchDate
                        ).toLocaleDateString()}`
                      : `Liked on ${new Date(match.matchDate).toLocaleDateString()}`}
                  </p>
                  {match.superMatch && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      Super Match!
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Matches;