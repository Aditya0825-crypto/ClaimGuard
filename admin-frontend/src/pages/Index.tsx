import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, CheckCircle2, Brain, FileCheck, TrendingUp, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect fraudulent claims with 95% accuracy"
    },
    {
      icon: FileCheck,
      title: "Automated Verification",
      description: "Instant policy validation and document verification reduces processing time by 80%"
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Bank-grade encryption and full compliance with insurance regulations"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Process claims in minutes, not days, with intelligent automation"
    }
  ];

  const stats = [
    { value: "95%", label: "Fraud Detection Accuracy" },
    { value: "80%", label: "Faster Processing" },
    { value: "50K+", label: "Claims Processed" },
    { value: "99.9%", label: "System Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="relative rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 shadow-2xl">
                <Shield className="h-20 w-20 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ClaimGuard
            </h1>
            <p className="text-2xl font-semibold text-foreground">
              Smart Insurance Claim Automation System
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Revolutionize your claim management with AI-powered fraud detection and automated verification. 
              Process claims faster, reduce fraud, and improve customer satisfaction.
            </p>
          </div>

          <div className="pt-6">
            <Button 
              size="lg" 
              onClick={() => navigate("/admin/login")} 
              className="group text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Access Admin Portal
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:border-primary/30 transition-all hover:shadow-md">
              <CardContent className="p-4 text-center space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage insurance claims efficiently and securely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Why Choose ClaimGuard?</CardTitle>
              <CardDescription>Built for modern insurance operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Reduce Fraud Losses</h3>
                    <p className="text-sm text-muted-foreground">
                      AI detection flags suspicious claims before approval
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Streamline Operations</h3>
                    <p className="text-sm text-muted-foreground">
                      Automate routine tasks and focus on complex cases
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Improve Accuracy</h3>
                    <p className="text-sm text-muted-foreground">
                      Eliminate human errors with automated validation
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Scale Effortlessly</h3>
                    <p className="text-sm text-muted-foreground">
                      Handle increased claim volume without adding staff
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ClaimGuard. All rights reserved. | Enterprise-grade insurance claim automation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
