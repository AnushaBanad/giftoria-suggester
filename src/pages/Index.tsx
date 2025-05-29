
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-warm to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        {/* Sparkling Background */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
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
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-fadeIn">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-theme-rose via-[#FFD700] to-theme-sage blur opacity-75"></div>
            <div className="relative bg-white rounded-full p-3 sm:p-4">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-800" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight px-2">
            Find the Perfect Gift
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl px-4">
            Discover thoughtful gift ideas tailored to your interests and budget
          </p>

          {/* Centered Get Started Button */}
          <div className="flex justify-center w-full">
            <Button
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate("/login")}
            >
              Get Started
              <Heart className={`ml-2 w-4 h-4 sm:w-5 sm:h-5 ${isHovered ? 'text-theme-rose' : 'text-white'} transition-colors duration-300`} />
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              className="backdrop-blur-sm bg-white/30 p-4 sm:p-6 rounded-2xl border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="rounded-full bg-theme-sage w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
