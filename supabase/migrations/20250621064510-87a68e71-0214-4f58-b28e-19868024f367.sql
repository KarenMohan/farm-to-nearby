
-- Create profiles table for storing user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('farmer', 'buyer')),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  location_pin_code TEXT,
  location_address TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  farm_name TEXT, -- Only for farmers
  farm_description TEXT, -- Only for farmers
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create products table for farmers
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL NOT NULL,
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  description TEXT,
  organic BOOLEAN DEFAULT false,
  harvest_date DATE,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Anyone can view available products" 
  ON public.products 
  FOR SELECT 
  USING (available = true);

CREATE POLICY "Farmers can manage their own products" 
  ON public.products 
  FOR ALL 
  USING (farmer_id = auth.uid());

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type, first_name, last_name, phone, location_pin_code, location_address, latitude, longitude, farm_name, farm_description)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'user_type',
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'location_pin_code',
    new.raw_user_meta_data ->> 'location_address',
    CASE 
      WHEN new.raw_user_meta_data ->> 'latitude' IS NOT NULL 
      THEN (new.raw_user_meta_data ->> 'latitude')::DECIMAL 
      ELSE NULL 
    END,
    CASE 
      WHEN new.raw_user_meta_data ->> 'longitude' IS NOT NULL 
      THEN (new.raw_user_meta_data ->> 'longitude')::DECIMAL 
      ELSE NULL 
    END,
    new.raw_user_meta_data ->> 'farm_name',
    new.raw_user_meta_data ->> 'farm_description'
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
