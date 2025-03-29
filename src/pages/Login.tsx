
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const Login = () => {
  const [supersetId] = useState("6128347");
  const [password] = useState("••••••");
  const [passkey] = useState("327908");
  
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
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center">
              <span className="text-sm text-gray-600">Superset ID</span>
              <Input 
                value={supersetId} 
                readOnly 
                className="col-span-2 bg-gray-50" 
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <span className="text-sm text-gray-600">Password</span>
              <Input 
                type="password" 
                value={password} 
                readOnly 
                className="col-span-2 bg-gray-50" 
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <span className="text-sm text-gray-600">Passkey</span>
              <Input 
                value={passkey} 
                readOnly 
                className="col-span-2 bg-gray-50" 
              />
            </div>
            
            <div className="bg-amber-100 border border-amber-300 rounded-md p-2 flex items-center text-sm text-amber-800">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>You are not allowed to take this assessment.</p>
            </div>
            
            <Button 
              className="w-full bg-blue-800 hover:bg-blue-700 text-white"
            >
              Start Assessment
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="mt-4 text-xs text-gray-500">
        2023 Aon plc. All rights reserved
      </div>
    </div>
  );
};

export default Login;
