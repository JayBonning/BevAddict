-- Update reviews table to support new enhanced form fields
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS beverage_type TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS date_consumed TIMESTAMP WITH TIME ZONE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS would_recommend BOOLEAN DEFAULT true;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_beverage_type ON reviews(beverage_type);
CREATE INDEX IF NOT EXISTS idx_reviews_date_consumed ON reviews(date_consumed);
CREATE INDEX IF NOT EXISTS idx_reviews_tags ON reviews USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_reviews_price ON reviews(price);
CREATE INDEX IF NOT EXISTS idx_reviews_would_recommend ON reviews(would_recommend);

-- Update RLS policies to include new fields
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

-- Add comments for documentation
COMMENT ON COLUMN reviews.beverage_type IS 'Type of beverage (coffee, tea, beer, wine, etc.)';
COMMENT ON COLUMN reviews.date_consumed IS 'When the beverage was consumed';
COMMENT ON COLUMN reviews.tags IS 'Array of tags for categorization';
COMMENT ON COLUMN reviews.price IS 'Price paid for the beverage';
COMMENT ON COLUMN reviews.would_recommend IS 'Whether user would recommend this beverage';
