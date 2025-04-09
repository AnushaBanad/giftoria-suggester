
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Login logic would go here
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center mb-6">
        <div className="border border-gray-300 rounded-md p-4 mb-4">
          <img 
            src="/lovable-uploads/2dea8876-da6e-4c87-baf6-040515e214f3.png" 
            alt="Cognizant Logo" 
            className="h-10 object-contain"
          />
        </div>
      </div>
      
      <Card className="w-full max-w-md p-6 shadow-md">
        <div className="space-y-6">
          <div className="pb-2 border-b border-gray-200">
            <h2 className="text-xl font-medium">Login</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </Card>
      
      <div className="mt-4 text-xs text-gray-500">
        2023 Aon plc. All rights reserved
      </div>
    </div>
  );
};

export default Login;
