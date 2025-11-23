import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, XCircle, Plus, Bell, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Claims", value: "12", icon: FileText, color: "text-primary" },
    { label: "Pending", value: "3", icon: Clock, color: "text-warning" },
    { label: "Approved", value: "8", icon: CheckCircle, color: "text-success" },
    { label: "Rejected", value: "1", icon: XCircle, color: "text-destructive" },
  ];

  const recentClaims = [
    {
      id: "CLM-2024-001",
      type: "Vehicle Accident",
      amount: "$3,500",
      status: "Under Review",
      date: "2024-01-15",
      statusColor: "warning",
    },
    {
      id: "CLM-2024-002",
      type: "Medical Bills",
      amount: "$1,200",
      status: "Approved",
      date: "2024-01-10",
      statusColor: "success",
    },
    {
      id: "CLM-2024-003",
      type: "Property Damage",
      amount: "$5,800",
      status: "Pending Documents",
      date: "2024-01-08",
      statusColor: "warning",
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's an overview of your insurance claims</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-border hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={() => navigate("/file-claim")}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">File New Claim</h3>
                <p className="text-sm text-muted-foreground">Start a new insurance claim</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={() => navigate("/track-claims")}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Track Claims</h3>
                <p className="text-sm text-muted-foreground">View claim status & timeline</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={() => navigate("/notifications")}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center relative">
                <Bell className="h-6 w-6 text-primary" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">3 new updates available</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Claims */}
        <Card className="border-border shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Recent Claims</CardTitle>
                <CardDescription className="text-base mt-1">Your latest claim submissions</CardDescription>
              </div>
              <Link to="/track-claims">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/track-claims")}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{claim.id}</h4>
                        {getStatusBadge(claim.status, claim.statusColor)}
                      </div>
                      <p className="text-sm text-muted-foreground">{claim.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{claim.amount}</p>
                    <p className="text-sm text-muted-foreground">{claim.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
