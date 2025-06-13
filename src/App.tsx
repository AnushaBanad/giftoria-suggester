
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import ProjectPresentation from "./pages/ProjectPresentation";
import Admin from "./pages/Admin";
import { ChatBot } from "./components/chatbot/ChatBot";
import { ChatBotToggle } from "./components/chatbot/ChatBotToggle";
import { useChatBot } from "./hooks/useChatBot";

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent = () => {
  const { isOpen, toggleChatBot } = useChatBot();

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presentation" element={<ProjectPresentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Chatbot Components */}
      <ChatBotToggle onClick={toggleChatBot} isOpen={isOpen} />
      <ChatBot isOpen={isOpen} onToggle={toggleChatBot} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
