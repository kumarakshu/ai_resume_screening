-- Create standalone custom_users table for authentication
CREATE TABLE IF NOT EXISTS public.custom_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'recruiter',
  session_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_custom_users_email ON public.custom_users(email);
CREATE INDEX IF NOT EXISTS idx_custom_users_session_token ON public.custom_users(session_token);

-- Enable Row Level Security
ALTER TABLE public.custom_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_users (allow all operations for now since we're managing auth manually)
CREATE POLICY "custom_users_select_all" ON public.custom_users FOR SELECT USING (true);
CREATE POLICY "custom_users_insert_all" ON public.custom_users FOR INSERT WITH CHECK (true);
CREATE POLICY "custom_users_update_all" ON public.custom_users FOR UPDATE USING (true);
