
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, MapPin, Leaf, Star, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  distance: number;
  rating: number;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  organic: boolean;
  harvestDate: string;
  farmerName: string;
  farmName: string;
  farmerContact: string;
}

interface BuyerDashboardProps {
  onBack: () => void;
}

const BuyerDashboard = ({ onBack }: BuyerDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { toast } = useToast();

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      type: 'Vegetables',
      price: 45,
      quantity: 50,
      unit: 'kg',
      description: 'Vine-ripened organic tomatoes, perfect for salads and cooking',
      organic: true,
      harvestDate: '2024-01-15',
      farmerName: 'Rajesh Sharma',
      farmName: 'Sharma Organic Farm',
      farmerContact: '+91 9876543210'
    },
    {
      id: '2',
      name: 'Green Spinach',
      type: 'Leafy Greens',
      price: 35,
      quantity: 25,
      unit: 'kg',
      description: 'Fresh baby spinach leaves, rich in iron and vitamins',
      organic: true,
      harvestDate: '2024-01-16',
      farmerName: 'Rajesh Sharma',
      farmName: 'Sharma Organic Farm',
      farmerContact: '+91 9876543210'
    },
    {
      id: '3',
      name: 'Red Apples',
      type: 'Fruits',
      price: 120,
      quantity: 30,
      unit: 'kg',
      description: 'Crisp and sweet red apples, freshly harvested from our orchard',
      organic: false,
      harvestDate: '2024-01-10',
      farmerName: 'Priya Patel',
      farmName: 'Hillside Orchard',
      farmerContact: '+91 9876543211'
    },
    {
      id: '4',
      name: 'Fresh Milk',
      type: 'Dairy',
      price: 60,
      quantity: 20,
      unit: 'liters',
      description: 'Fresh cow milk from grass-fed cows, delivered daily',
      organic: true,
      harvestDate: '2024-01-17',
      farmerName: 'Mukesh Kumar',
      farmName: 'Kumar Dairy Farm',
      farmerContact: '+91 9876543212'
    },
    {
      id: '5',
      name: 'Fresh Mint',
      type: 'Herbs',
      price: 25,
      quantity: 5,
      unit: 'kg',
      description: 'Aromatic fresh mint leaves, perfect for teas and cooking',
      organic: true,
      harvestDate: '2024-01-16',
      farmerName: 'Sunita Devi',
      farmName: 'Herb Garden',
      farmerContact: '+91 9876543213'
    },
    {
      id: '6',
      name: 'Organic Carrots',
      type: 'Vegetables',
      price: 55,
      quantity: 40,
      unit: 'kg',
      description: 'Sweet and crunchy organic carrots, rich in beta-carotene',
      organic: true,
      harvestDate: '2024-01-14',
      farmerName: 'Ramesh Gupta',
      farmName: 'Gupta Vegetable Farm',
      farmerContact: '+91 9876543214'
    }
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || product.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleContactFarmer = (product: Product) => {
    toast({
      title: "Contact Information",
      description: `Contact ${product.farmerName} at ${product.farmerContact}`,
    });
  };

  const handleRequestOrder = (product: Product) => {
    toast({
      title: "Order Request Sent!",
      description: `Your order request for ${product.name} has been sent to ${product.farmerName}.`,
    });
  };

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
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
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
                  <SelectItem value="">All Categories</SelectItem>
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
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover-lift border border-earth-200 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-earth-700 mb-1">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      by {product.farmerName}
                    </CardDescription>
                    <CardDescription className="text-xs text-earth-600 font-medium">
                      {product.farmName}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {product.organic && (
                      <span className="bg-agri-100 text-agri-700 px-2 py-1 rounded-full text-xs font-medium">
                        Organic
                      </span>
                    )}
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
                    <span className="text-sm">{new Date(product.harvestDate).toLocaleDateString()}</span>
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
          ))}
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
