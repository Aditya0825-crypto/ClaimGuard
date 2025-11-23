import { AdminLayout } from "@/components/AdminLayout";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Clock,
  User,
  DollarSign,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockClaimDetails = {
  id: "CLM-2024-001",
  claimant: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    policyNumber: "POL-2023-5678",
  },
  type: "Auto Insurance",
  amount: 5200,
  status: "pending",
  submittedDate: "2024-01-15",
  reason: "Vehicle accident on highway causing front-end damage",
  description:
    "I was driving on Highway 101 when another vehicle suddenly changed lanes and collided with the front of my car. The impact caused significant damage to the bumper, hood, and headlights.",
  documents: [
    { name: "accident_report.pdf", type: "pdf", uploaded: "2024-01-15" },
    { name: "police_report.pdf", type: "pdf", uploaded: "2024-01-15" },
    { name: "vehicle_damage_1.jpg", type: "image", uploaded: "2024-01-15" },
    { name: "vehicle_damage_2.jpg", type: "image", uploaded: "2024-01-15" },
  ],
  aiFlags: [
    {
      type: "warning",
      title: "Potential Duplicate Image",
      description: "Image 'vehicle_damage_2.jpg' shows high similarity (92%) with another claim from 2023",
    },
    {
      type: "info",
      title: "OCR Text Mismatch",
      description: "Police report date doesn't match the claimed incident date",
    },
    {
      type: "success",
      title: "Policy Validated",
      description: "Active policy with sufficient coverage for claimed amount",
    },
  ],
  policyValidation: {
    policyStatus: "Active",
    coverageLimit: 50000,
    deductible: 500,
    expiryDate: "2025-12-31",
    claimedAmount: 5200,
    eligible: true,
  },
};

export default function AdminClaimDetail() {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  const handleApprove = () => {
    toast({
      title: "Claim Approved",
      description: `Claim ${claimId} has been approved successfully.`,
    });
    navigate("/admin/claims");
  };

  const handleReject = () => {
    toast({
      title: "Claim Rejected",
      description: `Claim ${claimId} has been rejected.`,
      variant: "destructive",
    });
    navigate("/admin/claims");
  };

  const handleRequestDocuments = () => {
    toast({
      title: "Documents Requested",
      description: "User has been notified to upload additional documents.",
    });
  };

  const getFlagIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "info":
        return <Clock className="h-5 w-5 text-info" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/claims")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{mockClaimDetails.id}</h1>
              <p className="text-muted-foreground">Claim verification and review</p>
            </div>
          </div>
          <Badge variant="outline" className="text-warning border-warning">
            AI Flagged
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Claim Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Claim Type</p>
                    <p className="font-medium">{mockClaimDetails.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Claimed Amount</p>
                    <p className="text-2xl font-bold">${mockClaimDetails.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted Date</p>
                    <p className="font-medium">{mockClaimDetails.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline">Pending Review</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Incident Description</p>
                  <p className="text-sm">{mockClaimDetails.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  AI Fraud Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockClaimDetails.aiFlags.map((flag, index) => (
                  <div key={index} className="flex gap-3 rounded-lg border p-3">
                    {getFlagIcon(flag.type)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{flag.title}</p>
                      <p className="text-xs text-muted-foreground">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Uploaded Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockClaimDetails.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {doc.type === "pdf" ? (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded {doc.uploaded}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Claimant Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{mockClaimDetails.claimant.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{mockClaimDetails.claimant.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{mockClaimDetails.claimant.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{mockClaimDetails.claimant.policyNumber}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Policy Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Policy Status</span>
                  <Badge className="bg-success text-success-foreground">
                    {mockClaimDetails.policyValidation.policyStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Coverage Limit</span>
                  <span className="font-medium">
                    ${mockClaimDetails.policyValidation.coverageLimit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Deductible</span>
                  <span className="font-medium">${mockClaimDetails.policyValidation.deductible}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expiry Date</span>
                  <span className="font-medium">{mockClaimDetails.policyValidation.expiryDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Eligibility</span>
                  {mockClaimDetails.policyValidation.eligible ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Add notes about this claim..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
                <Button variant="outline" className="w-full">
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleApprove} className="w-full bg-success hover:bg-success/90">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve Claim
                </Button>
                <Button onClick={handleReject} variant="destructive" className="w-full">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Claim
                </Button>
                <Button onClick={handleRequestDocuments} variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Request Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
