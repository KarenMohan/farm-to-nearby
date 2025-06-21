
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Leaf, Users, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthPageProps {
  onBack: () => void;
  onSuccess: (userType: 'farmer' | 'buyer') => void;
}

const AuthPage = ({ onBack, onSuccess }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'farmer' | 'buyer'>('buyer');
  const [loading, setLoading] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    locationPinCode: '',
    locationAddress: '',
    latitude: null as number | null,
    longitude: null as number | null,
    farmName: '',
    farmDescription: ''
  });

  const { toast } = useToast();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        setUseCurrentLocation(true);
        setLoading(false);
        toast({
          title: "Location Found",
          description: "Your current location has been detected."
        });
      },
      (error) => {
        setLoading(false);
        toast({
          title: "Location Error",
          description: "Unable to get your location. Please enter manually.",
          variant: "destructive"
        });
      }
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile to determine type
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.user.id)
          .single();

        onSuccess(profile?.user_type || 'buyer');
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            user_type: userType,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            location_pin_code: formData.locationPinCode,
            location_address: formData.locationAddress,
            latitude: formData.latitude?.toString(),
            longitude: formData.longitude?.toString(),
            farm_name: userType === 'farmer' ? formData.farmName : null,
            farm_description: userType === 'farmer' ? formData.farmDescription : null
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Account created successfully. Please check your email to confirm your account."
      });

      // Switch to login mode after successful signup
      setIsLogin(true);
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-earth-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-agri-600" />
              <span className="text-xl font-bold">AgriLocal</span>
            </div>
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Welcome back! Sign in to your account.' 
              : 'Join AgriLocal to connect with local farmers and buyers.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userType">I am a</Label>
                  <Select value={userType} onValueChange={(value: 'farmer' | 'buyer') => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Buyer - Looking for fresh produce</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="farmer">
                        <div className="flex items-center space-x-2">
                          <Leaf className="h-4 w-4" />
                          <span>Farmer - Selling fresh produce</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Location Information</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={getCurrentLocation}
                      disabled={loading}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Use Current Location
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pinCode">PIN Code</Label>
                      <Input
                        id="pinCode"
                        value={formData.locationPinCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, locationPinCode: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.locationAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, locationAddress: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {useCurrentLocation && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                      ✓ Current location detected and will be saved with your profile
                    </div>
                  )}
                </div>

                {userType === 'farmer' && (
                  <div className="space-y-4 border-t pt-4">
                    <Label className="text-base font-medium">Farm Information</Label>
                    <div>
                      <Label htmlFor="farmName">Farm Name</Label>
                      <Input
                        id="farmName"
                        value={formData.farmName}
                        onChange={(e) => setFormData(prev => ({ ...prev, farmName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmDescription">Farm Description</Label>
                      <Textarea
                        id="farmDescription"
                        value={formData.farmDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, farmDescription: e.target.value }))}
                        placeholder="Tell us about your farm, what you grow, your farming practices..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
