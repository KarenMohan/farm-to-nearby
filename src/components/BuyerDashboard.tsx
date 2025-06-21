
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, MapPin, Leaf, Star, Phone, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  organic: boolean;
  harvest_date: string;
  farmer_id: string;
  image_url: string;
  profiles?: {
    first_name: string;
    last_name: string;
    farm_name: string;
    phone: string;
    location_address: string;
    farmer_photo: string;
  };
}

interface BuyerDashboardProps {
  onBack: () => void;
}

const BuyerDashboard = ({ onBack }: BuyerDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  // Hardcoded farmer data with photos and products
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      type: "Vegetables",
      price: 40,
      quantity: 50,
      unit: "kg",
      description: "Fresh, juicy tomatoes grown organically in our farm. Perfect for cooking and salads.",
      organic: true,
      harvest_date: "2024-01-15",
      farmer_id: "farmer1",
      image_url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400",
      profiles: {
        first_name: "Raj",
        last_name: "Patel",
        farm_name: "Green Valley Farm",
        phone: "+91 9876543210",
        location_address: "Village Kothrud, Pune, Maharashtra 411038",
        farmer_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: "2",
      name: "Organic Spinach",
      type: "Leafy Greens",
      price: 30,
      quantity: 25,
      unit: "kg",
      description: "Fresh spinach leaves, rich in iron and vitamins. Harvested this morning.",
      organic: true,
      harvest_date: "2024-01-16",
      farmer_id: "farmer1",
      image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
      profiles: {
        first_name: "Raj",
        last_name: "Patel",
        farm_name: "Green Valley Farm",
        phone: "+91 9876543210",
        location_address: "Village Kothrud, Pune, Maharashtra 411038",
        farmer_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: "3",
      name: "Fresh Carrots",
      type: "Vegetables",
      price: 35,
      quantity: 40,
      unit: "kg",
      description: "Sweet and crunchy carrots, perfect for cooking and juicing.",
      organic: false,
      harvest_date: "2024-01-14",
      farmer_id: "farmer2",
      image_url: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400",
      profiles: {
        first_name: "Priya",
        last_name: "Sharma",
        farm_name: "Sunrise Organic Farm",
        phone: "+91 9123456789",
        location_address: "Wakad, Pune, Maharashtra 411057",
        farmer_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: "4",
      name: "Farm Fresh Apples",
      type: "Fruits",
      price: 120,
      quantity: 30,
      unit: "kg",
      description: "Crisp and sweet apples, grown in our mountain orchard.",
      organic: true,
      harvest_date: "2024-01-10",
      farmer_id: "farmer3",
      image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
      profiles: {
        first_name: "Amit",
        last_name: "Singh",
        farm_name: "Mountain Fresh Orchards",
        phone: "+91 9988776655",
        location_address: "Lonavala, Pune, Maharashtra 410401",
        farmer_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: "5",
      name: "Fresh Basil",
      type: "Herbs",
      price: 80,
      quantity: 10,
      unit: "kg",
      description: "Aromatic fresh basil leaves, perfect for cooking and garnishing.",
      organic: true,
      harvest_date: "2024-01-16",
      farmer_id: "farmer2",
      image_url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400",
      profiles: {
        first_name: "Priya",
        last_name: "Sharma",
        farm_name: "Sunrise Organic Farm",
        phone: "+91 9123456789",
        location_address: "Wakad, Pune, Maharashtra 411057",
        farmer_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: "6",
      name: "Fresh Milk",
      type: "Dairy",
      price: 60,
      quantity: 20,
      unit: "liters",
      description: "Pure, fresh cow milk from grass-fed cows. Delivered daily.",
      organic: false,
      harvest_date: "2024-01-16",
      farmer_id: "farmer4",
      image_url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
      profiles: {
        first_name: "Suresh",
        last_name: "Kumar",
        farm_name: "Happy Cow Dairy",
        phone: "+91 9567834012",
        location_address: "Baramati, Pune, Maharashtra 413102",
        farmer_photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      }
    }
  ];

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter((product) => {
    const farmerName = product.profiles ? `${product.profiles.first_name} ${product.profiles.last_name}` : '';
    const farmName = product.profiles?.farm_name || '';
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || product.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleContactFarmer = (product: Product) => {
    const farmerName = product.profiles ? `${product.profiles.first_name} ${product.profiles.last_name}` : 'Farmer';
    const phone = product.profiles?.phone || 'Contact not available';
    
    toast({
      title: "Contact Information",
      description: `Contact ${farmerName} at ${phone}`,
    });
  };

  const handleRequestOrder = (product: Product) => {
    const farmerName = product.profiles ? `${product.profiles.first_name} ${product.profiles.last_name}` : 'the farmer';
    
    toast({
      title: "Order Request Sent!",
      description: `Your order request for ${product.name} has been sent to ${farmerName}.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-agri-50 flex items-center justify-center">
        <div className="text-center">
          <Search className="h-12 w-12 text-earth-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-agri-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-earth-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-earth-600 hover:text-earth-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
              <div className="flex items-center space-x-2">
                <Search className="h-6 w-6 text-earth-600" />
                <h1 className="text-xl font-bold text-earth-700">Find Local Products</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Within 25km of your location</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, farmers, or farms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Leafy Greens">Leafy Greens</SelectItem>
                  <SelectItem value="Herbs">Herbs</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProducts.length} Products Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing fresh products from local farmers
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const farmerName = product.profiles ? `${product.profiles.first_name} ${product.profiles.last_name}` : 'Unknown Farmer';
            const farmName = product.profiles?.farm_name || 'Unknown Farm';
            
            return (
              <Card key={product.id} className="hover-lift border border-earth-200 overflow-hidden">
                <CardHeader className="pb-3">
                  {/* Farmer Photo and Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={product.profiles?.farmer_photo}
                      alt={farmerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{farmerName}</p>
                      <p className="text-xs text-earth-600 font-medium">{farmName}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{product.profiles?.location_address}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Image */}
                  <div className="relative h-32 mb-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                    {product.organic && (
                      <span className="absolute top-2 right-2 bg-agri-100 text-agri-700 px-2 py-1 rounded-full text-xs font-medium">
                        Organic
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-earth-700 mb-1">{product.name}</CardTitle>
                      <span className="bg-earth-100 text-earth-700 px-2 py-1 rounded-full text-xs">
                        {product.type}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="font-bold text-xl text-earth-700">₹{product.price}/{product.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available:</span>
                      <span className="font-medium text-agri-600">{product.quantity} {product.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Harvested:</span>
                      <span className="text-sm">{new Date(product.harvest_date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">{product.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactFarmer(product)}
                      className="border-earth-300 text-earth-700 hover:bg-earth-50"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRequestOrder(product)}
                      className="bg-earth-600 hover:bg-earth-700 text-white"
                    >
                      Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
