-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'recruiter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_descriptions table
CREATE TABLE IF NOT EXISTS public.job_descriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT[] NOT NULL,
  keywords TEXT[] NOT NULL,
  skill_weights JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_name TEXT NOT NULL,
  candidate_email TEXT,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  extracted_text TEXT,
  extracted_skills TEXT[],
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create screening_results table
CREATE TABLE IF NOT EXISTS public.screening_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  job_description_id UUID REFERENCES public.job_descriptions(id) ON DELETE CASCADE,
  overall_score DECIMAL(5,2) NOT NULL,
  skill_matches JSONB DEFAULT '{}',
  keyword_matches JSONB DEFAULT '{}',
  match_details JSONB DEFAULT '{}',
  recruiter_notes TEXT,
  recruiter_rating INTEGER CHECK (recruiter_rating >= 1 AND recruiter_rating <= 5),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'rejected', 'interviewed')),
  screened_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for job_descriptions
CREATE POLICY "job_descriptions_select_all" ON public.job_descriptions FOR SELECT USING (true);
CREATE POLICY "job_descriptions_insert_own" ON public.job_descriptions FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "job_descriptions_update_own" ON public.job_descriptions FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "job_descriptions_delete_own" ON public.job_descriptions FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for resumes
CREATE POLICY "resumes_select_all" ON public.resumes FOR SELECT USING (true);
CREATE POLICY "resumes_insert_own" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "resumes_update_own" ON public.resumes FOR UPDATE USING (auth.uid() = uploaded_by);
CREATE POLICY "resumes_delete_own" ON public.resumes FOR DELETE USING (auth.uid() = uploaded_by);

-- RLS Policies for screening_results
CREATE POLICY "screening_results_select_all" ON public.screening_results FOR SELECT USING (true);
CREATE POLICY "screening_results_insert_own" ON public.screening_results FOR INSERT WITH CHECK (auth.uid() = screened_by);
CREATE POLICY "screening_results_update_own" ON public.screening_results FOR UPDATE USING (auth.uid() = screened_by);
CREATE POLICY "screening_results_delete_own" ON public.screening_results FOR DELETE USING (auth.uid() = screened_by);
