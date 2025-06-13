
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  interests: string[];
  occasions: string[];
  image_url: string;
}

interface Interest {
  id: string;
  name: string;
}

interface Occasion {
  id: string;
  name: string;
}

export const GiftManagement = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    interests: [] as string[],
    occasions: [] as string[],
    image_url: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGifts();
    fetchInterests();
    fetchOccasions();
  }, []);

  const fetchGifts = async () => {
    const { data, error } = await supabase.from('gifts').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch gifts" });
    } else {
      setGifts(data || []);
    }
  };

  const fetchInterests = async () => {
    const { data, error } = await supabase.from('interests').select('*').order('name');
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch interests" });
    } else {
      setInterests(data || []);
    }
  };

  const fetchOccasions = async () => {
    const { data, error } = await supabase.from('occasions').select('*').order('name');
    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch occasions" });
    } else {
      setOccasions(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({ variant: "destructive", title: "Error", description: "Please fill in all required fields" });
      return;
    }

    const giftData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      interests: formData.interests,
      occasions: formData.occasions,
      image_url: formData.image_url
    };

    try {
      if (editingGift) {
        const { error } = await supabase
          .from('gifts')
          .update(giftData)
          .eq('id', editingGift.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Gift updated successfully" });
      } else {
        const { error } = await supabase.from('gifts').insert([giftData]);
        if (error) throw error;
        toast({ title: "Success", description: "Gift created successfully" });
      }
      
      resetForm();
      fetchGifts();
      setIsDialogOpen(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save gift" });
    }
  };

  const handleEdit = (gift: Gift) => {
    setEditingGift(gift);
    setFormData({
      name: gift.name,
      description: gift.description || "",
      price: gift.price.toString(),
      category: gift.category,
      interests: gift.interests,
      occasions: gift.occasions,
      image_url: gift.image_url || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gift?")) return;
    
    try {
      const { error } = await supabase.from('gifts').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Gift deleted successfully" });
      fetchGifts();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete gift" });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      interests: [],
      occasions: [],
      image_url: ""
    });
    setEditingGift(null);
  };

  const toggleInterest = (interestName: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestName)
        ? prev.interests.filter(i => i !== interestName)
        : [...prev.interests, interestName]
    }));
  };

  const toggleOccasion = (occasionName: string) => {
    setFormData(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasionName)
        ? prev.occasions.filter(o => o !== occasionName)
        : [...prev.occasions, occasionName]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gift Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Gift
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingGift ? "Edit Gift" : "Add New Gift"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                    <SelectItem value="Sports & Fitness">Sports & Fitness</SelectItem>
                    <SelectItem value="Books & Media">Books & Media</SelectItem>
                    <SelectItem value="Toys & Games">Toys & Games</SelectItem>
                    <SelectItem value="Beauty & Personal Care">Beauty & Personal Care</SelectItem>
                    <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                />
              </div>

              <div>
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest.id}
                      variant={formData.interests.includes(interest.name) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest.name)}
                    >
                      {interest.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Occasions</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {occasions.map((occasion) => (
                    <Badge
                      key={occasion.id}
                      variant={formData.occasions.includes(occasion.name) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleOccasion(occasion.name)}
                    >
                      {occasion.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingGift ? "Update" : "Create"} Gift
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
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead>Occasions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gifts.map((gift) => (
                <TableRow key={gift.id}>
                  <TableCell className="font-medium">{gift.name}</TableCell>
                  <TableCell>{gift.category}</TableCell>
                  <TableCell>₹{gift.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {gift.interests.slice(0, 2).map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {gift.interests.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{gift.interests.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {gift.occasions.slice(0, 2).map((occasion) => (
                        <Badge key={occasion} variant="outline" className="text-xs">
                          {occasion}
                        </Badge>
                      ))}
                      {gift.occasions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{gift.occasions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(gift)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(gift.id)}
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
