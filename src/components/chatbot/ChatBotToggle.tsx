
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface ChatBotToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatBotToggle: React.FC<ChatBotToggleProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-2xl z-40 transition-all duration-300 hover:scale-110"
      size="icon"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};
