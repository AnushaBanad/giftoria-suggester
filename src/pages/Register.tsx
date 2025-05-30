
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumbers) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    if (password.length < 8) return "Password must be at least 8 characters long";
    
    return "";
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check the form for errors.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            phone: phone || null
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            variant: "destructive",
            title: "Account already exists",
            description: "An account with this email already exists. Please try logging in instead.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: error.message,
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Registration successful!",
          description: "Welcome to our gift recommendation platform.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-theme-warm to-white p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 backdrop-blur-sm bg-white/80 shadow-xl animate-fadeIn">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="rounded-full bg-theme-rose p-3">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </div>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Join us to find perfect gifts</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-xs sm:text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs sm:text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-sm sm:text-base ${errors.password ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-xs sm:text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 sm:py-3 text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <p className="text-xs sm:text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-800 hover:text-gray-600 underline transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
