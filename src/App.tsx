import { useState } from 'react';
import Login from './components/Login';
import Swiper from './components/Swiper';
import Matches from './components/Matches';
import PartnerLink from './components/PartnerLink';

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'login' | 'swiper' | 'matches' | 'partner'>('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPartner, setHasPartner] = useState(false);

  const handleLogin = () => {
    // TODO: Implement actual authentication
    setIsLoggedIn(true);
    setCurrentView('partner');
  };

  const handlePartnerLink = () => {
    // TODO: Implement actual partner linking
    setHasPartner(true);
    setCurrentView('swiper');
  };

  if (!isLoggedIn && currentView !== 'welcome') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#ff7b7b]">
      {currentView === 'welcome' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-white/90 shadow-lg mb-4">
              <img src="/logo.svg" alt="TravelMate" className="w-16 h-16" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">TravelMate</h1>
            <p className="text-white/90 text-lg mb-8">Find your next adventure together</p>
          </div>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all mb-4"
          >
            Get Started
          </button>
        </div>
      )}

      {currentView === 'partner' && (
        <PartnerLink onLink={handlePartnerLink} onSkip={() => setCurrentView('swiper')} />
      )}

      {currentView === 'swiper' && (
        <Swiper 
          onMatchesClick={() => setCurrentView('matches')} 
          onPartnerClick={() => setCurrentView('partner')}
          hasPartner={hasPartner}
        />
      )}

      {currentView === 'matches' && (
        <Matches 
          onBack={() => setCurrentView('swiper')} 
          hasPartner={hasPartner}
        />
      )}
    </div>
  );
}

export default App;