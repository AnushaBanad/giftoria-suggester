
-- Create a storage bucket for gift images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gift-images', 'gift-images', true);

-- Create policy to allow anyone to view gift images (since they're public)
CREATE POLICY "Anyone can view gift images" ON storage.objects
FOR SELECT USING (bucket_id = 'gift-images');

-- Create policy to allow authenticated users to upload gift images
CREATE POLICY "Authenticated users can upload gift images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gift-images' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update gift images
CREATE POLICY "Authenticated users can update gift images" ON storage.objects
FOR UPDATE USING (bucket_id = 'gift-images' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete gift images
CREATE POLICY "Authenticated users can delete gift images" ON storage.objects
FOR DELETE USING (bucket_id = 'gift-images' AND auth.role() = 'authenticated');

-- Update the gifts table to support multiple images
ALTER TABLE gifts ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';
