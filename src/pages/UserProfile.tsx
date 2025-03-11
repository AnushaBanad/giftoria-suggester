
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  User, 
  Lock, 
  LogOut, 
  Trash2, 
  Heart, 
  ShoppingCart, 
  ShoppingBag, 
  ChevronLeft,
  Settings
} from "lucide-react";

// Mock data for liked items
const likedItems = [
  {
    id: 1,
    name: "Smart Watch Pro",
    price: 15999,
    image: "https://images.meesho.com/images/products/266650767/m33ea_512.jpg",
    link: "https://www.meesho.com/smart-watches-for-men/p/3b8w2r"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 8999,
    image: "https://images.meesho.com/images/products/288171825/qnl5p_512.jpg",
    link: "https://www.meesho.com/smart-wireless-true-bluetooth-51-earbuds-tws-with-mic-ipx4-waterproof/p/3jrwka"
  }
];

// Mock data for cart items
const cartItems = [
  {
    id: 3,
    name: "Premium Book Collection",
    price: 4999,
    quantity: 1,
    image: "https://images.meesho.com/images/products/219166248/wbqao_512.jpg",
    link: "https://www.meesho.com/mindset-the-new-psychology-of-success-how-we-can-learn-to-fulfill-our-potential-book-by-carol-s-dweck-english-paperback/p/3c3mqj"
  }
];

// Mock data for orders
const orders = [
  {
    id: "ORD12345",
    date: "2023-10-15",
    items: [
      {
        name: "Digital Drawing Tablet",
        price: 8999,
        quantity: 1,
        image: "https://images.meesho.com/images/products/128479541/gq7io_512.jpg"
      }
    ],
    status: "Delivered",
    total: 8999
  }
];

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210"
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "New password and confirm password must match."
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long."
      });
      return;
    }
    
    // In a real app, this would call an API to change the password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    
    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would open a confirmation dialog and then call an API
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (confirmed) {
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully."
      });
      
      // Redirect to home page after account deletion
      navigate("/");
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear session/tokens
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    
    // Redirect to home page after logout
    navigate("/");
  };

  const removeFromLiked = (id: number) => {
    // In a real app, this would call an API to remove the item from likes
    toast({
      title: "Item removed",
      description: "Item removed from your liked items."
    });
  };

  const removeFromCart = (id: number) => {
    // In a real app, this would call an API to remove the item from cart
    toast({
      title: "Item removed",
      description: "Item removed from your cart."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back button and profile header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/dashboard" className="flex items-center text-white hover:text-gray-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center">
            <User className="w-6 h-6 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="w-4 h-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2">
              <Heart className="w-4 h-4" /> Wishlist
            </TabsTrigger>
            <TabsTrigger value="cart" className="gap-2">
              <ShoppingCart className="w-4 h-4" /> Cart
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="w-4 h-4" /> Orders
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  Personal Information
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label>Full Name</Label>
                  <Input value={userData.name} readOnly className="bg-gray-50" />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Email Address</Label>
                  <Input value={userData.email} readOnly className="bg-gray-50" />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label>Phone Number</Label>
                  <Input value={userData.phone} readOnly className="bg-gray-50" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
                  <Settings className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-600" />
                  Change Password
                </h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Update Password</Button>
                </form>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <div className="w-full h-px bg-gray-200 my-2"></div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-amber-600 border-amber-600 hover:bg-amber-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Liked Items
                </h2>
              </CardHeader>
              <CardContent>
                {likedItems.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">You haven't liked any items yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {likedItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-emerald-600 font-semibold">₹{item.price}</p>
                        </div>
                        <div className="flex space-x-2">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View
                          </a>
                          <button 
                            onClick={() => removeFromLiked(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Cart Tab */}
          <TabsContent value="cart">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-500" />
                  Shopping Cart
                </h2>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-emerald-600 font-semibold">₹{item.price}</p>
                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View
                          </a>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="text-gray-500">Subtotal:</p>
                        <p className="text-xl font-bold">₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-500" />
                  My Orders
                </h2>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="rounded-lg border overflow-hidden">
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 py-2">
                              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow">
                                <h3 className="font-medium">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-600">₹{item.price}</p>
                                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex justify-between items-center pt-4 mt-4 border-t">
                            <p className="font-medium">Total:</p>
                            <p className="font-bold">₹{order.total}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
