-- Create storage bucket for beverage images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('beverage-images', 'beverage-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for beverage images
CREATE POLICY "Anyone can view beverage images" ON storage.objects
  FOR SELECT USING (bucket_id = 'beverage-images');

CREATE POLICY "Authenticated users can upload beverage images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'beverage-images' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own beverage images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'beverage-images' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own beverage images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'beverage-images' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
