import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, Bell, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import LandingHeader from "@/components/LandingHeader";

const Landing = () => {
  const features = [
    {
      icon: FileCheck,
      title: "Smart Claim Filing",
      description: "Upload documents and let AI extract information automatically",
    },
    {
      icon: Shield,
      title: "Real-time Tracking",
      description: "Track your claims with visual timeline and instant updates",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get notified about every status change and update",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "24/7 AI support to answer your insurance questions",
    },
  ];

  const benefits = [
    "File claims in under 2 minutes",
    "AI-powered document processing",
    "Real-time claim status updates",
    "Secure document storage",
    "Expert AI assistance",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Insurance Claims
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Insurance Claims Made
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Simple & Fast
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              File, track, and manage your insurance claims with AI automation. 
              Get approved faster with intelligent document processing and real-time updates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="gradient" className="text-base px-8">
                  Start Your Claim <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamlined claim management with powerful AI features
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose claimGuard?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the future of insurance claim management with our intelligent platform
                designed to save you time and reduce complexity.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-base text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup">
                <Button size="lg" variant="gradient" className="mt-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="shadow-strong border-border">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                        <FileCheck className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Average Processing Time</div>
                        <div className="text-3xl font-bold text-foreground">2 mins</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-success flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Claims Processed</div>
                        <div className="text-3xl font-bold text-foreground">50,000+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">AI Accuracy</div>
                        <div className="text-3xl font-bold text-foreground">98.5%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Simplify Your Claims?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust claimGuard for their insurance needs
          </p>
          <Link to="/signup">
            <Button size="lg" variant="gradient" className="text-base px-8">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
