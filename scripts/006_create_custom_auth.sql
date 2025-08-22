-- Create custom users table that doesn't depend on Supabase Auth
CREATE TABLE IF NOT EXISTS public.custom_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'recruiter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table for custom session management
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.custom_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.custom_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow all operations for now since we're handling auth manually
CREATE POLICY "custom_users_all" ON public.custom_users FOR ALL USING (true);
CREATE POLICY "user_sessions_all" ON public.user_sessions FOR ALL USING (true);

-- Update existing tables to reference custom_users instead of auth.users
ALTER TABLE public.job_descriptions DROP CONSTRAINT IF EXISTS job_descriptions_created_by_fkey;
ALTER TABLE public.job_descriptions ADD CONSTRAINT job_descriptions_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES public.custom_users(id) ON DELETE CASCADE;

ALTER TABLE public.resumes DROP CONSTRAINT IF EXISTS resumes_uploaded_by_fkey;
ALTER TABLE public.resumes ADD CONSTRAINT resumes_uploaded_by_fkey 
  FOREIGN KEY (uploaded_by) REFERENCES public.custom_users(id) ON DELETE CASCADE;

ALTER TABLE public.screening_results DROP CONSTRAINT IF EXISTS screening_results_screened_by_fkey;
ALTER TABLE public.screening_results ADD CONSTRAINT screening_results_screened_by_fkey 
  FOREIGN KEY (screened_by) REFERENCES public.custom_users(id) ON DELETE CASCADE;

-- Drop the profiles table since we're using custom_users now
DROP TABLE IF EXISTS public.profiles CASCADE;
