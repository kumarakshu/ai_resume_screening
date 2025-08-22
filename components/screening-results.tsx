"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Star, User, Brain } from "lucide-react"

export default function ScreeningResults() {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    try {
      const response = await fetch("/api/screening-results")
      if (!response.ok) throw new Error("Failed to fetch results")
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("Error loading results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateResult = async (resultId: string, updates: any) => {
    try {
      const response = await fetch(`/api/screening-results/${resultId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update result")
      loadResults()
    } catch (error) {
      console.error("Error updating result:", error)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "interviewed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading screening results...</div>
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No screening results yet. Upload some resumes to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Screening Results ({results.length})</h3>
        <div className="text-sm text-gray-500">Sorted by AI score (highest first)</div>
      </div>

      <div className="grid gap-6">
        {results.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-gray-400" />
                  <div>
                    <CardTitle className="text-xl">{result.resumes.candidate_name}</CardTitle>
                    <p className="text-sm text-gray-600">{result.resumes.candidate_email}</p>
                    <p className="text-sm text-gray-500">Applied for: {result.job_descriptions.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(result.overall_score)}`}>
                    {result.overall_score}%
                  </div>
                  <p className="text-sm text-gray-500">AI Score</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Score Breakdown */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Skill Match Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Skills Found</span>
                      <span>
                        {result.match_details.totalSkillsFound}/{result.match_details.totalSkillsRequired}
                      </span>
                    </div>
                    <Progress value={result.match_details.skillMatchPercentage} className="h-2" />
                    <p className="text-xs text-gray-500">{result.match_details.skillMatchPercentage}% skill match</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Keyword Match Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Keywords Found</span>
                      <span>{Object.values(result.keyword_matches).filter((v: any) => v === 1).length}</span>
                    </div>
                    <Progress value={result.match_details.keywordMatchPercentage} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {result.match_details.keywordMatchPercentage}% keyword match
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Comparison */}
              <div>
                <h4 className="font-medium mb-3">Skills Analysis</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-2">Matched Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(result.skill_matches)
                        .filter(([_, matched]) => matched === 1)
                        .map(([skill]) => (
                          <Badge key={skill} variant="default" className="bg-green-100 text-green-800 text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-red-600 mb-2">Missing Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(result.skill_matches)
                        .filter(([_, matched]) => matched === 0)
                        .map(([skill]) => (
                          <Badge key={skill} variant="outline" className="text-red-600 border-red-200 text-xs">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Skills */}
              <div>
                <h4 className="font-medium mb-2">Candidate's Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {result.resumes.extracted_skills?.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recruiter Actions */}
              <div className="border-t pt-4 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select value={result.status} onValueChange={(value) => updateResult(result.id, { status: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <Select
                      value={result.recruiter_rating?.toString() || ""}
                      onValueChange={(value) => updateResult(result.id, { recruiter_rating: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Rate candidate" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: rating }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="ml-1">
                                {rating} star{rating !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                    {result.recruiter_rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: result.recruiter_rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Recruiter Notes</label>
                  <Textarea
                    className="mt-1"
                    placeholder="Add your notes about this candidate..."
                    value={result.recruiter_notes || ""}
                    onChange={(e) => updateResult(result.id, { recruiter_notes: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
