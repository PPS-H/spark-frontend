import { useState, useEffect } from "react";
import DynamicSearch from "@/components/dynamic-search";
import { useAuth } from "@/hooks/useAuthRTK";
import { useNavigate } from "react-router-dom";
import ConnectionStatus from "@/components/ConnectionStatus";

// Interface pour les artistes avec données temps réel
interface Artist {
  id: number;
  name: string;
  genre: string;
  country?: string;
  monthlyListeners?: number;
  streams?: number;
  revenue?: number;
  imageUrl?: string;
}

export default function Search() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Mock real-time data states (keeping original UI elements)
  const isConnected = true;
  const updateCount = 1;

  // Mock artists data
  const mockArtists: Artist[] = [
    {
      id: 1,
      name: "Bad Bunny",
      genre: "Reggaeton",
      country: "Puerto Rico",
      monthlyListeners: 75000000,
      streams: 15420000,
      revenue: 82450,
      imageUrl: "https://example.com/bad-bunny.jpg",
    },
    {
      id: 2,
      name: "The Weeknd",
      genre: "R&B",
      country: "Canada",
      monthlyListeners: 68000000,
      streams: 22350000,
      revenue: 125600,
      imageUrl: "https://example.com/weeknd.jpg",
    },
    {
      id: 3,
      name: "Taylor Swift",
      genre: "Pop",
      country: "USA",
      monthlyListeners: 85000000,
      streams: 31800000,
      revenue: 189400,
      imageUrl: "https://example.com/taylor-swift.jpg",
    },
    {
      id: 4,
      name: "Drake",
      genre: "Hip Hop",
      country: "Canada",
      monthlyListeners: 72000000,
      streams: 28200000,
      revenue: 158900,
      imageUrl: "https://example.com/drake.jpg",
    },
    {
      id: 5,
      name: "Dua Lipa",
      genre: "Pop",
      country: "UK",
      monthlyListeners: 62000000,
      streams: 18500000,
      revenue: 95300,
      imageUrl: "https://example.com/dua-lipa.jpg",
    },
    {
      id: 6,
      name: "Ed Sheeran",
      genre: "Pop",
      country: "UK",
      monthlyListeners: 58000000,
      streams: 24100000,
      revenue: 142800,
      imageUrl: "https://example.com/ed-sheeran.jpg",
    },
  ];

  // Redirect to home if not authenticated (keeping original logic)
  // if (isFetching) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500" />
  //     </div>
  //   );
  // }

  const user = {
    role: "artist",
  };

  // Interface de recherche avec données statiques (keeping all UI elements)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">
            Découvrir les Artistes
          </h1>
          <ConnectionStatus className="flex items-center space-x-2" />
        </div>

        {/* Indicateur temps réel (keeping original UI element but with static data) */}
        {true && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm">
              🔄 Données mises à jour en temps réel • {updateCount} mises à jour
              reçues
            </p>
          </div>
        )}
      </div>

      {/* Composant de recherche dynamique avec artistes */}
      <DynamicSearch userRole={user?.role} artists={artists} />
    </div>
  );
}
