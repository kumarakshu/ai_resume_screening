// Resume parsing and scoring utilities
export interface ParsedResume {
  text: string
  skills: string[]
  experience: string[]
  education: string[]
}

export interface ScoringResult {
  overallScore: number
  skillMatches: Record<string, number>
  keywordMatches: Record<string, number>
  matchDetails: {
    totalSkillsFound: number
    totalSkillsRequired: number
    skillMatchPercentage: number
    keywordMatchPercentage: number
  }
}

// Simple text extraction from resume content
export function parseResumeText(text: string): ParsedResume {
  const lowerText = text.toLowerCase()

  // Common technical skills to look for
  const commonSkills = [
    "javascript",
    "typescript",
    "react",
    "node.js",
    "python",
    "java",
    "c++",
    "c#",
    "html",
    "css",
    "sql",
    "mongodb",
    "postgresql",
    "mysql",
    "aws",
    "azure",
    "docker",
    "kubernetes",
    "git",
    "linux",
    "windows",
    "machine learning",
    "tensorflow",
    "pytorch",
    "pandas",
    "numpy",
    "spring boot",
    "angular",
    "vue.js",
    "express",
    "django",
    "flask",
  ]

  const foundSkills = commonSkills.filter((skill) => lowerText.includes(skill.toLowerCase()))

  // Extract experience sections (simplified)
  const experienceKeywords = ["experience", "work", "employment", "position", "role"]
  const experience = experienceKeywords.filter((keyword) => lowerText.includes(keyword))

  // Extract education sections (simplified)
  const educationKeywords = ["education", "degree", "university", "college", "bachelor", "master", "phd"]
  const education = educationKeywords.filter((keyword) => lowerText.includes(keyword))

  return {
    text,
    skills: foundSkills,
    experience,
    education,
  }
}

// Score resume against job requirements
export function scoreResume(
  resumeSkills: string[],
  resumeText: string,
  jobSkills: string[],
  jobKeywords: string[],
  skillWeights: Record<string, number> = {},
): ScoringResult {
  const lowerResumeText = resumeText.toLowerCase()
  const lowerResumeSkills = resumeSkills.map((skill) => skill.toLowerCase())

  // Calculate skill matches
  const skillMatches: Record<string, number> = {}
  let totalSkillScore = 0

  jobSkills.forEach((skill) => {
    const lowerSkill = skill.toLowerCase()
    const weight = skillWeights[skill] || 1 / jobSkills.length

    if (lowerResumeSkills.includes(lowerSkill) || lowerResumeText.includes(lowerSkill)) {
      skillMatches[skill] = 1
      totalSkillScore += weight
    } else {
      skillMatches[skill] = 0
    }
  })

  // Calculate keyword matches
  const keywordMatches: Record<string, number> = {}
  let keywordScore = 0

  jobKeywords.forEach((keyword) => {
    const lowerKeyword = keyword.toLowerCase()
    if (lowerResumeText.includes(lowerKeyword)) {
      keywordMatches[keyword] = 1
      keywordScore += 1
    } else {
      keywordMatches[keyword] = 0
    }
  })

  const skillMatchPercentage = (Object.values(skillMatches).filter((v) => v === 1).length / jobSkills.length) * 100
  const keywordMatchPercentage = (keywordScore / jobKeywords.length) * 100

  // Overall score (70% skills, 30% keywords)
  const overallScore = totalSkillScore * 70 + keywordMatchPercentage * 0.3

  return {
    overallScore: Math.round(overallScore * 100) / 100,
    skillMatches,
    keywordMatches,
    matchDetails: {
      totalSkillsFound: Object.values(skillMatches).filter((v) => v === 1).length,
      totalSkillsRequired: jobSkills.length,
      skillMatchPercentage: Math.round(skillMatchPercentage * 100) / 100,
      keywordMatchPercentage: Math.round(keywordMatchPercentage * 100) / 100,
    },
  }
}
