import { useState } from "react";
import {
  Building,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Search,
  Crown,
  LogOut,
  MessageCircle,
  BarChart3,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuthRTK";
import ProfessionalInbox from "@/components/professional-inbox";
import { useNavigate } from "react-router-dom";

export default function LabelHome() {
  const { user, logout, isLogoutLoading } = useAuth();
  const [showProfessionalInbox, setShowProfessionalInbox] = useState(false);
  const navigate = useNavigate();

  const labelStats = [
    {
      label: "Total Artists",
      value: "47",
      change: "+5",
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Revenue",
      value: "€125,000",
      change: "+18.2%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      label: "Signed This Month",
      value: "3",
      change: "+1",
      icon: Star,
      color: "text-purple-400",
    },
    {
      label: "Top Charts",
      value: "12",
      change: "+4",
      icon: TrendingUp,
      color: "text-cyan-400",
    },
  ];

  // Mock artist data (replacing useQuery API call)
  const mockArtists = [
    {
      id: 1,
      name: "Sophia Martinez",
      genre: "Pop",
      imageUrl: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
    {
      id: 2,
      name: "Marcus Thompson",
      genre: "R&B",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      genre: "Electronic",
      imageUrl: "https://images.unsplash.com/photo-1516575080321-4a8d13461c2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
    {
      id: 4,
      name: "James Wilson",
      genre: "Hip Hop",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    },
    {
      id: 5,
      name: "Aria Chen",
      genre: "Indie",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    }
  ];

  // Use first 3 mock artists with realistic performance data
  const topArtists = mockArtists.slice(0, 3).map((artist, index) => {
    const performanceData = [
      { streams: "2.5M", revenue: "€18,500", growth: "+15%" },
      { streams: "1.8M", revenue: "€12,200", growth: "+22%" },
      { streams: "3.1M", revenue: "€25,800", growth: "+8%" }
    ];

    return {
      id: artist.id,
      name: artist.name,
      genre: artist.genre,
      streams: performanceData[index].streams,
      revenue: performanceData[index].revenue,
      growth: performanceData[index].growth,
      image: artist.imageUrl,
    };
  });

  // Generic activity data without specific artist names
  const recentActivity = [
    {
      action: "New Signing",
      detail: "Un nouvel artiste a rejoint le label",
      time: "2 hours ago",
      type: "signing",
    },
    {
      action: "Milestone",
      detail: "Un artiste a atteint 10M de streams",
      time: "1 day ago",
      type: "milestone",
    },
    {
      action: "Revenue",
      detail: "€5,200 de revenus streaming",
      time: "2 days ago",
      type: "revenue",
    },
    {
      action: "Contract",
      detail: "Nouveau contrat de distribution signé",
      time: "3 days ago",
      type: "contract",
    },
    {
      action: "Promotion",
      detail: "Campagne marketing lancée avec succès",
      time: "5 days ago",
      type: "promotion",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building className="text-purple-400 text-3xl animate-neon-pulse" />
            <Crown className="text-yellow-400 text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            WELCOME {user?.username?.toUpperCase() || "LABEL"}
          </h1>
          <p className="text-xl text-gray-400">
            Your label management headquarters
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Label Executive
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              disabled={isLogoutLoading}
              className="border-gray-500 text-gray-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLogoutLoading ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {labelStats.map((stat, index) => (
            <Card
              key={index}
              className="artist-metric-card group hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className={`text-xs ${stat.color} font-medium`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Artists */}
        <Card className="artist-metric-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Top Performing Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArtists.map((artist, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/40 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/artist/${artist.id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                        {artist.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{artist.genre}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {artist.streams} streams
                    </p>
                    <p className="text-green-400 text-sm">{artist.revenue}</p>
                    <p className="text-cyan-400 text-xs">{artist.growth}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Investing in artist:", artist);
                        navigate(`/invest/${artist.id}`);
                      }}
                    >
                      Invest
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProfessionalInbox(true);
                      }}
                    >
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="artist-metric-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-slate-700/20 rounded-lg"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "signing"
                        ? "bg-green-400"
                        : activity.type === "milestone"
                        ? "bg-blue-400"
                        : activity.type === "contract"
                        ? "bg-purple-400"
                        : activity.type === "promotion"
                        ? "bg-pink-400"
                        : "bg-yellow-400"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.detail}</p>
                  </div>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card
            className="artist-metric-card group hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/search")}
          >
            <CardContent className="p-6 text-center">
              <Search className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">
                Discover Talent
              </h3>
              <p className="text-gray-300">Find and scout new artists</p>
            </CardContent>
          </Card>

          <Card
            className="artist-metric-card group hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setShowProfessionalInbox(true)}
          >
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">
                Artist Messages
              </h3>
              <p className="text-gray-300">Professional communications</p>
            </CardContent>
          </Card>

          <Card
            className="artist-metric-card group hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/roster")}
          >
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">
                Manage Roster
              </h3>
              <p className="text-gray-300">Oversee your signed artists</p>
            </CardContent>
          </Card>

          <Card
            className="artist-metric-card group hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/analytics-dashboard")}
          >
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
              <p className="text-gray-300">Track performance metrics</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Professional Inbox Modal */}
      {showProfessionalInbox && (
        <ProfessionalInbox onClose={() => setShowProfessionalInbox(false)} />
      )}
    </div>
  );
}
