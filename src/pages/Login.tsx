
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address (e.g., name@gmail.com)";
    return "";
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    
    // Clear error if field becomes valid
    if (errors.email && validateEmail(value) === "") {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear error if field becomes valid
    if (errors.password && value.length >= 8) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please correct the errors below and try again.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password. Please check your credentials and try again.",
          });
        } else if (error.message.includes("Email not confirmed")) {
          toast({
            variant: "destructive",
            title: "Email not confirmed",
            description: "Please check your email and confirm your account before logging in.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: error.message,
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Login successful!",
          description: "Welcome back to our gift recommendation platform.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(forgotPasswordEmail);
    if (emailError) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: emailError,
      });
      return;
    }

    setIsResettingPassword(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Reset email sent!",
          description: "Check your email for password reset instructions.",
        });
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-theme-warm to-white p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 backdrop-blur-sm bg-white/80 shadow-xl animate-fadeIn">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="rounded-full bg-theme-sage p-3">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            </div>
            
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Reset Password</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Enter your email to reset your password</p>
            </div>

            <form onSubmit={handleForgotPassword} className="w-full space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="forgot-email" className="text-sm sm:text-base">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email (e.g., name@gmail.com)"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value.trim())}
                  className="w-full text-sm sm:text-base"
                  disabled={isResettingPassword}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 sm:py-3 text-sm sm:text-base"
                disabled={isResettingPassword}
              >
                {isResettingPassword ? "Sending..." : "Send Reset Email"}
              </Button>
            </form>

            <Button
              variant="outline"
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-sm sm:text-base"
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-theme-warm to-white p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 backdrop-blur-sm bg-white/80 shadow-xl animate-fadeIn">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="rounded-full bg-theme-sage p-3">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </div>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email (e.g., name@gmail.com)"
                value={email}
                onChange={handleEmailChange}
                className={`w-full text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs sm:text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
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
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              Forgot your password?
            </button>
            
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-800 hover:text-gray-600 underline transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
