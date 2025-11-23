import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2, XCircle, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "New Claims",
    value: "24",
    icon: FileText,
    trend: "+12%",
    trendUp: true,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "In Review",
    value: "18",
    icon: Clock,
    trend: "-5%",
    trendUp: false,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Approved",
    value: "156",
    icon: CheckCircle2,
    trend: "+8%",
    trendUp: true,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Rejected",
    value: "12",
    icon: XCircle,
    trend: "+3%",
    trendUp: true,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const recentClaims = [
  {
    id: "CLM-2024-001",
    claimant: "John Doe",
    type: "Auto Insurance",
    amount: "$5,200",
    status: "pending",
    flagged: true,
    date: "2024-01-15",
  },
  {
    id: "CLM-2024-002",
    claimant: "Jane Smith",
    type: "Health Insurance",
    amount: "$12,500",
    status: "review",
    flagged: false,
    date: "2024-01-14",
  },
  {
    id: "CLM-2024-003",
    claimant: "Bob Johnson",
    type: "Property Insurance",
    amount: "$8,900",
    status: "approved",
    flagged: false,
    date: "2024-01-14",
  },
  {
    id: "CLM-2024-004",
    claimant: "Alice Williams",
    type: "Auto Insurance",
    amount: "$3,400",
    status: "pending",
    flagged: true,
    date: "2024-01-13",
  },
  {
    id: "CLM-2024-005",
    claimant: "Charlie Brown",
    type: "Health Insurance",
    amount: "$6,800",
    status: "review",
    flagged: false,
    date: "2024-01-13",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    pending: { variant: "outline", label: "Pending" },
    review: { variant: "secondary", label: "In Review" },
    approved: { variant: "default", label: "Approved" },
    rejected: { variant: "destructive", label: "Rejected" },
  };
  const config = variants[status] || variants.pending;
  return (
    <Badge variant={config.variant} className={status === "approved" ? "bg-success text-success-foreground" : ""}>
      {config.label}
    </Badge>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of claims management system</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp
                    className={`h-3 w-3 ${stat.trendUp ? "text-success" : "text-destructive rotate-180"}`}
                  />
                  <span className={stat.trendUp ? "text-success" : "text-destructive"}>{stat.trend}</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    {claim.flagged && (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{claim.id}</p>
                        {claim.flagged && (
                          <Badge variant="outline" className="text-warning border-warning">
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {claim.claimant} • {claim.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{claim.amount}</p>
                      <p className="text-xs text-muted-foreground">{claim.date}</p>
                    </div>
                    {getStatusBadge(claim.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
