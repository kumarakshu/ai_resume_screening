-- Insert sample job descriptions
INSERT INTO public.job_descriptions (title, description, required_skills, keywords, skill_weights, created_by) VALUES
(
  'Senior Software Engineer',
  'We are looking for a Senior Software Engineer with expertise in React, Node.js, and cloud technologies. The ideal candidate should have 5+ years of experience in full-stack development.',
  ARRAY['React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'MongoDB'],
  ARRAY['React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'full-stack', 'senior', 'engineer', 'cloud', 'microservices'],
  '{"React": 0.2, "Node.js": 0.2, "JavaScript": 0.15, "TypeScript": 0.15, "AWS": 0.1, "Docker": 0.1, "MongoDB": 0.1}',
  (SELECT id FROM auth.users LIMIT 1)
),
(
  'Data Scientist',
  'Seeking a Data Scientist with strong background in Python, machine learning, and statistical analysis. Experience with TensorFlow and PyTorch preferred.',
  ARRAY['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'SQL', 'Statistics', 'Pandas'],
  ARRAY['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'SQL', 'Statistics', 'Pandas', 'data science', 'AI', 'deep learning', 'neural networks'],
  '{"Python": 0.25, "Machine Learning": 0.2, "TensorFlow": 0.15, "PyTorch": 0.15, "SQL": 0.1, "Statistics": 0.1, "Pandas": 0.05}',
  (SELECT id FROM auth.users LIMIT 1)
);
