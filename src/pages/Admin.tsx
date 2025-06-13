
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GiftManagement } from "@/components/admin/GiftManagement";
import { InterestManagement } from "@/components/admin/InterestManagement";
import { OccasionManagement } from "@/components/admin/OccasionManagement";
import { BudgetManagement } from "@/components/admin/BudgetManagement";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: adminData, error } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !adminData) {
        setIsAdmin(false);
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have admin privileges.",
        });
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50]">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Admin Tabs */}
        <Card className="backdrop-blur-sm bg-white/90">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Platform Management</h2>
            <p className="text-gray-600">Manage gifts, interests, occasions, and budget ranges</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="gifts" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="gifts">Gifts</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
                <TabsTrigger value="occasions">Occasions</TabsTrigger>
                <TabsTrigger value="budgets">Budget Ranges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gifts" className="mt-6">
                <GiftManagement />
              </TabsContent>
              
              <TabsContent value="interests" className="mt-6">
                <InterestManagement />
              </TabsContent>
              
              <TabsContent value="occasions" className="mt-6">
                <OccasionManagement />
              </TabsContent>
              
              <TabsContent value="budgets" className="mt-6">
                <BudgetManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
