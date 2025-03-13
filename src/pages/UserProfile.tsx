
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
  Gift,
  ExternalLink
} from "lucide-react";
import { giftDatabase } from "@/data/giftDatabase";
import { 
  getUserPreferences, 
  getLikedItemsArray, 
  getCartItemsArray, 
  saveLikedItems, 
  saveCartItems 
} from "@/utils/userPreferences";

// Helper to find gift details by name across all categories
const findGiftByName = (name: string) => {
  for (const category in giftDatabase) {
    const gift = giftDatabase[category].find(g => g.name === name);
    if (gift) return gift;
  }
  
  // Default gift if not found
  return {
    name,
    price: 0,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Item details not available",
    shopLink: "https://www.meesho.com/gift-finder"
  };
};

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
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Load user data and saved items from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setEditedUserData(JSON.parse(storedUserData));
    }
    
    setLikedItems(getLikedItemsArray());
    setCartItems(getCartItemsArray());
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

  const removeFromLiked = (name: string) => {
    const userPrefs = getUserPreferences();
    const newLikedItems = new Set(userPrefs.likedItems);
    newLikedItems.delete(name);
    
    saveLikedItems(newLikedItems);
    setLikedItems(Array.from(newLikedItems));
    
    toast({
      title: "Item removed",
      description: "Item removed from your liked items."
    });
  };

  const removeFromCart = (name: string) => {
    const userPrefs = getUserPreferences();
    const newCartItems = new Set(userPrefs.cartItems);
    newCartItems.delete(name);
    
    saveCartItems(newCartItems);
    setCartItems(Array.from(newCartItems));
    
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
                {likedItems.length === 0 ? (
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
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {likedItems.map((itemName, index) => {
                      const gift = findGiftByName(itemName);
                      return (
                        <Card key={index} className="flex overflow-hidden hover:shadow-md transition-shadow">
                          <div className="w-1/3 h-full">
                            <img 
                              src={gift.image} 
                              alt={gift.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500";
                              }}
                            />
                          </div>
                          <div className="flex flex-col justify-between w-2/3 p-3">
                            <div>
                              <h3 className="font-semibold">{gift.name}</h3>
                              <p className="text-sm text-gray-500">{gift.price > 0 ? `₹${gift.price}` : "Price not available"}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => removeFromLiked(itemName)}
                              >
                                <Trash2 className="w-4 h-4 mr-1" /> Remove
                              </Button>
                              {gift.shopLink && (
                                <a 
                                  href={gift.shopLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 flex items-center hover:underline"
                                >
                                  View <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
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
                {cartItems.length === 0 ? (
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
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((itemName, index) => {
                      const gift = findGiftByName(itemName);
                      return (
                        <Card key={index} className="flex overflow-hidden">
                          <div className="w-1/4 md:w-1/5">
                            <img 
                              src={gift.image} 
                              alt={gift.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500";
                              }}
                            />
                          </div>
                          <div className="flex flex-col justify-between w-3/4 md:w-4/5 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                              <div>
                                <h3 className="font-semibold text-lg">{gift.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{gift.description}</p>
                              </div>
                              <div className="flex flex-col md:items-end mt-2 md:mt-0">
                                <p className="font-bold text-lg">{gift.price > 0 ? `₹${gift.price}` : "Price not available"}</p>
                                <div className="flex space-x-2 mt-2 md:mt-auto">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => removeFromCart(itemName)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                                  </Button>
                                  {gift.shopLink && (
                                    <a href={gift.shopLink} target="_blank" rel="noopener noreferrer">
                                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                        Buy Now
                                      </Button>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                    
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mt-6">
                      <div>
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-gray-500 text-sm">({cartItems.length} items)</p>
                      </div>
                      <p className="text-2xl font-bold">
                        ₹{cartItems.reduce((total, itemName) => {
                          const gift = findGiftByName(itemName);
                          return total + gift.price;
                        }, 0)}
                      </p>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
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
