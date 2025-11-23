import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Validation Schema
const claimSchema = z.object({
  claimType: z.string().min(1, "Please select a claim type"),
  incidentDate: z.string()
    .min(1, "Incident date is required")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today;
    }, "Incident date cannot be in the future"),
  incidentTime: z.string().min(1, "Incident time is required"),
  amount: z.string()
    .min(1, "Claim amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Amount must be a positive number")
    .refine((val) => Number(val) <= 1000000, "Amount cannot exceed $1,000,000"),
  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  policyNumber: z.string()
    .min(5, "Policy number must be at least 5 characters")
    .max(20, "Policy number cannot exceed 20 characters")
    .regex(/^[A-Z0-9-]+$/, "Policy number can only contain uppercase letters, numbers, and hyphens"),
  contactPhone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format"),
  contactEmail: z.string().email("Invalid email address"),
  incidentLocation: z.string().min(5, "Incident location must be at least 5 characters"),
  policeReportNumber: z.string().optional(),
  witnessName: z.string().optional(),
  witnessPhone: z.string()
    .regex(/^[\d\s\-\+\(\)]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
});

type ClaimFormData = z.infer<typeof claimSchema>;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg", 
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const FileClaim = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<ClaimFormData>({
    claimType: "",
    incidentDate: "",
    incidentTime: "",
    amount: "",
    description: "",
    policyNumber: "",
    contactPhone: "",
    contactEmail: "",
    incidentLocation: "",
    policeReportNumber: "",
    witnessName: "",
    witnessPhone: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ClaimFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File size exceeds 10MB`;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return `${file.name}: Invalid file type. Only JPG, PNG, PDF, and DOC files are allowed`;
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      const errors: string[] = [];

      newFiles.forEach(file => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      if (files.length + validFiles.length > 10) {
        errors.push("Maximum 10 files allowed");
      } else {
        setFiles([...files, ...validFiles]);
      }

      setFileErrors(errors);
      if (errors.length > 0) {
        toast({
          title: "File upload errors",
          description: errors[0],
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const validFiles: File[] = [];
      const errors: string[] = [];

      newFiles.forEach(file => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      if (files.length + validFiles.length > 10) {
        errors.push("Maximum 10 files allowed");
      } else {
        setFiles([...files, ...validFiles]);
      }

      setFileErrors(errors);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFileErrors([]);
  };

  const handleChange = (field: keyof ClaimFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    try {
      claimSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ClaimFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ClaimFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No Documents",
        description: "Please upload at least one supporting document.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Claim submitted successfully!",
        description: "Your claim is being processed. You'll receive updates soon.",
      });
      navigate("/track-claims");
      setIsSubmitting(false);
    }, 2000);
  };

  const getErrorMessage = (field: keyof ClaimFormData) => {
    return errors[field];
  };

  const hasError = (field: keyof ClaimFormData) => {
    return !!errors[field];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">File New Insurance Claim</h1>
            <p className="text-muted-foreground">
              Complete the form below to submit your insurance claim. All fields marked with * are required.
            </p>
          </div>

          {/* Info Alert */}
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              <strong>Important:</strong> Please ensure all information is accurate and complete. You can upload up to 10 supporting documents (max 10MB each). Fields marked with * are required.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit}>
            {/* Claim Details Card */}
            <Card className="border-border shadow-soft mb-6">
              <CardHeader>
                <CardTitle>Claim Information</CardTitle>
                <CardDescription>Provide details about your insurance claim</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Claim Type */}
                  <div className="space-y-2">
                    <Label htmlFor="claimType" className="flex items-center gap-1">
                      Claim Type <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.claimType} 
                      onValueChange={(value) => handleChange("claimType", value)}
                    >
                      <SelectTrigger className={hasError("claimType") ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select claim type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle">Vehicle Accident</SelectItem>
                        <SelectItem value="medical">Medical Bills</SelectItem>
                        <SelectItem value="property">Property Damage</SelectItem>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="fire">Fire Damage</SelectItem>
                        <SelectItem value="natural-disaster">Natural Disaster</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {hasError("claimType") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("claimType")}
                      </p>
                    )}
                  </div>

                  {/* Policy Number */}
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber" className="flex items-center gap-1">
                      Policy Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="policyNumber"
                      type="text"
                      placeholder="e.g., POL-2024-12345"
                      value={formData.policyNumber}
                      onChange={(e) => handleChange("policyNumber", e.target.value.toUpperCase())}
                      className={hasError("policyNumber") ? "border-destructive" : ""}
                    />
                    {hasError("policyNumber") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("policyNumber")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Incident Date */}
                  <div className="space-y-2">
                    <Label htmlFor="incidentDate" className="flex items-center gap-1">
                      Incident Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => handleChange("incidentDate", e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className={hasError("incidentDate") ? "border-destructive" : ""}
                    />
                    {hasError("incidentDate") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("incidentDate")}
                      </p>
                    )}
                  </div>

                  {/* Incident Time */}
                  <div className="space-y-2">
                    <Label htmlFor="incidentTime" className="flex items-center gap-1">
                      Incident Time <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="incidentTime"
                      type="time"
                      value={formData.incidentTime}
                      onChange={(e) => handleChange("incidentTime", e.target.value)}
                      className={hasError("incidentTime") ? "border-destructive" : ""}
                    />
                    {hasError("incidentTime") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("incidentTime")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Claim Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center gap-1">
                      Claim Amount ($) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="1000000"
                      value={formData.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      className={hasError("amount") ? "border-destructive" : ""}
                    />
                    {hasError("amount") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("amount")}
                      </p>
                    )}
                  </div>

                  {/* Police Report Number */}
                  <div className="space-y-2">
                    <Label htmlFor="policeReportNumber">
                      Police Report Number (Optional)
                    </Label>
                    <Input
                      id="policeReportNumber"
                      type="text"
                      placeholder="e.g., PR-2024-5678"
                      value={formData.policeReportNumber}
                      onChange={(e) => handleChange("policeReportNumber", e.target.value)}
                    />
                  </div>
                </div>

                {/* Incident Location */}
                <div className="space-y-2">
                  <Label htmlFor="incidentLocation" className="flex items-center gap-1">
                    Incident Location <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="incidentLocation"
                    type="text"
                    placeholder="Full address or detailed location"
                    value={formData.incidentLocation}
                    onChange={(e) => handleChange("incidentLocation", e.target.value)}
                    className={hasError("incidentLocation") ? "border-destructive" : ""}
                  />
                  {hasError("incidentLocation") && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getErrorMessage("incidentLocation")}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-1">
                    Incident Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the incident, including what happened, how it occurred, and any other relevant details (minimum 20 characters)..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={hasError("description") ? "border-destructive" : ""}
                    maxLength={1000}
                  />
                  <div className="flex items-center justify-between">
                    {hasError("description") ? (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("description")}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {formData.description.length}/1000 characters
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="border-border shadow-soft mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How can we reach you regarding this claim?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Contact Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-1">
                      Contact Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactPhone}
                      onChange={(e) => handleChange("contactPhone", e.target.value)}
                      className={hasError("contactPhone") ? "border-destructive" : ""}
                    />
                    {hasError("contactPhone") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("contactPhone")}
                      </p>
                    )}
                  </div>

                  {/* Contact Email */}
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="flex items-center gap-1">
                      Contact Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      className={hasError("contactEmail") ? "border-destructive" : ""}
                    />
                    {hasError("contactEmail") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("contactEmail")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Witness Information Card */}
            <Card className="border-border shadow-soft mb-6">
              <CardHeader>
                <CardTitle>Witness Information (Optional)</CardTitle>
                <CardDescription>If there were any witnesses, please provide their details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Witness Name */}
                  <div className="space-y-2">
                    <Label htmlFor="witnessName">Witness Name</Label>
                    <Input
                      id="witnessName"
                      type="text"
                      placeholder="Full name of witness"
                      value={formData.witnessName}
                      onChange={(e) => handleChange("witnessName", e.target.value)}
                    />
                  </div>

                  {/* Witness Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="witnessPhone">Witness Phone</Label>
                    <Input
                      id="witnessPhone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.witnessPhone}
                      onChange={(e) => handleChange("witnessPhone", e.target.value)}
                      className={hasError("witnessPhone") ? "border-destructive" : ""}
                    />
                    {hasError("witnessPhone") && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {getErrorMessage("witnessPhone")}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Upload Card */}
            <Card className="border-border shadow-soft mb-6">
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>
                  Upload bills, photos, reports, or other relevant documents (Required)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    isDragging 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  } cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-foreground font-medium mb-2">
                      {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      JPG, PNG, PDF, DOC (max. 10MB each)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Maximum 10 files • At least 1 file required
                    </p>
                  </label>
                </div>

                {fileErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1">
                        {fileErrors.map((error, index) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {files.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Uploaded Files ({files.length}/10)</Label>
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Claim...
                  </>
                ) : (
                  "Submit Claim"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileClaim;
