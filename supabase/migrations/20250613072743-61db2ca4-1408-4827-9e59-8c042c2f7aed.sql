
-- Create admin roles table
CREATE TABLE public.admin_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create gifts table for admin management
CREATE TABLE public.gifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  occasions TEXT[] NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interests table
CREATE TABLE public.interests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create occasions table  
CREATE TABLE public.occasions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create budget ranges table
CREATE TABLE public.budget_ranges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  min_amount DECIMAL(10,2) NOT NULL,
  max_amount DECIMAL(10,2) NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_ranges ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE admin_roles.user_id = is_admin.user_id
  );
$$;

-- RLS Policies for admin_roles (only admins can manage)
CREATE POLICY "Only admins can view admin roles" ON public.admin_roles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert admin roles" ON public.admin_roles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update admin roles" ON public.admin_roles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete admin roles" ON public.admin_roles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for gifts (public read, admin write)
CREATE POLICY "Anyone can view gifts" ON public.gifts
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert gifts" ON public.gifts
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update gifts" ON public.gifts
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete gifts" ON public.gifts
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for interests (public read, admin write)
CREATE POLICY "Anyone can view interests" ON public.interests
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert interests" ON public.interests
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update interests" ON public.interests
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete interests" ON public.interests
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for occasions (public read, admin write)
CREATE POLICY "Anyone can view occasions" ON public.occasions
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert occasions" ON public.occasions
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update occasions" ON public.occasions
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete occasions" ON public.occasions
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for budget_ranges (public read, admin write)
CREATE POLICY "Anyone can view budget ranges" ON public.budget_ranges
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert budget ranges" ON public.budget_ranges
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update budget ranges" ON public.budget_ranges
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete budget ranges" ON public.budget_ranges
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Insert some default data
INSERT INTO public.interests (name) VALUES 
  ('Technology'), ('Sports'), ('Music'), ('Reading'), ('Cooking'), 
  ('Travel'), ('Gaming'), ('Art'), ('Fashion'), ('Fitness');

INSERT INTO public.occasions (name) VALUES 
  ('Birthday'), ('Anniversary'), ('Wedding'), ('Christmas'), ('Valentine''s Day'),
  ('Mother''s Day'), ('Father''s Day'), ('Graduation'), ('Housewarming'), ('Baby Shower');

INSERT INTO public.budget_ranges (min_amount, max_amount, label) VALUES 
  (0, 500, 'Under ₹500'),
  (500, 1000, '₹500 - ₹1000'),
  (1000, 2500, '₹1000 - ₹2500'),
  (2500, 5000, '₹2500 - ₹5000'),
  (5000, 10000, '₹5000 - ₹10000'),
  (10000, 999999, 'Above ₹10000');
