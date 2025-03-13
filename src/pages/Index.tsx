
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-warm to-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Sparkling Background */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: `radial-gradient(circle at center, 
                  ${['#FFD700', '#FFA500', '#FF69B4', '#00CED1'][i % 4]} 0%,
                  transparent 70%)`,
                opacity: 0.6,
              }}
            />
          </div>
        ))}

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 animate-fadeIn">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-theme-rose via-[#FFD700] to-theme-sage blur opacity-75"></div>
            <div className="relative bg-white rounded-full p-4">
              <Gift className="w-12 h-12 text-gray-800" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tight">
            Find the Perfect Gift
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover thoughtful gift ideas tailored to your interests and budget
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="text-lg px-8 py-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate("/login")}
            >
              Get Started
              <Heart className={`ml-2 ${isHovered ? 'text-theme-rose' : 'text-white'} transition-colors duration-300`} />
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Personalized",
              description: "Tailored suggestions based on interests and preferences",
            },
            {
              icon: Package,
              title: "Budget-Friendly",
              description: "Find perfect gifts within your specified budget",
            },
            {
              icon: Gift,
              title: "Occasions",
              description: "Curated ideas for every special moment",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-white/30 p-6 rounded-2xl border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="rounded-full bg-theme-sage w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
