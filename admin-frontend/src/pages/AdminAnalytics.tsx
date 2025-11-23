import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Shield, 
  DollarSign,
  Users,
  FileText,
  Target
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const monthlyData = [
  { month: "Jan", claims: 45, approved: 32, rejected: 8 },
  { month: "Feb", claims: 52, approved: 38, rejected: 10 },
  { month: "Mar", claims: 48, approved: 35, rejected: 9 },
  { month: "Apr", claims: 61, approved: 42, rejected: 14 },
  { month: "May", claims: 55, approved: 40, rejected: 11 },
  { month: "Jun", claims: 58, approved: 43, rejected: 12 },
];

const categoryData = [
  { name: "Auto Insurance", value: 145, color: "hsl(var(--chart-1))" },
  { name: "Health Insurance", value: 98, color: "hsl(var(--chart-2))" },
  { name: "Property Insurance", value: 72, color: "hsl(var(--chart-3))" },
  { name: "Life Insurance", value: 34, color: "hsl(var(--chart-4))" },
];

const processingTimeData = [
  { day: "Mon", avgTime: 3.2 },
  { day: "Tue", avgTime: 2.8 },
  { day: "Wed", avgTime: 3.5 },
  { day: "Thu", avgTime: 2.9 },
  { day: "Fri", avgTime: 3.1 },
  { day: "Sat", avgTime: 2.5 },
  { day: "Sun", avgTime: 2.3 },
];

const fraudDetectionData = [
  { month: "Jan", flagged: 12, verified: 8, falsePositive: 4 },
  { month: "Feb", flagged: 15, verified: 11, falsePositive: 4 },
  { month: "Mar", flagged: 10, verified: 7, falsePositive: 3 },
  { month: "Apr", flagged: 18, verified: 14, falsePositive: 4 },
  { month: "May", flagged: 13, verified: 9, falsePositive: 4 },
  { month: "Jun", flagged: 16, verified: 12, falsePositive: 4 },
];

const claimAmountDistribution = [
  { range: "$0-$2k", count: 48 },
  { range: "$2k-$5k", count: 72 },
  { range: "$5k-$10k", count: 95 },
  { range: "$10k-$20k", count: 64 },
  { range: "$20k+", count: 32 },
];

const categoryApprovalData = [
  { category: "Auto", approvalRate: 78, rejectionRate: 15, pendingRate: 7 },
  { category: "Health", approvalRate: 82, rejectionRate: 12, pendingRate: 6 },
  { category: "Property", approvalRate: 71, rejectionRate: 20, pendingRate: 9 },
  { category: "Life", approvalRate: 88, rejectionRate: 8, pendingRate: 4 },
];

const performanceMetrics = [
  { metric: "Accuracy", value: 85, fullMark: 100 },
  { metric: "Speed", value: 78, fullMark: 100 },
  { metric: "Efficiency", value: 92, fullMark: 100 },
  { metric: "Quality", value: 88, fullMark: 100 },
  { metric: "Satisfaction", value: 81, fullMark: 100 },
];

const topClaimants = [
  { name: "John Doe", claims: 5, totalAmount: 24500, status: "active" },
  { name: "Jane Smith", claims: 4, totalAmount: 31200, status: "active" },
  { name: "Bob Johnson", claims: 4, totalAmount: 18900, status: "flagged" },
  { name: "Alice Williams", claims: 3, totalAmount: 15400, status: "active" },
  { name: "Charlie Brown", claims: 3, totalAmount: 12800, status: "active" },
];

export default function AdminAnalytics() {
  const totalClaims = monthlyData.reduce((sum, month) => sum + month.claims, 0);
  const totalApproved = monthlyData.reduce((sum, month) => sum + month.approved, 0);
  const approvalRate = ((totalApproved / totalClaims) * 100).toFixed(1);
  const avgProcessingTime = (
    processingTimeData.reduce((sum, day) => sum + day.avgTime, 0) / processingTimeData.length
  ).toFixed(1);
  
  const totalFraudDetected = fraudDetectionData.reduce((sum, month) => sum + month.verified, 0);
  const totalFlagged = fraudDetectionData.reduce((sum, month) => sum + month.flagged, 0);
  const fraudAccuracy = ((totalFraudDetected / totalFlagged) * 100).toFixed(1);
  
  const totalClaimValue = claimAmountDistribution.reduce((sum, range) => {
    const avgValue = range.range === "$20k+" ? 25000 : 
                     range.range === "$10k-$20k" ? 15000 :
                     range.range === "$5k-$10k" ? 7500 :
                     range.range === "$2k-$5k" ? 3500 : 1000;
    return sum + (range.count * avgValue);
  }, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive claims analytics and insights</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClaims}</div>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalRate}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgProcessingTime} days</div>
              <p className="text-xs text-muted-foreground">Per claim</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claim Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalClaimValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
              <Shield className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFraudDetected}</div>
              <p className="text-xs text-muted-foreground">{fraudAccuracy}% detection accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Claimants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topClaimants.length}</div>
              <p className="text-xs text-muted-foreground">Top frequent users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Claim Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalClaimValue / totalClaims / 1000).toFixed(1)}k</div>
              <p className="text-xs text-muted-foreground">Per claim average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.4</div>
              <p className="text-xs text-muted-foreground">Avg per claim</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Claims Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="claims" fill="hsl(var(--primary))" name="Total Claims" />
                  <Bar dataKey="approved" fill="hsl(var(--success))" name="Approved" />
                  <Bar dataKey="rejected" fill="hsl(var(--destructive))" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Claims by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                AI Fraud Detection Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fraudDetectionData}>
                  <defs>
                    <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="flagged"
                    stroke="hsl(var(--warning))"
                    fillOpacity={1}
                    fill="url(#colorFlagged)"
                    name="Flagged"
                  />
                  <Area
                    type="monotone"
                    dataKey="verified"
                    stroke="hsl(var(--destructive))"
                    fillOpacity={1}
                    fill="url(#colorVerified)"
                    name="Fraud Confirmed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Claim Amount Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={claimAmountDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="range" type="category" className="text-xs" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name="Claims" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approval Rate by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryApprovalData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="category" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="approvalRate" stackId="a" fill="hsl(var(--success))" name="Approved %" />
                  <Bar dataKey="rejectionRate" stackId="a" fill="hsl(var(--destructive))" name="Rejected %" />
                  <Bar dataKey="pendingRate" stackId="a" fill="hsl(var(--warning))" name="Pending %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceMetrics}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" className="text-xs" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Average Processing Time by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Avg Time (days)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Claimants (Frequent Users)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClaimants.map((claimant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{claimant.name}</p>
                          {claimant.status === "flagged" && (
                            <Badge variant="outline" className="text-warning border-warning">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {claimant.claims} claims submitted
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${claimant.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total claimed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
