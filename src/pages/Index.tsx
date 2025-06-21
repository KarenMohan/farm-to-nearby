
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Leaf, Users, Star } from "lucide-react";
import FarmerDashboard from "@/components/FarmerDashboard";
import BuyerDashboard from "@/components/BuyerDashboard";

const Index = () => {
  const [userRole, setUserRole] = useState<'farmer' | 'buyer' | null>(null);

  if (userRole === 'farmer') {
    return <FarmerDashboard onBack={() => setUserRole(null)} />;
  }

  if (userRole === 'buyer') {
    return <BuyerDashboard onBack={() => setUserRole(null)} />;
  }

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
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location-based
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Direct Connect
              </span>
              <span className="flex items-center gap-1">
                <Leaf className="h-4 w-4" />
                Local Fresh
              </span>
            </div>
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
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
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
