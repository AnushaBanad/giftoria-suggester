
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

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('budget') || message.includes('price') || message.includes('cost')) {
      return "I can help you find gifts within any budget! You can set your budget range in the gift finder form, and I'll suggest items that fit your price range. What's your preferred budget?";
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
    <Card className="fixed bottom-4 right-4 w-80 h-96 z-50 shadow-2xl border-2 border-gray-200 sm:w-72 sm:h-80 md:w-80 md:h-96">
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
                    "max-w-[80%] p-2 rounded-lg text-xs sm:text-sm",
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
