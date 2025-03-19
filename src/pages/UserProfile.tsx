
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, ShoppingBag, User, ArrowLeft, Gift, Trash2 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  getUserPreferences, 
  getLikedItemsArray,
  getCartItemsArray,
  saveLikedItems,
  saveCartItems
} from "@/utils/userPreferences";
import { giftDatabase } from "@/data/giftDatabase";
import { GiftImageCarousel } from "@/components/GiftImageCarousel";

const UserProfile = () => {
  const { toast } = useToast();
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set<string>());
  const [likedItemsDetails, setLikedItemsDetails] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<Set<string>>(new Set<string>());
  const [cartItemsDetails, setCartItemsDetails] = useState<any[]>([]);

  useEffect(() => {
    // Load liked and cart items from localStorage
    const userPrefs = getUserPreferences();
    setLikedItems(userPrefs.likedItems);
    setCartItems(userPrefs.cartItems);

    // Find gift details for liked items
    const likedItemsArray = getLikedItemsArray();
    findGiftDetails(likedItemsArray, setLikedItemsDetails);

    // Find gift details for cart items
    const cartItemsArray = getCartItemsArray();
    findGiftDetails(cartItemsArray, setCartItemsDetails);
  }, []);

  const findGiftDetails = (itemNames: string[], setDetailsFunction: React.Dispatch<React.SetStateAction<any[]>>) => {
    const details: any[] = [];
    
    itemNames.forEach(name => {
      // Search each category in the gift database
      Object.values(giftDatabase).forEach(categoryGifts => {
        const found = categoryGifts.find(gift => gift.name === name);
        if (found) {
          details.push(found);
        }
      });
    });
    
    setDetailsFunction(details);
  };

  const handleRemoveFromWishlist = (itemName: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemName);
      saveLikedItems(newSet);
      
      // Update liked items details
      setLikedItemsDetails(likedItemsDetails.filter(item => item.name !== itemName));
      
      toast({
        title: "Removed from wishlist",
        description: `${itemName} has been removed from your wishlist`
      });
      
      return newSet;
    });
  };

  const handleRemoveFromCart = (itemName: string) => {
    setCartItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemName);
      saveCartItems(newSet);
      
      // Update cart items details
      setCartItemsDetails(cartItemsDetails.filter(item => item.name !== itemName));
      
      toast({
        title: "Removed from cart",
        description: `${itemName} has been removed from your cart`
      });
      
      return newSet;
    });
  };

  const calculateTotal = () => {
    return cartItemsDetails.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] text-white">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">My Profile</h2>
              <p className="text-white/70">Manage your saved items</p>
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-none text-white">
          <Tabs defaultValue="wishlist" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-white/10 mb-6">
              <TabsTrigger value="wishlist" className="data-[state=active]:bg-rose-500">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist ({likedItemsDetails.length})
              </TabsTrigger>
              <TabsTrigger value="cart" className="data-[state=active]:bg-blue-500">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart ({cartItemsDetails.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wishlist" className="px-4 py-2">
              {likedItemsDetails.length === 0 ? (
                <div className="text-center py-12 opacity-60">
                  <Heart className="mx-auto h-12 w-12 mb-4 opacity-40" />
                  <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                  <p className="mb-4">Explore gift suggestions and add items you like!</p>
                  <Link to="/dashboard">
                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                      <Gift className="mr-2 h-4 w-4" />
                      Find Gifts
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {likedItemsDetails.map((item) => (
                    <Card key={item.name} className="bg-white/10 backdrop-blur-sm overflow-hidden group border-none">
                      {item.additionalImages ? (
                        <GiftImageCarousel
                          images={[item.image, ...(item.additionalImages || [])]}
                          name={item.name}
                          price={item.price}
                        />
                      ) : (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ₹{item.price}
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-transparent border-white/20 text-white hover:bg-white/20"
                            onClick={() => handleRemoveFromWishlist(item.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                          <a 
                            href={item.shopLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                            >
                              Buy Now
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cart" className="px-4 py-2">
              {cartItemsDetails.length === 0 ? (
                <div className="text-center py-12 opacity-60">
                  <ShoppingBag className="mx-auto h-12 w-12 mb-4 opacity-40" />
                  <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                  <p className="mb-4">Add items to your cart to purchase later!</p>
                  <Link to="/dashboard">
                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                      <Gift className="mr-2 h-4 w-4" />
                      Find Gifts
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cartItemsDetails.map((item) => (
                      <Card key={item.name} className="bg-white/10 backdrop-blur-sm overflow-hidden group border-none">
                        {item.additionalImages ? (
                          <GiftImageCarousel
                            images={[item.image, ...(item.additionalImages || [])]}
                            name={item.name}
                            price={item.price}
                          />
                        ) : (
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              ₹{item.price}
                            </div>
                          </div>
                        )}
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                          <p className="text-white/70 text-sm mb-4 line-clamp-2">{item.description}</p>
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-transparent border-white/20 text-white hover:bg-white/20"
                              onClick={() => handleRemoveFromCart(item.name)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                            <a 
                              href={item.shopLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                              >
                                Buy Now
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-white/20 backdrop-blur-sm border-none">
                    <CardHeader className="pb-2">
                      <h3 className="text-lg font-semibold">Cart Summary</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal ({cartItemsDetails.length} items):</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
                          <span>Total:</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                          Checkout
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
