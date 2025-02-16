import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; 
import { Heart, X, MapPin, Menu, UserPlus } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface SwiperProps {
  onMatchesClick: () => void;
  onPartnerClick: () => void;
  hasPartner: boolean;
}

function Swiper({ onMatchesClick, onPartnerClick, hasPartner }: SwiperProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        if (querySnapshot.empty) {
          throw new Error("Nenhum destino encontrado no Firestore!");
        }
        setDestinations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination)));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  const handleSwipe = (liked: boolean) => {
    console.log(liked ? `Liked ${destinations[currentIndex]?.name}` : `Disliked ${destinations[currentIndex]?.name}`);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  if (loading) return <p className="text-center mt-20">Loading destinos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!destinations.length) return <p className="text-center mt-20">Nenhum destino disponível!</p>;

  const currentDestination = destinations[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <button onClick={onMatchesClick}>
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="TravelMate" className="w-8 h-8" />
          <h1 className="text-xl font-semibold text-pink-500">TravelMate</h1>
        </div>
        {!hasPartner ? (
          <button onClick={onPartnerClick} className="text-pink-500">
            <UserPlus className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>

      {/* Alerta para link de parceiro */}
      <div className="max-w-md mx-auto p-4">
        {!hasPartner && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
            <p className="text-sm text-yellow-700">
              Link with your partner to find matching destinations together!
            </p>
          </div>
        )}

        {/* Card do Destino */}
        <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
          <img
    src={currentDestination.image}
    alt={currentDestination.name}
    className="w-full h-96 object-cover"
    onError={(e) => e.currentTarget.src = "https://via.placeholder.com/600"} 
  />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center gap-2 text-white mb-2">
              <MapPin className="w-5 h-5" />
              <h2 className="text-2xl font-bold">{currentDestination.name}</h2>
            </div>
            <p className="text-white/90">{currentDestination.description}</p>
          </div>
        </div>

        {/* Botões de Like/Dislike */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => handleSwipe(false)}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button
            onClick={() => handleSwipe(true)}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Heart className="w-8 h-8 text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Swiper;
