-- Create storage bucket for resume files
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume-files', 'resume-files', true);

-- Set up RLS policies for the storage bucket
CREATE POLICY "Allow authenticated users to upload resumes" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'resume-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to view resumes" ON storage.objects
FOR SELECT USING (
  bucket_id = 'resume-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to delete their resumes" ON storage.objects
FOR DELETE USING (
  bucket_id = 'resume-files' 
  AND auth.role() = 'authenticated'
);
