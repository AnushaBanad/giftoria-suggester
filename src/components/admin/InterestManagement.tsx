
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Interest {
  id: string;
  name: string;
  created_at: string;
}

export const InterestManagement = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInterest, setEditingInterest] = useState<Interest | null>(null);
  const [formData, setFormData] = useState({ name: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    const { data, error } = await supabase
      .from('interests')
      .select('*')
      .order('name');
    
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch interests" });
    } else {
      setInterests(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Interest name is required" });
      return;
    }

    try {
      if (editingInterest) {
        const { error } = await supabase
          .from('interests')
          .update({ name: formData.name.trim() })
          .eq('id', editingInterest.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Interest updated successfully" });
      } else {
        const { error } = await supabase
          .from('interests')
          .insert([{ name: formData.name.trim() }]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Interest created successfully" });
      }
      
      resetForm();
      fetchInterests();
      setIsDialogOpen(false);
    } catch (error: any) {
      if (error.code === '23505') {
        toast({ variant: "destructive", title: "Error", description: "Interest already exists" });
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to save interest" });
      }
    }
  };

  const handleEdit = (interest: Interest) => {
    setEditingInterest(interest);
    setFormData({ name: interest.name });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this interest?")) return;
    
    try {
      const { error } = await supabase.from('interests').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Interest deleted successfully" });
      fetchInterests();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete interest" });
    }
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setEditingInterest(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Interest Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Interest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingInterest ? "Edit Interest" : "Add New Interest"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Interest Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Enter interest name"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingInterest ? "Update" : "Create"} Interest
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interests.map((interest) => (
                <TableRow key={interest.id}>
                  <TableCell className="font-medium">{interest.name}</TableCell>
                  <TableCell>{new Date(interest.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(interest)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(interest.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
