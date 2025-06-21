
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, MapPin, Leaf, Star } from "lucide-react";
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
  harvestDate: string;
}

interface FarmerDashboardProps {
  onBack: () => void;
}

const FarmerDashboard = ({ onBack }: FarmerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'products' | 'add-product' | 'profile'>('products');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      type: 'Vegetables',
      price: 45,
      quantity: 50,
      unit: 'kg',
      description: 'Vine-ripened organic tomatoes, perfect for salads and cooking',
      organic: true,
      harvestDate: '2024-01-15'
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
      harvestDate: '2024-01-16'
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    type: '',
    price: 0,
    quantity: 0,
    unit: 'kg',
    description: '',
    organic: false,
    harvestDate: ''
  });

  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.type || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name!,
      type: newProduct.type!,
      price: newProduct.price!,
      quantity: newProduct.quantity!,
      unit: newProduct.unit!,
      description: newProduct.description!,
      organic: newProduct.organic!,
      harvestDate: newProduct.harvestDate!
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      type: '',
      price: 0,
      quantity: 0,
      unit: 'kg',
      description: '',
      organic: false,
      harvestDate: ''
    });
    setActiveTab('products');

    toast({
      title: "Product Added!",
      description: "Your product has been successfully listed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-earth-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-agri-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-agri-600 hover:text-agri-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-agri-600" />
                <h1 className="text-xl font-bold text-agri-700">Farmer Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Mumbai, Maharashtra</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm border border-agri-200">
          <Button
            variant={activeTab === 'products' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'bg-agri-600 text-white' : 'text-gray-600'}
          >
            My Products
          </Button>
          <Button
            variant={activeTab === 'add-product' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('add-product')}
            className={activeTab === 'add-product' ? 'bg-agri-600 text-white' : 'text-gray-600'}
          >
            Add Product
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'bg-agri-600 text-white' : 'text-gray-600'}
          >
            Farm Profile
          </Button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
              <Button 
                onClick={() => setActiveTab('add-product')}
                className="bg-agri-600 hover:bg-agri-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover-lift border border-agri-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-agri-700">{product.name}</CardTitle>
                        <CardDescription className="text-sm">{product.type}</CardDescription>
                      </div>
                      {product.organic && (
                        <span className="bg-agri-100 text-agri-700 px-2 py-1 rounded-full text-xs font-medium">
                          Organic
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="font-semibold text-lg">₹{product.price}/{product.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Available:</span>
                        <span className="font-medium">{product.quantity} {product.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Harvest:</span>
                        <span className="text-sm">{new Date(product.harvestDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
          <div className="max-w-2xl mx-auto">
            <Card className="border border-agri-200">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-700">Add New Product</CardTitle>
                <CardDescription>
                  Add your fresh produce to reach local buyers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name *</Label>
                    <Input
                      id="product-name"
                      placeholder="e.g., Fresh Tomatoes"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-type">Product Type *</Label>
                    <Select 
                      value={newProduct.type} 
                      onValueChange={(value) => setNewProduct({ ...newProduct, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Leafy Greens">Leafy Greens</SelectItem>
                        <SelectItem value="Herbs">Herbs</SelectItem>
                        <SelectItem value="Grains">Grains</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="45"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="50"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select 
                      value={newProduct.unit} 
                      onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="grams">grams</SelectItem>
                        <SelectItem value="pieces">pieces</SelectItem>
                        <SelectItem value="liters">liters</SelectItem>
                        <SelectItem value="dozen">dozen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harvest-date">Harvest Date</Label>
                  <Input
                    id="harvest-date"
                    type="date"
                    value={newProduct.harvestDate}
                    onChange={(e) => setNewProduct({ ...newProduct, harvestDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product, growing methods, and any special features..."
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="organic"
                    checked={newProduct.organic}
                    onChange={(e) => setNewProduct({ ...newProduct, organic: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="organic">This is an organic product</Label>
                </div>

                <Button 
                  onClick={handleAddProduct}
                  className="w-full bg-agri-600 hover:bg-agri-700"
                >
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <Card className="border border-agri-200">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-700">Farm Profile</CardTitle>
                <CardDescription>
                  Manage your farm information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm-name">Farm Name</Label>
                    <Input id="farm-name" placeholder="Green Valley Farm" defaultValue="Sharma Organic Farm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmer-name">Farmer Name</Label>
                    <Input id="farmer-name" placeholder="Your Name" defaultValue="Rajesh Sharma" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-location">Farm Location</Label>
                  <Input id="farm-location" placeholder="Village, District, State" defaultValue="Pune, Maharashtra" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="+91 9876543210" defaultValue="+91 9876543210" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-description">Farm Description</Label>
                  <Textarea
                    id="farm-description"
                    placeholder="Tell buyers about your farm, farming practices, and values..."
                    rows={4}
                    defaultValue="We are a family-owned organic farm with over 20 years of experience. We practice sustainable farming methods and grow a variety of seasonal vegetables and fruits without the use of harmful chemicals."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <Input id="working-hours" placeholder="e.g., 6:00 AM - 6:00 PM" defaultValue="6:00 AM - 6:00 PM" />
                </div>

                <Button className="w-full bg-agri-600 hover:bg-agri-700">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
