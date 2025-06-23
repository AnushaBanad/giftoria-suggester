
-- Create bills table to store purchase details
CREATE TABLE public.bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  amount DECIMAL NOT NULL,
  product_name TEXT,
  product_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own bills
CREATE POLICY "Users can view their own bills" 
  ON public.bills 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own bills
CREATE POLICY "Users can create their own bills" 
  ON public.bills 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_bills_user_id ON public.bills(user_id);
CREATE INDEX idx_bills_email ON public.bills(email);
