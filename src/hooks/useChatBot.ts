
import { useState } from 'react';

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(prev => !prev);
  };

  const openChatBot = () => {
    setIsOpen(true);
  };

  const closeChatBot = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleChatBot,
    openChatBot,
    closeChatBot
  };
};
