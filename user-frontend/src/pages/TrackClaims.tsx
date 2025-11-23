import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle, XCircle, Calendar, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

const TrackClaims = () => {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  const claims = [
    {
      id: "CLM-2024-001",
      type: "Vehicle Accident",
      amount: "$3,500",
      status: "Under Review",
      date: "2024-01-15",
      statusColor: "warning",
      progress: 60,
      timeline: [
        { step: "Submitted", date: "2024-01-15", completed: true },
        { step: "Documents Verified", date: "2024-01-16", completed: true },
        { step: "Under Review", date: "2024-01-17", completed: true, current: true },
        { step: "Approved/Rejected", date: "Pending", completed: false },
      ],
    },
    {
      id: "CLM-2024-002",
      type: "Medical Bills",
      amount: "$1,200",
      status: "Approved",
      date: "2024-01-10",
      statusColor: "success",
      progress: 100,
      timeline: [
        { step: "Submitted", date: "2024-01-10", completed: true },
        { step: "Documents Verified", date: "2024-01-11", completed: true },
        { step: "Under Review", date: "2024-01-12", completed: true },
        { step: "Approved", date: "2024-01-14", completed: true, current: true },
      ],
    },
    {
      id: "CLM-2024-003",
      type: "Property Damage",
      amount: "$5,800",
      status: "Pending Documents",
      date: "2024-01-08",
      statusColor: "warning",
      progress: 30,
      timeline: [
        { step: "Submitted", date: "2024-01-08", completed: true },
        { step: "Documents Requested", date: "2024-01-09", completed: true, current: true },
        { step: "Under Review", date: "Pending", completed: false },
        { step: "Approved/Rejected", date: "Pending", completed: false },
      ],
    },
  ];

  const getStatusBadge = (status: string, color: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      success: "default",
      warning: "secondary",
      destructive: "destructive",
    };

    return (
      <Badge variant={variants[color] || "outline"} className={color === "success" ? "bg-success text-success-foreground" : ""}>
        {status}
      </Badge>
    );
  };

  const filterClaims = (filter: string) => {
    if (filter === "all") return claims;
    if (filter === "pending") return claims.filter(c => c.statusColor === "warning");
    if (filter === "approved") return claims.filter(c => c.statusColor === "success");
    if (filter === "rejected") return claims.filter(c => c.statusColor === "destructive");
    return claims;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Track Claims</h1>
          <p className="text-muted-foreground">Monitor the status of your insurance claims</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          {["all", "pending", "approved", "rejected"].map((filter) => (
            <TabsContent key={filter} value={filter} className="space-y-6">
              {filterClaims(filter).map((claim) => (
                <Card key={claim.id} className="border-border shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl">{claim.id}</CardTitle>
                            {getStatusBadge(claim.status, claim.statusColor)}
                          </div>
                          <CardDescription className="text-base">{claim.type}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">{claim.amount}</p>
                        <p className="text-sm text-muted-foreground flex items-center justify-end gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {claim.date}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{claim.progress}%</span>
                      </div>
                      <Progress value={claim.progress} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Claim Timeline</h4>
                      <div className="space-y-3">
                        {claim.timeline.map((step, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="relative">
                              {step.completed ? (
                                <div className={`h-8 w-8 rounded-full ${step.current ? "bg-primary" : "bg-success"} flex items-center justify-center`}>
                                  <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                              ) : (
                                <div className="h-8 w-8 rounded-full border-2 border-muted bg-background" />
                              )}
                              {index < claim.timeline.length - 1 && (
                                <div className={`absolute left-1/2 top-8 w-0.5 h-6 -translate-x-1/2 ${step.completed ? "bg-success" : "bg-muted"}`} />
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <p className={`font-medium ${step.current ? "text-primary" : "text-foreground"}`}>
                                {step.step}
                              </p>
                              <p className="text-sm text-muted-foreground">{step.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {claim.statusColor === "warning" && claim.status === "Pending Documents" && (
                      <Button variant="outline" className="w-full">
                        Upload Additional Documents
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

              {filterClaims(filter).length === 0 && (
                <Card className="border-border">
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No claims found in this category</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default TrackClaims;
