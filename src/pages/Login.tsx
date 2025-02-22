
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate checking if user exists
      // In a real app, this would be an API call
      if (email === "nonexistent@example.com") {
        toast({
          variant: "destructive",
          title: "Account not found",
          description: "No account found with this email. Please register first.",
        });
        setTimeout(() => navigate("/register"), 2000);
        return;
      }

      toast({
        title: "Login successful!",
        description: "Welcome back to our gift recommendation platform.",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check the form for errors.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-theme-warm to-white p-4">
      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-white/80 shadow-xl animate-fadeIn">
        <div className="flex flex-col items-center space-y-6">
          <div className="rounded-full bg-theme-sage p-3">
            <Gift className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              Log In
            </Button>
          </form>

          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-800 hover:text-gray-600 underline transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;

