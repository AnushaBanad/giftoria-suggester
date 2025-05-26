import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your gift suggestion assistant. I can help you find the perfect gifts based on interests, budget, and occasions. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPriceDetails = (priceRange: string): string => {
    switch (priceRange.toLowerCase()) {
      case 'under 500':
      case 'below 500':
      case 'less than 500':
        return `
**Budget Under ₹500:**
• Personalized keychains (₹150-₹300)
• Small potted plants (₹200-₹400)
• Handmade greeting cards (₹100-₹250)
• Coffee mugs with quotes (₹200-₹350)
• Bookmarks and stationery (₹150-₹300)
• Small photo frames (₹250-₹450)

Perfect for: Casual gifts, office colleagues, small tokens of appreciation.`;

      case '500-1000':
      case 'between 500 and 1000':
        return `
**Budget ₹500-₹1000:**
• Scented candles (₹600-₹800)
• Small jewelry items (₹700-₹950)
• Books and novels (₹500-₹800)
• Desk organizers (₹600-₹900)
• Phone accessories (₹550-₹850)
• Small home decor items (₹650-₹950)

Perfect for: Friends, family members, small celebrations.`;

      case '1000-2500':
      case 'between 1000 and 2500':
        return `
**Budget ₹1000-₹2500:**
• Premium skincare sets (₹1200-₹2200)
• Bluetooth speakers (₹1500-₹2400)
• Fashion accessories (₹1100-₹2100)
• Art supplies (₹1300-₹2300)
• Perfumes (₹1400-₹2200)
• Gaming accessories (₹1600-₹2500)

Perfect for: Close friends, siblings, birthday gifts.`;

      case '2500-5000':
      case 'between 2500 and 5000':
        return `
**Budget ₹2500-₹5000:**
• Smart fitness trackers (₹3000-₹4500)
• Premium headphones (₹2800-₹4800)
• Skincare gift sets (₹2600-₹4200)
• Kitchen appliances (₹3200-₹4900)
• Fashion bags/wallets (₹2700-₹4600)
• Board games collection (₹2900-₹4400)

Perfect for: Special occasions, close family, significant others.`;

      case 'above 5000':
      case 'over 5000':
      case 'more than 5000':
        return `
**Budget Above ₹5000:**
• Smart watches (₹5500-₹15000)
• Premium gadgets (₹6000-₹20000)
• Jewelry sets (₹5200-₹25000)
• Experience gifts (₹5000-₹15000)
• Electronics (₹5500-₹30000)
• Luxury items (₹6000-₹50000)

Perfect for: Milestone celebrations, anniversaries, luxury gifting.`;

      default:
        return `
**General Price Guidelines:**

**Under ₹500:** Small thoughtful gifts, tokens of appreciation
**₹500-₹1000:** Casual gifts for friends and colleagues  
**₹1000-₹2500:** Standard gifts for family and close friends
**₹2500-₹5000:** Special occasion gifts, meaningful presents
**Above ₹5000:** Luxury gifts, milestone celebrations

You can set your exact budget in our gift finder tool for personalized suggestions!`;
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
      // Check for specific price ranges first
      if (message.includes('under 500') || message.includes('below 500') || message.includes('less than 500')) {
        return getPriceDetails('under 500');
      }
      if (message.includes('500') && (message.includes('1000') || message.includes('to') || message.includes('-'))) {
        return getPriceDetails('500-1000');
      }
      if (message.includes('1000') && (message.includes('2500') || message.includes('to') || message.includes('-'))) {
        return getPriceDetails('1000-2500');
      }
      if (message.includes('2500') && (message.includes('5000') || message.includes('to') || message.includes('-'))) {
        return getPriceDetails('2500-5000');
      }
      if (message.includes('above 5000') || message.includes('over 5000') || message.includes('more than 5000')) {
        return getPriceDetails('above 5000');
      }
      
      // General price inquiry
      return getPriceDetails('general');
    }
    
    if (message.includes('occasion') || message.includes('birthday') || message.includes('anniversary') || message.includes('wedding')) {
      return "We have gift suggestions for many occasions including birthdays, anniversaries, weddings, graduations, and more! Each occasion has curated gift ideas. What occasion are you shopping for?";
    }
    
    if (message.includes('interest') || message.includes('hobby') || message.includes('like')) {
      return "Great question! We can suggest gifts based on interests like technology, books, sports, art, music, cooking, fashion, and many more. What are the recipient's main interests?";
    }
    
    if (message.includes('how') && message.includes('work')) {
      return "It's simple! Just select the recipient's interests, set your budget, choose the occasion, and click 'Find Perfect Gifts'. Our system will generate personalized suggestions with images and shopping links.";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm here to help you find the perfect gifts. Feel free to ask me anything about gift suggestions, budgets, or occasions!";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm excited to help you find amazing gifts. You can ask me about different occasions, budget ranges, or specific interests. What would you like to explore?";
    }
    
    if (message.includes('popular') || message.includes('trending') || message.includes('best')) {
      return "Some of our most popular gift categories include tech gadgets, personalized items, experience gifts, and artisanal products. The best gifts often match the recipient's personal interests. What type of person are you shopping for?";
    }
    
    return "That's a great question! I can help you with gift suggestions based on interests, budgets, and occasions. You can also use our gift finder tool to get personalized recommendations. Is there something specific you'd like to know about gift giving?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 h-96 z-50 shadow-2xl border-2 border-gray-200 sm:bottom-16 sm:right-4 sm:w-72 sm:h-80 md:w-80 md:h-96 chatbot-container">
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold text-sm sm:text-base">Gift Assistant</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggle}
          className="text-white hover:bg-white/20 p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-0 h-full flex flex-col">
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isBot ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-2 rounded-lg text-xs sm:text-sm whitespace-pre-line",
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-emerald-500 text-white"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-2 rounded-lg text-xs sm:text-sm">
                  <span className="inline-flex items-center gap-1">
                    Typing
                    <span className="animate-pulse">...</span>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        <div className="p-3 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about gifts..."
              className="flex-1 text-xs sm:text-sm"
            />
            <Button 
              onClick={handleSendMessage}
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 px-2 sm:px-3"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
