
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

interface Occasion {
  id: string;
  name: string;
  created_at: string;
}

export const OccasionManagement = () => {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState<Occasion | null>(null);
  const [formData, setFormData] = useState({ name: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchOccasions();
  }, []);

  const fetchOccasions = async () => {
    const { data, error } = await supabase
      .from('occasions')
      .select('*')
      .order('name');
    
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch occasions" });
    } else {
      setOccasions(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Occasion name is required" });
      return;
    }

    try {
      if (editingOccasion) {
        const { error } = await supabase
          .from('occasions')
          .update({ name: formData.name.trim() })
          .eq('id', editingOccasion.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Occasion updated successfully" });
      } else {
        const { error } = await supabase
          .from('occasions')
          .insert([{ name: formData.name.trim() }]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Occasion created successfully" });
      }
      
      resetForm();
      fetchOccasions();
      setIsDialogOpen(false);
    } catch (error: any) {
      if (error.code === '23505') {
        toast({ variant: "destructive", title: "Error", description: "Occasion already exists" });
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to save occasion" });
      }
    }
  };

  const handleEdit = (occasion: Occasion) => {
    setEditingOccasion(occasion);
    setFormData({ name: occasion.name });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this occasion?")) return;
    
    try {
      const { error } = await supabase.from('occasions').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Occasion deleted successfully" });
      fetchOccasions();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete occasion" });
    }
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setEditingOccasion(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Occasion Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Occasion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingOccasion ? "Edit Occasion" : "Add New Occasion"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Occasion Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Enter occasion name"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingOccasion ? "Update" : "Create"} Occasion
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
              {occasions.map((occasion) => (
                <TableRow key={occasion.id}>
                  <TableCell className="font-medium">{occasion.name}</TableCell>
                  <TableCell>{new Date(occasion.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(occasion)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(occasion.id)}
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
