import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Chrome, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";

const adminSignupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must contain at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/[0-9]/, "Password must include a number")
      .regex(/[^A-Za-z0-9]/, "Password must include a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const calculatePasswordStrength = (pass: string) => {
  let score = 0;
  const checks = {
    length: pass.length >= 8,
    uppercase: /[A-Z]/.test(pass),
    lowercase: /[a-z]/.test(pass),
    number: /[0-9]/.test(pass),
    special: /[^A-Za-z0-9]/.test(pass),
  };
  Object.values(checks).forEach((check) => {
    if (check) score += 20;
  });
  return { score, checks };
};

export default function AdminSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signupWithEmail, loginWithGoogle, initializing, user } = useAuth();

  const form = useForm<z.infer<typeof adminSignupSchema>>({
    resolver: zodResolver(adminSignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = form.watch("password");
  const { score, checks } = calculatePasswordStrength(passwordValue);

  const getStrengthText = () => {
    if (score < 40) return "Weak";
    if (score < 60) return "Fair";
    if (score < 80) return "Good";
    return "Strong";
  };

  useEffect(() => {
    if (!initializing && user) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [initializing, navigate, user]);

  const handleSignup = async (values: z.infer<typeof adminSignupSchema>) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const credential = await signupWithEmail(values.email, values.password);
      if (values.fullName.trim()) {
        await updateProfile(credential.user, { displayName: values.fullName.trim() });
      }
      toast({
        title: "Account created",
        description: "Welcome to ClaimGuard Admin!",
      });
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast({
        title: "Unable to sign up",
        description: getFirebaseErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: "Signed in with Google",
        description: "Your admin workspace is ready.",
      });
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast({
        title: "Google sign up failed",
        description: getFirebaseErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Create Admin Account</CardTitle>
            <CardDescription>Provision secure access to the admin portal</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSignup)}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Alex Johnson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@claimguard.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    {passwordValue && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Password strength:</span>
                          <span
                            className={`font-medium ${
                              score < 40
                                ? "text-destructive"
                                : score < 60
                                  ? "text-warning"
                                  : score < 80
                                    ? "text-info"
                                    : "text-success"
                            }`}
                          >
                            {getStrengthText()}
                          </span>
                        </div>
                        <Progress value={score} className="h-2" />
                        <div className="grid grid-cols-2 gap-1 text-xs pt-1">
                          {[
                            { label: "8+ characters", met: checks.length },
                            { label: "Uppercase", met: checks.uppercase },
                            { label: "Lowercase", met: checks.lowercase },
                            { label: "Number", met: checks.number },
                            { label: "Special character", met: checks.special, span: true },
                          ].map(({ label, met, span }) => (
                            <div key={label} className={`flex items-center gap-1 ${span ? "col-span-2" : ""}`}>
                              {met ? (
                                <CheckCircle2 className="h-3 w-3 text-success" />
                              ) : (
                                <XCircle className="h-3 w-3 text-muted-foreground" />
                              )}
                              <span className={met ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="relative py-2 text-center text-xs text-muted-foreground">
                <span className="bg-card px-2">or</span>
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignup} disabled={isGoogleLoading}>
                {isGoogleLoading ? (
                  "Connecting to Google..."
                ) : (
                  <>
                    <Chrome className="mr-2 h-4 w-4" />
                    Continue with Google
                  </>
                )}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/admin/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

const getFirebaseErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error && "code" in error) {
    const { code } = error as { code?: string };
    switch (code) {
      case "auth/email-already-in-use":
        return "An administrator already exists with this email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password must be stronger.";
      case "auth/popup-closed-by-user":
        return "Google sign in was cancelled.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Unable to complete the request. Please try again.";
};

