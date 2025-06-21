import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Leaf, Users, Star } from "lucide-react";
import FarmerDashboard from "@/components/FarmerDashboard";
import BuyerDashboard from "@/components/BuyerDashboard";
import AuthPage from "@/components/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [userRole, setUserRole] = useState<'farmer' | 'buyer' | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const { user, userProfile, loading, signOut } = useAuth();
  const { toast } = useToast();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-agri-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard
  if (user && userProfile) {
    if (userProfile.user_type === 'farmer') {
      return <FarmerDashboard onBack={() => signOut()} />;
    } else {
      return <BuyerDashboard onBack={() => signOut()} />;
    }
  }

  // Show auth page if requested
  if (showAuth) {
    return (
      <AuthPage 
        onBack={() => setShowAuth(false)}
        onSuccess={(type) => {
          setUserRole(type);
          setShowAuth(false);
        }}
      />
    );
  }

  // Show role selection for non-authenticated users
  if (userRole === 'farmer') {
    return <FarmerDashboard onBack={() => setUserRole(null)} />;
  }

  if (userRole === 'buyer') {
    return <BuyerDashboard onBack={() => setUserRole(null)} />;
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUseCurrentLocation(true);
        setSelectedLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        toast({
          title: "Location Found",
          description: "Your current location has been detected."
        });
      },
      (error) => {
        toast({
          title: "Location Error",
          description: "Unable to get your location. Please enter manually.",
          variant: "destructive"
        });
      }
    );
  };

  const handleLocationSubmit = () => {
    if (!selectedLocation && !pincode) {
      toast({
        title: "Location Required",
        description: "Please select your location or enter a pincode.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Location Set",
      description: `Location set to: ${selectedLocation || pincode}. You can now browse local farmers and products.`
    });
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-earth-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-agri-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-agri-600" />
              <h1 className="text-2xl font-bold bg-agri-gradient bg-clip-text text-transparent">
                AgriLocal
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <button 
                onClick={scrollToFeatures}
                className="flex items-center gap-1 hover:text-agri-600 transition-colors cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
                Location-based
              </button>
              <button 
                onClick={scrollToHowItWorks}
                className="flex items-center gap-1 hover:text-agri-600 transition-colors cursor-pointer"
              >
                <Users className="h-4 w-4" />
                Direct Connect
              </button>
              <button 
                onClick={scrollToFeatures}
                className="flex items-center gap-1 hover:text-agri-600 transition-colors cursor-pointer"
              >
                <Leaf className="h-4 w-4" />
                Local Fresh
              </button>
            </div>
            <Button 
              onClick={() => setShowAuth(true)}
              className="bg-agri-600 hover:bg-agri-700 text-white"
            >
              Sign In / Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connecting
            <span className="bg-agri-gradient bg-clip-text text-transparent"> Local Farmers </span>
            with
            <span className="bg-earth-gradient bg-clip-text text-transparent"> Fresh Buyers</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover fresh, local produce directly from nearby farmers. Support your community while enjoying 
            the freshest ingredients nature has to offer.
          </p>

          {/* Location Selection Card */}
          <Card className="max-w-md mx-auto mb-8 border-2 border-agri-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-agri-700">
                <MapPin className="h-5 w-5" />
                Set Your Location
              </CardTitle>
              <CardDescription>
                Find farmers and fresh produce near you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Button 
                  onClick={getCurrentLocation}
                  variant="outline"
                  className="border-agri-300 text-agri-700 hover:bg-agri-50"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Use Current Location
                </Button>
              </div>
              
              <div className="text-center text-gray-500">or</div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="pincode">Enter PIN Code</Label>
                  <Input
                    id="pincode"
                    placeholder="e.g., 110001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="text-center"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Or Enter Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Delhi, Mumbai, Bangalore"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="text-center"
                  />
                </div>
              </div>

              {useCurrentLocation && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                  ✓ Current location detected
                </div>
              )}

              <Button 
                onClick={handleLocationSubmit}
                className="w-full bg-agri-600 hover:bg-agri-700 text-white"
              >
                Set Location
              </Button>
            </CardContent>
          </Card>
          
          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
            <Card 
              className="hover-lift cursor-pointer border-2 border-agri-200 hover:border-agri-400 transition-all duration-300"
              onClick={() => setUserRole('farmer')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-agri-100 rounded-full w-fit">
                  <Leaf className="h-8 w-8 text-agri-600" />
                </div>
                <CardTitle className="text-2xl text-agri-700">I'm a Farmer</CardTitle>
                <CardDescription className="text-base">
                  Sell your fresh produce directly to local buyers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-agri-600 hover:bg-agri-700 text-white">
                  Start Selling
                </Button>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>• List your products easily</p>
                  <p>• Connect with nearby buyers</p>
                  <p>• Manage your farm profile</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover-lift cursor-pointer border-2 border-earth-200 hover:border-earth-400 transition-all duration-300"
              onClick={() => setUserRole('buyer')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-earth-100 rounded-full w-fit">
                  <Users className="h-8 w-8 text-earth-600" />
                </div>
                <CardTitle className="text-2xl text-earth-700">I'm a Buyer</CardTitle>
                <CardDescription className="text-base">
                  Find fresh, local produce from nearby farmers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-earth-600 hover:bg-earth-700 text-white">
                  Find Products
                </Button>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>• Browse local farms</p>
                  <p>• Filter by location & type</p>
                  <p>• Contact farmers directly</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button 
              onClick={() => setShowAuth(true)}
              variant="outline"
              className="border-agri-300 text-agri-700 hover:bg-agri-50"
            >
              Create Account with Location
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect local farmers with buyers in your area
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-agri-100 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-agri-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Set Your Location</h4>
              <p className="text-gray-600">
                Share your location during signup to find farmers and buyers near you.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-earth-100 rounded-full w-fit">
                <Users className="h-8 w-8 text-earth-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Connect Directly</h4>
              <p className="text-gray-600">
                Browse profiles and products, then contact farmers or buyers directly.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-agri-100 rounded-full w-fit">
                <Leaf className="h-8 w-8 text-agri-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Fresh Local Trade</h4>
              <p className="text-gray-600">
                Enjoy fresh produce while supporting local agriculture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AgriLocal?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make it easy to connect local farmers with conscious buyers, creating stronger communities
              and promoting sustainable agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="mx-auto mb-4 p-4 bg-agri-100 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-agri-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Location-Based Discovery</h4>
              <p className="text-gray-600">
                Find farmers and buyers within your local area using GPS or PIN code location.
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="mx-auto mb-4 p-4 bg-earth-100 rounded-full w-fit">
                <Leaf className="h-8 w-8 text-earth-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Fresh & Sustainable</h4>
              <p className="text-gray-600">
                Support local agriculture and enjoy the freshest produce with minimal environmental impact.
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="mx-auto mb-4 p-4 bg-agri-100 rounded-full w-fit">
                <Star className="h-8 w-8 text-agri-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Direct Connection</h4>
              <p className="text-gray-600">
                No middlemen. Connect directly with farmers for the best prices and freshest products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-agri-400" />
            <span className="text-xl font-bold">AgriLocal</span>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering local farming through direct connections
          </p>
          <p className="text-sm text-gray-500">
            Building stronger communities, one farm at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
