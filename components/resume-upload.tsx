"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, User } from "lucide-react"

interface ResumeUploadProps {
  onResumeUploaded: () => void
}

export default function ResumeUpload({ onResumeUploaded }: ResumeUploadProps) {
  const [candidateName, setCandidateName] = useState("")
  const [candidateEmail, setCandidateEmail] = useState("")
  const [selectedJobId, setSelectedJobId] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [jobs, setJobs] = useState<any[]>([])
  const [resumes, setResumes] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    loadJobs()
    loadResumes()
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setCurrentUser(userData.user)
      }
    } catch (error) {
      console.error("Error getting current user:", error)
    }
  }

  const loadJobs = async () => {
    try {
      const response = await fetch("/api/jobs")
      if (response.ok) {
        const data = await response.json()
        setJobs(data.jobs || [])
      }
    } catch (error) {
      console.error("Error loading jobs:", error)
    }
  }

  const loadResumes = async () => {
    try {
      const response = await fetch("/api/resumes")
      if (response.ok) {
        const data = await response.json()
        setResumes(data.resumes || [])
      }
    } catch (error) {
      console.error("Error loading resumes:", error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedJobId || !currentUser) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("candidateName", candidateName)
      formData.append("candidateEmail", candidateEmail)
      formData.append("jobId", selectedJobId)

      const response = await fetch("/api/resumes/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload resume")
      }

      // Reset form
      setCandidateName("")
      setCandidateEmail("")
      setSelectedJobId("")

      // Reload data
      loadResumes()
      onResumeUploaded()
    } catch (error) {
      console.error("Error uploading resume:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="candidateName">Candidate Name</Label>
            <Input
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Rajesh Kumar"
              required
            />
          </div>

          <div>
            <Label htmlFor="candidateEmail">Candidate Email</Label>
            <Input
              id="candidateEmail"
              type="email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="rajesh@example.com"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="jobSelect">Select Job Position</Label>
          <Select value={selectedJobId} onValueChange={setSelectedJobId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a job position" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="resume">Upload Resume</Label>
          <div className="mt-2">
            <Input
              id="resume"
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileUpload}
              disabled={isUploading || !selectedJobId || !candidateName || !currentUser}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, TXT, DOC, DOCX</p>
          </div>
        </div>

        {isUploading && (
          <div className="flex items-center gap-2 text-blue-600">
            <Upload className="h-4 w-4 animate-spin" />
            <span>Processing resume and generating AI score...</span>
          </div>
        )}
      </div>

      {/* Recent Uploads */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Uploads</h3>
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes uploaded yet.</p>
        ) : (
          <div className="grid gap-4">
            {resumes.slice(0, 5).map((resume) => (
              <Card key={resume.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    {resume.candidate_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{resume.file_name}</span>
                    </div>
                    {resume.candidate_email && <p className="text-sm text-gray-600">{resume.candidate_email}</p>}
                    <div>
                      <span className="text-sm font-medium">Extracted Skills: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {resume.extracted_skills?.slice(0, 5).map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {resume.extracted_skills?.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{resume.extracted_skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
