
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

interface BudgetRange {
  id: string;
  min_amount: number;
  max_amount: number;
  label: string;
  created_at: string;
}

export const BudgetManagement = () => {
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetRange | null>(null);
  const [formData, setFormData] = useState({
    min_amount: "",
    max_amount: "",
    label: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBudgetRanges();
  }, []);

  const fetchBudgetRanges = async () => {
    const { data, error } = await supabase
      .from('budget_ranges')
      .select('*')
      .order('min_amount');
    
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch budget ranges" });
    } else {
      setBudgetRanges(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.min_amount || !formData.max_amount || !formData.label) {
      toast({ variant: "destructive", title: "Error", description: "All fields are required" });
      return;
    }

    const minAmount = parseFloat(formData.min_amount);
    const maxAmount = parseFloat(formData.max_amount);

    if (minAmount >= maxAmount) {
      toast({ variant: "destructive", title: "Error", description: "Maximum amount must be greater than minimum amount" });
      return;
    }

    const budgetData = {
      min_amount: minAmount,
      max_amount: maxAmount,
      label: formData.label.trim()
    };

    try {
      if (editingBudget) {
        const { error } = await supabase
          .from('budget_ranges')
          .update(budgetData)
          .eq('id', editingBudget.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Budget range updated successfully" });
      } else {
        const { error } = await supabase
          .from('budget_ranges')
          .insert([budgetData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Budget range created successfully" });
      }
      
      resetForm();
      fetchBudgetRanges();
      setIsDialogOpen(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save budget range" });
    }
  };

  const handleEdit = (budget: BudgetRange) => {
    setEditingBudget(budget);
    setFormData({
      min_amount: budget.min_amount.toString(),
      max_amount: budget.max_amount.toString(),
      label: budget.label
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this budget range?")) return;
    
    try {
      const { error } = await supabase.from('budget_ranges').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Budget range deleted successfully" });
      fetchBudgetRanges();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete budget range" });
    }
  };

  const resetForm = () => {
    setFormData({
      min_amount: "",
      max_amount: "",
      label: ""
    });
    setEditingBudget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Budget Range Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Budget Range
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBudget ? "Edit Budget Range" : "Add New Budget Range"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_amount">Minimum Amount (₹) *</Label>
                  <Input
                    id="min_amount"
                    type="number"
                    step="0.01"
                    value={formData.min_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, min_amount: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="max_amount">Maximum Amount (₹) *</Label>
                  <Input
                    id="max_amount"
                    type="number"
                    step="0.01"
                    value={formData.max_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_amount: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g., ₹500 - ₹1000"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBudget ? "Update" : "Create"} Budget Range
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
                <TableHead>Label</TableHead>
                <TableHead>Min Amount</TableHead>
                <TableHead>Max Amount</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetRanges.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">{budget.label}</TableCell>
                  <TableCell>₹{budget.min_amount}</TableCell>
                  <TableCell>₹{budget.max_amount}</TableCell>
                  <TableCell>{new Date(budget.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(budget)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(budget.id)}
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
