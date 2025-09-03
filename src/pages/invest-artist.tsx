import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Artist {
  id: number;
  name: string;
  genre: string;
  country: string;
  description: string;
  monthlyListeners: number;
  fundingGoal: string;
  currentFunding: string;
  expectedReturn: string;
  riskLevel: string;
  imageUrl: string;
  streamingLinks: any;
}

export default function InvestArtistPage() {
  const { artistSlug } = useParams();
  const navigate = useNavigate();

  // Mock toast function (replacing useToast)
  const toast = ({ title, description, variant }: { 
    title: string; 
    description: string; 
    variant?: string 
  }) => {
    console.log(`Toast: ${title} - ${description}`);
    alert(`${title}: ${description}`);
  };

  const [artist, setArtist] = useState<Artist | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Confirmation
  const [liked, setLiked] = useState(false);

  // Mock artists data (replacing API call)
  const mockArtists: Artist[] = [
    {
      id: 1,
      name: "Sophia Martinez",
      genre: "Pop",
      country: "Spain",
      description: "Pop artist from Madrid with a passion for storytelling through music. Known for her powerful vocals and emotional depth, she has been captivating audiences across Europe with her unique blend of contemporary pop and traditional Spanish influences.",
      monthlyListeners: 425000,
      fundingGoal: "50000",
      currentFunding: "32500",
      expectedReturn: "15-25%",
      riskLevel: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      streamingLinks: { spotify: "#", youtube: "#" }
    },
    {
      id: 2,
      name: "Marcus Thompson",
      genre: "R&B",
      country: "USA",
      description: "Soulful R&B artist from Detroit bringing modern vibes to classic sounds. His smooth vocals and contemporary production style have earned him recognition in the American music scene, with collaborations featuring top producers and writers.",
      monthlyListeners: 312000,
      fundingGoal: "75000",
      currentFunding: "48000",
      expectedReturn: "20-30%",
      riskLevel: "Low",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      streamingLinks: { spotify: "#", youtube: "#", apple: "#" }
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      genre: "Electronic",
      country: "Germany",
      description: "Electronic music producer creating atmospheric soundscapes from Berlin. Her innovative approach to electronic music combines ambient textures with danceable beats, making her a rising star in the European electronic scene.",
      monthlyListeners: 180000,
      fundingGoal: "60000",
      currentFunding: "22500",
      expectedReturn: "18-28%",
      riskLevel: "High",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      streamingLinks: { spotify: "#", soundcloud: "#" }
    }
  ];

  // Protection against undefined artistSlug
  if (!artistSlug) {
    console.log("❌ No artist slug provided, redirecting to home");
    navigate("/");
    return null;
  }

  useEffect(() => {
    if (artistSlug) {
      fetchArtistBySlug(artistSlug);
      console.log("Fetching artist by slug:", artistSlug);
    }
  }, [artistSlug]);

  const fetchArtistBySlug = (slug: string) => {
    console.log("Fetching artist with slug:", slug);
    
    // Convert slug to ID (assuming slug format is artist-{id})
    const artistId = slug.split('-').pop();
    
    const foundArtist = mockArtists.find((a: Artist) => 
      a.id.toString() === artistId || 
      a.name.toLowerCase().replace(/\s+/g, '-') === slug
    );

    if (foundArtist) {
      setArtist(foundArtist);
      console.log("Artist found:", foundArtist.name);
    } else {
      toast({
        title: "Artist not found",
        description: "The artist you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const handleProceedToPayment = () => {
    if (!investmentAmount || investmentAmount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
      return;
    }

    // Redirect to checkout page
    console.log(
      "🚀 REDIRECTING TO PAYMENT:",
      `/checkout/${artist?.id}/${investmentAmount}`
    );
    navigate(`/checkout/${artist?.id}/${investmentAmount}`);
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked
        ? `${artist?.name} removed from your favorites`
        : `${artist?.name} added to your favorites`,
    });
  };

  const handleInvest = async () => {
    if (!artist) return;

    setIsProcessing(true);
    try {
      // Simulate investment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Investment Successful!",
        description: `You have invested €${investmentAmount} in ${artist.name}`,
      });

      setStep(3);
    } catch (error) {
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message to ${artist?.name} has been sent successfully.`,
    });
  };

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading artist information...</p>
        </div>
      </div>
    );
  }

  const fundingProgress =
    (parseFloat(artist.currentFunding) / parseFloat(artist.fundingGoal)) * 100;
  const minInvestment = 100;
  const maxInvestment = 10000;
  const sharePercentage = (
    (investmentAmount / parseFloat(artist.fundingGoal)) *
    100
  ).toFixed(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-white">
              Invest in {artist.name}
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Artist Hero */}
        <Card className="bg-slate-800 border-slate-700 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {artist.name}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-purple-500/20 text-purple-300">
                      {artist.genre}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {artist.country}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLike}
                    className={`border-pink-400 ${
                      liked
                        ? "bg-pink-400 text-white"
                        : "text-pink-400 hover:bg-pink-400 hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleMessage}
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Artist Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Artist Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {artist.monthlyListeners.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Monthly Listeners
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {artist.expectedReturn}
                    </div>
                    <div className="text-gray-400 text-sm">Expected ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {artist.riskLevel}
                    </div>
                    <div className="text-gray-400 text-sm">Risk Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {fundingProgress.toFixed(0)}%
                    </div>
                    <div className="text-gray-400 text-sm">Funded</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  About {artist.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {artist.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Funding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Raised: €{artist.currentFunding}
                    </span>
                    <span className="text-gray-400">
                      Goal: €{artist.fundingGoal}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(fundingProgress, 100)}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-white font-semibold">
                      {fundingProgress.toFixed(1)}% funded
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Panel */}
          <div>
            <Card className="bg-slate-800 border-slate-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Invest Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Investment Amount (€)
                      </label>
                      <Input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) =>
                          setInvestmentAmount(
                            Math.max(
                              minInvestment,
                              Math.min(
                                maxInvestment,
                                parseInt(e.target.value) || minInvestment
                              )
                            )
                          )
                        }
                        min={minInvestment}
                        max={maxInvestment}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Min: €{minInvestment}</span>
                        <span>Max: €{maxInvestment}</span>
                      </div>
                    </div>

                    <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Your share:</span>
                        <span className="text-white font-semibold">
                          {sharePercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Expected return:</span>
                        <span className="text-green-400 font-semibold">
                          €{(investmentAmount * 1.15).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      disabled={investmentAmount < minInvestment}
                    >
                      Continue to Payment
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                      <h3 className="text-white font-semibold">
                        Investment Summary
                      </h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white">€{investmentAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Artist:</span>
                        <span className="text-white">{artist.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Your share:</span>
                        <span className="text-purple-400">
                          {sharePercentage}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleProceedToPayment}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          `Invest €${investmentAmount}`
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="w-full border-slate-600 text-gray-400"
                      >
                        Back
                      </Button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <div className="text-white text-2xl">✓</div>
                    </div>
                    <h3 className="text-white font-semibold">
                      Investment Successful!
                    </h3>
                    <p className="text-gray-400 text-sm">
                      You have successfully invested €{investmentAmount} in{" "}
                      {artist.name}
                    </p>
                    <Button
                      onClick={() => navigate("/portfolio")}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      View Portfolio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
