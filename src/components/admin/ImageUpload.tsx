
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Link } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 2
}) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const { toast } = useToast();

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gift-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('gift-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image. Please try again."
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (images.length >= maxImages) {
      toast({
        variant: "destructive",
        title: "Maximum images reached",
        description: `You can only upload up to ${maxImages} images.`
      });
      return;
    }

    const file = files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload only JPEG, PNG, or WebP images."
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload images smaller than 5MB."
      });
      return;
    }

    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      onImagesChange([...images, uploadedUrl]);
      toast({
        title: "Success",
        description: "Image uploaded successfully!"
      });
    }
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid URL."
      });
      return;
    }

    if (images.length >= maxImages) {
      toast({
        variant: "destructive",
        title: "Maximum images reached",
        description: `You can only add up to ${maxImages} images.`
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
    } catch {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid image URL."
      });
      return;
    }

    onImagesChange([...images, urlInput.trim()]);
    setUrlInput("");
    toast({
      title: "Success",
      description: "Image URL added successfully!"
    });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">
          Gift Images ({images.length}/{maxImages}) *
        </Label>
        {images.length < maxImages && (
          <span className="text-xs text-muted-foreground">
            {maxImages - images.length} more required
          </span>
        )}
      </div>

      {/* Display current images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-2">
                <img
                  src={image}
                  alt={`Gift image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop";
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <div className="text-xs text-center mt-1 text-muted-foreground">
                  Image {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add new images */}
      {images.length < maxImages && (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">Add URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Click to upload or drag and drop
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    PNG, JPG, WebP up to 5MB
                  </span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
            </div>
            {uploading && (
              <div className="text-center text-sm text-muted-foreground">
                Uploading...
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="url" className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL (https://...)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
              />
              <Button type="button" onClick={handleUrlAdd} size="sm">
                <Link className="h-4 w-4 mr-1" />
                Add URL
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {images.length === 0 && (
        <div className="text-sm text-destructive">
          Please add exactly {maxImages} images for this gift.
        </div>
      )}
    </div>
  );
};
