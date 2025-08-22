# 🎯 TalentScreen Pro - AI Resume Screening System

**Enterprise-grade AI-powered resume screening and candidate management platform**

![TalentScreen Pro](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Overview

TalentScreen Pro is a comprehensive AI-powered recruitment platform that automates resume screening, candidate evaluation, and hiring workflows. Built with modern web technologies, it provides intelligent matching between job requirements and candidate profiles with detailed scoring and analytics.

## ✨ Key Features

### 🔐 Authentication & Security
- **Custom Authentication System** with secure session management
- **Role-based Access Control** for recruiters and administrators
- **Password Security** with SHA-256 hashing and salt
- **Session Tokens** with 7-day expiration for enhanced security

### 💼 Job Management
- **Dynamic Job Creation** with detailed requirements
- **Skill Weighting System** for precise candidate matching
- **Keyword Tracking** for enhanced relevance scoring
- **Job Library** for reusable job descriptions

### 📄 Resume Processing
- **Multi-format Support**: PDF, TXT, DOC, DOCX
- **Intelligent Text Extraction** with advanced parsing
- **Automated Skill Detection** (30+ technical skills)
- **Secure File Storage** using Supabase Storage
- **Candidate Information Management**

### 🤖 AI-Powered Screening
- **Automated Scoring Algorithm** (0-100% match)
- **Skill Matching Analysis** with detailed breakdowns
- **Keyword Relevance Scoring**
- **Weighted Evaluation** based on job requirements
- **Real-time Processing** with instant results

### 📊 Results & Analytics
- **Comprehensive Dashboard** with real-time statistics
- **Visual Progress Indicators** for skill matches
- **Recruiter Action Management** (shortlist, interview, reject)
- **5-Star Rating System** with detailed notes
- **Advanced Sorting & Filtering**

## 🏗️ Technical Architecture

### Frontend Stack
\`\`\`
Next.js 14 (App Router)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
├── Radix UI (Components)
├── React Hook Form (Forms)
└── Zod (Validation)
\`\`\`

### Backend Stack
\`\`\`
Next.js API Routes
├── Supabase PostgreSQL (Database)
├── Supabase Storage (File Storage)
├── Custom Authentication (Sessions)
└── Row Level Security (RLS)
\`\`\`

### Database Schema
\`\`\`sql
custom_users          # User authentication & profiles
├── user_sessions     # Session management
├── job_descriptions  # Job postings & requirements
├── resumes          # Candidate data & files
└── screening_results # AI scores & recruiter feedback
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/pnpm/yarn
- Supabase account

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/kumarakshu/ai_resume_screening.git
cd ai_resume_screening
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. **Set up Supabase**
- Create a new Supabase project
- Copy your project URL and anon key

4. **Configure environment variables**
\`\`\`env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

5. **Run database migrations**
Execute the SQL scripts in order:
\`\`\`bash
# In Supabase SQL Editor or using the v0 interface
scripts/001_create_database_schema.sql
scripts/002_create_profile_trigger.sql
scripts/003_seed_sample_data.sql
scripts/005_disable_email_confirmation.sql
scripts/006_create_custom_auth.sql
scripts/007_create_standalone_auth.sql
scripts/007_create_storage_bucket.sql
\`\`\`

6. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 📖 Usage Guide

### 1. Authentication
- **Sign Up**: Create a new recruiter account
- **Login**: Access your dashboard with credentials
- **Session Management**: Automatic session handling with secure tokens

### 2. Job Creation
- Navigate to "Job Descriptions" tab
- Fill in job title, description, and requirements
- Add required skills with custom weights
- Define important keywords for matching

### 3. Resume Upload
- Go to "Resume Upload" tab
- Select target job position
- Upload candidate resume (PDF/DOC/TXT)
- Enter candidate details (name, email)
- System automatically processes and scores

### 4. Review Results
- Check "Screening Results" tab
- Review AI scores and match details
- Add ratings (1-5 stars) and notes
- Update candidate status
- Sort by score or filter by status

## 🎯 AI Scoring Algorithm

The intelligent scoring system evaluates candidates using:

### Skill Analysis (70% Weight)
- Matches candidate skills against job requirements
- Uses custom skill weights for precise scoring
- Identifies both exact and contextual skill matches

### Keyword Analysis (30% Weight)
- Searches for important keywords in resume content
- Calculates keyword match percentage
- Enhances overall relevance scoring

### Final Score Calculation
\`\`\`
Final Score = (Skill Match % × 0.7) + (Keyword Match % × 0.3)
\`\`\`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Job Management
- `GET /api/jobs` - Fetch all jobs
- `POST /api/jobs` - Create new job

### Resume Processing
- `POST /api/resumes/upload` - Upload and process resume
- `GET /api/resumes` - Fetch all resumes

### Screening Results
- `GET /api/screening-results` - Fetch screening results
- `PUT /api/screening-results/[id]` - Update result status/rating

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🎨 Design System

### Typography
- **Headings**: Montserrat (Professional serif)
- **Body Text**: Open Sans (Clean sans-serif)
- **Monospace**: System monospace fonts

### Color Palette
- **Primary**: Professional green (#15803d)
- **Secondary**: Light green (#f0fdf4)
- **Accent**: Lime green (#84cc16)
- **Text**: Dark gray (#374151)
- **Background**: Clean white (#ffffff)

### Components
- Consistent UI components with hover states
- Responsive design (mobile-first)
- Accessibility features (ARIA labels, keyboard navigation)
- Professional card layouts and forms

## 📁 Project Structure

\`\`\`
ai_resume_screening/
├── app/
│   ├── api/                 # API routes
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── dashboard-content.tsx
│   ├── job-description-form.tsx
│   ├── resume-upload.tsx
│   └── screening-results.tsx
├── lib/
│   ├── custom-auth.ts     # Authentication logic
│   ├── resume-parser.ts   # Resume processing
│   └── utils.ts          # Utility functions
├── scripts/              # Database migrations
└── README.md
\`\`\`
