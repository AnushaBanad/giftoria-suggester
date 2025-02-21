
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Search, Heart, ShoppingBag, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const interests = [
  "Technology", "Fashion", "Sports", "Books", "Music", 
  "Art", "Cooking", "Gaming", "Outdoor", "Fitness",
  "Travel", "Home Decor", "Photography", "Movies", "DIY",
  "Gardening", "Pets", "Beauty", "Coffee & Tea", "Wine & Spirits",
  "Jewelry", "Wellness", "Eco-Friendly", "Stationery", "Collectibles",
  "Cars", "Science", "Languages", "History", "Nature"
];

const occasions = [
  "Birthday", "Anniversary", "Wedding", "Graduation",
  "Christmas", "Valentine's Day", "Mother's Day", "Father's Day",
  "Housewarming", "Baby Shower", "Retirement", "New Job",
  "Thank You", "Get Well Soon", "Engagement", "New Year",
  "Easter", "Halloween", "Sweet 16", "Quinceañera",
  "Boss's Day", "Teacher Appreciation", "Friendship Day"
];

// Function to generate gift suggestions based on interests, budget, and occasion
const generateGiftSuggestions = (interests: string[], budget: number, occasion: string) => {
  const suggestions = new Set<string>();
  
  interests.forEach(interest => {
    switch (interest) {
      case "Technology":
        suggestions.add(`Smart ${budget > 200 ? 'Watch' : 'Speaker'}`);
        suggestions.add(`Wireless ${budget > 150 ? 'Headphones' : 'Earbuds'}`);
        break;
      case "Books":
        suggestions.add("Premium Book Collection");
        suggestions.add("E-reader");
        break;
      case "Gaming":
        suggestions.add(`${budget > 300 ? 'Gaming Console' : 'Popular Video Game'}`);
        suggestions.add("Gaming Accessories");
        break;
      // Add more cases for other interests
    }
  });

  // Add occasion-specific suggestions
  switch (occasion) {
    case "Wedding":
      suggestions.add("Personalized Photo Album");
      suggestions.add("Custom Art Piece");
      break;
    case "Birthday":
      suggestions.add("Experience Gift Card");
      suggestions.add("Premium Gift Basket");
      break;
    // Add more cases for other occasions
  }

  return Array.from(suggestions).slice(0, 6); // Return up to 6 suggestions
};

const Dashboard = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOccasion) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an occasion",
      });
      return;
    }

    if (!budget) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your budget",
      });
      return;
    }

    if (selectedInterests.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one interest",
      });
      return;
    }

    toast({
      title: "Finding perfect gifts...",
      description: "We're personalizing recommendations just for you!",
    });

    // Generate and display suggestions
    const newSuggestions = generateGiftSuggestions(selectedInterests, Number(budget), selectedOccasion);
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] relative overflow-hidden">
      {/* Floating Gift Animations */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${10 + Math.random() * 10}s infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <div className={`w-8 h-8 rounded-lg opacity-20 rotate-${Math.random() * 360}`}
               style={{
                 backgroundColor: [
                   "#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", 
                   "#FFDEE2", "#FDE1D3", "#D3E4FD"
                 ][i % 7]
               }}>
          </div>
        </div>
      ))}

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col space-y-6 animate-fadeIn py-8">
          {/* Header */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Gift className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Personalize Your Gifts</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Interests Section */}
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-theme-rose" />
                  Select Your Interests
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      onClick={() => handleInterestClick(interest)}
                      className={`rounded-full ${
                        selectedInterests.includes(interest)
                          ? "bg-theme-sage text-gray-800"
                          : ""
                      }`}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Section */}
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold">Set Your Budget</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Amount ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="0"
                    className="max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Occasions Section */}
            <Card className="backdrop-blur-sm bg-white/80">
              <CardHeader>
                <h2 className="text-xl font-semibold">Select Occasion</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((occasion) => (
                    <Button
                      key={occasion}
                      type="button"
                      variant={selectedOccasion === occasion ? "default" : "outline"}
                      onClick={() => setSelectedOccasion(occasion)}
                      className={`rounded-full ${
                        selectedOccasion === occasion
                          ? "bg-theme-sage text-gray-800"
                          : ""
                      }`}
                    >
                      {occasion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-theme-rose hover:bg-theme-sage text-gray-800 py-6 text-lg transition-all duration-300"
            >
              <Search className="mr-2" />
              Find Gift Recommendations
            </Button>
          </form>

          {/* Gift Suggestions Section */}
          {showSuggestions && suggestions.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/10 mt-8 animate-fadeIn">
              <CardHeader>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-theme-rose" />
                  Recommended Gifts
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <Gift className="w-4 h-4 text-theme-rose" />
                        <span>{suggestion}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        <DollarSign className="w-4 h-4 inline-block mr-1" />
                        Fits your budget
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
