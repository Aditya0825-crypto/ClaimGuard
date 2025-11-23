import { AdminLayout } from "@/components/AdminLayout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Eye, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockClaims = [
  {
    id: "CLM-2024-001",
    claimant: "John Doe",
    email: "john@example.com",
    type: "Auto Insurance",
    amount: 5200,
    status: "pending",
    flagged: true,
    submittedDate: "2024-01-15",
    reason: "Vehicle accident on highway",
  },
  {
    id: "CLM-2024-002",
    claimant: "Jane Smith",
    email: "jane@example.com",
    type: "Health Insurance",
    amount: 12500,
    status: "review",
    flagged: false,
    submittedDate: "2024-01-14",
    reason: "Surgery procedure",
  },
  {
    id: "CLM-2024-003",
    claimant: "Bob Johnson",
    email: "bob@example.com",
    type: "Property Insurance",
    amount: 8900,
    status: "approved",
    flagged: false,
    submittedDate: "2024-01-14",
    reason: "Water damage to basement",
  },
  {
    id: "CLM-2024-004",
    claimant: "Alice Williams",
    email: "alice@example.com",
    type: "Auto Insurance",
    amount: 3400,
    status: "pending",
    flagged: true,
    submittedDate: "2024-01-13",
    reason: "Parking lot collision",
  },
  {
    id: "CLM-2024-005",
    claimant: "Charlie Brown",
    email: "charlie@example.com",
    type: "Health Insurance",
    amount: 6800,
    status: "review",
    flagged: false,
    submittedDate: "2024-01-13",
    reason: "Medical examination",
  },
  {
    id: "CLM-2024-006",
    claimant: "Diana Prince",
    email: "diana@example.com",
    type: "Property Insurance",
    amount: 15000,
    status: "rejected",
    flagged: false,
    submittedDate: "2024-01-12",
    reason: "Fire damage",
  },
];

export default function AdminClaims() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();

  const filteredClaims = mockClaims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesType = typeFilter === "all" || claim.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      pending: { variant: "outline", label: "Pending" },
      review: { variant: "secondary", label: "In Review" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
    };
    const { variant, label } = config[status] || config.pending;
    return (
      <Badge variant={variant} className={status === "approved" ? "bg-success text-success-foreground" : ""}>
        {label}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">All Claims</h1>
          <p className="text-muted-foreground">Manage and review all insurance claims</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Claims List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by claim ID or claimant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Auto Insurance">Auto Insurance</SelectItem>
                    <SelectItem value="Health Insurance">Health Insurance</SelectItem>
                    <SelectItem value="Property Insurance">Property Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {claim.flagged && <AlertTriangle className="h-4 w-4 text-warning" />}
                          {claim.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{claim.claimant}</div>
                          <div className="text-xs text-muted-foreground">{claim.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell className="font-semibold">${claim.amount.toLocaleString()}</TableCell>
                      <TableCell>{claim.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(claim.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/claims/${claim.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
