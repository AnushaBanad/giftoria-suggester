
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Gift, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateName = (name: string) => {
    // Only letters and spaces allowed, minimum 2 characters
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Full name must be at least 2 characters long";
    if (!nameRegex.test(name.trim())) return "Full name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email: string) => {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address (e.g., name@gmail.com)";
    return "";
  };

  const validatePhone = (phone: string) => {
    // Exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone.replace(/\s/g, ""))) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumbers) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)";
    
    return "";
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateName(name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(phone);
    if (phoneError) newErrors.phone = phoneError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setName(filteredValue);
    
    // Clear error if field becomes valid
    if (errors.name && validateName(filteredValue) === "") {
      setErrors(prev => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    
    // Clear error if field becomes valid
    if (errors.email && validateEmail(value) === "") {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 10
    const filteredValue = value.replace(/\D/g, "").slice(0, 10);
    setPhone(filteredValue);
    
    // Clear error if field becomes valid
    if (errors.phone && validatePhone(filteredValue) === "") {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear error if field becomes valid
    if (errors.password && validatePassword(value) === "") {
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
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim(),
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
        // If admin registration, add to admin roles
        if (isAdmin) {
          const { error: adminError } = await supabase
            .from('admin_roles')
            .insert([{ user_id: data.user.id, role: 'admin' }]);
          
          if (adminError) {
            console.error("Admin role assignment error:", adminError);
          }
        }

        toast({
          title: "Registration successful!",
          description: isAdmin ? "Welcome admin! You can now manage the platform." : "Welcome to our gift recommendation platform.",
        });
        navigate(isAdmin ? "/admin" : "/dashboard");
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
          <div className={`rounded-full p-3 ${isAdmin ? 'bg-red-100' : 'bg-theme-rose'}`}>
            {isAdmin ? (
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            ) : (
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
            )}
          </div>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {isAdmin ? "Create Admin Account" : "Create Account"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              {isAdmin ? "Register as platform administrator" : "Join us to find perfect gifts"}
            </p>
          </div>

          {/* Admin Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="adminToggle"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <Label htmlFor="adminToggle" className="text-sm text-gray-700">
              Register as Admin
            </Label>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name (letters only)"
                value={name}
                onChange={handleNameChange}
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
              <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={handlePhoneChange}
                className={`text-sm sm:text-base ${errors.phone ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-xs sm:text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
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
              className={`w-full py-2 sm:py-3 text-sm sm:text-base ${
                isAdmin 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-gray-800 hover:bg-gray-700"
              } text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : (isAdmin ? "Register as Admin" : "Register")}
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
