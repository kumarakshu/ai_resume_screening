import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, FileSearch, Shield, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">TalentScreen Pro</h1>
              <p className="text-xs text-muted-foreground">Enterprise Recruitment Platform</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="font-medium bg-transparent">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 font-medium">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Enterprise-Grade Security & Compliance
          </div>
          <h2 className="text-5xl font-serif font-black text-foreground mb-6 leading-tight">
            Transform Your Recruitment Process with
            <span className="text-primary block mt-2">AI-Powered Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
            Streamline candidate screening, reduce hiring bias, and identify top talent faster with our enterprise-grade
            AI resume analysis platform trusted by Fortune 500 companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 font-semibold px-8">
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 bg-transparent">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Enterprise-Ready Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed for large-scale recruitment operations and compliance requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <FileSearch className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif font-bold">Intelligent Parsing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Advanced NLP algorithms extract and analyze skills, experience, and qualifications from any resume
                  format with 99.2% accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-serif font-bold">Predictive Scoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Machine learning models predict candidate success rates based on historical hiring data and job
                  performance metrics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-chart-3/10 rounded-lg">
                    <Users className="h-6 w-6 text-chart-3" />
                  </div>
                  <CardTitle className="font-serif font-bold">Collaborative Review</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Multi-stakeholder review workflows with role-based permissions, comments, and approval processes for
                  team-based hiring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-chart-4/10 rounded-lg">
                    <Shield className="h-6 w-6 text-chart-4" />
                  </div>
                  <CardTitle className="font-serif font-bold">Compliance Ready</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Built-in GDPR, EEOC, and SOC 2 compliance features with audit trails and data protection safeguards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-chart-5/10 rounded-lg">
                    <Zap className="h-6 w-6 text-chart-5" />
                  </div>
                  <CardTitle className="font-serif font-bold">API Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Seamless integration with existing ATS, HRIS, and recruitment platforms through comprehensive REST
                  APIs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif font-bold">Enterprise Scale</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Process thousands of resumes simultaneously with enterprise-grade infrastructure and 99.9% uptime SLA.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Streamlined Workflow</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to revolutionize your recruitment process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Define Requirements",
                description:
                  "Create detailed job profiles with required skills, experience levels, and custom scoring criteria.",
              },
              {
                step: "02",
                title: "Upload Resumes",
                description:
                  "Bulk upload candidate resumes or integrate with your existing ATS for seamless data flow.",
              },
              {
                step: "03",
                title: "AI Analysis",
                description:
                  "Our AI engine analyzes, scores, and ranks candidates based on your specific requirements.",
              },
              {
                step: "04",
                title: "Review & Decide",
                description:
                  "Collaborate with your team to review top candidates and make data-driven hiring decisions.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold font-serif">
                  {item.step}
                </div>
                <h4 className="text-xl font-serif font-bold mb-3 text-foreground">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Ready to Scale Your Recruitment?
            </h3>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              Join over 500+ enterprise clients who have transformed their hiring process with TalentScreen Pro. Start
              your free trial today and experience the future of recruitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="font-semibold px-8">
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-serif font-bold text-foreground">TalentScreen Pro</span>
                <p className="text-xs text-muted-foreground">Enterprise Recruitment Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 TalentScreen Pro. Enterprise-grade AI recruitment solutions.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              Built with Next.js, TypeScript & Advanced AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
