
import { useState, useEffect } from "react";
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
  Settings,
  Gift
} from "lucide-react";

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

  // Initialize with stored values from localStorage or default values
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {
      name: "",
      email: "",
      phone: ""
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({...userData});

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setEditedUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Handle editing profile data
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setUserData(editedUserData);
    localStorage.setItem('userData', JSON.stringify(editedUserData));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleCancelEdit = () => {
    setEditedUserData({...userData});
    setIsEditing(false);
  };

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
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (confirmed) {
      // Clear local storage
      localStorage.removeItem('userData');
      
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully."
      });
      
      navigate("/");
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    
    navigate("/");
  };

  const removeFromLiked = (id: number) => {
    toast({
      title: "Item removed",
      description: "Item removed from your liked items."
    });
  };

  const removeFromCart = (id: number) => {
    toast({
      title: "Item removed",
      description: "Item removed from your cart."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
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
          
          <TabsContent value="profile">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  Personal Information
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="flex flex-col space-y-1">
                      <Label>Full Name</Label>
                      <Input 
                        value={editedUserData.name} 
                        onChange={(e) => setEditedUserData({...editedUserData, name: e.target.value})} 
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Label>Email Address</Label>
                      <Input 
                        value={editedUserData.email} 
                        onChange={(e) => setEditedUserData({...editedUserData, email: e.target.value})} 
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Label>Phone Number</Label>
                      <Input 
                        value={editedUserData.phone} 
                        onChange={(e) => setEditedUserData({...editedUserData, phone: e.target.value})} 
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-1">
                      <Label>Full Name</Label>
                      <Input value={userData.name || "Not provided"} readOnly className="bg-gray-50" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Label>Email Address</Label>
                      <Input value={userData.email || "Not provided"} readOnly className="bg-gray-50" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Label>Phone Number</Label>
                      <Input value={userData.phone || "Not provided"} readOnly className="bg-gray-50" />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600" onClick={handleEditProfile}>
                    <Settings className="w-4 h-4 mr-2" /> Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
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
          
          <TabsContent value="wishlist">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Liked Items
                </h2>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-4">Save items you love by clicking the heart icon</p>
                  <Link to="/dashboard">
                    <Button variant="outline">
                      Start Browsing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cart">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-500" />
                  Shopping Cart
                </h2>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Add items to your cart to get started</p>
                  <Link to="/dashboard">
                    <Button variant="outline">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="backdrop-blur-sm bg-white/90">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-500" />
                  My Orders
                </h2>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-4">Your order history will appear here</p>
                  <Link to="/dashboard">
                    <Button variant="outline">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
