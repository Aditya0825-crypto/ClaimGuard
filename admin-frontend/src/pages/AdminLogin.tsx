import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Eye, EyeOff, CheckCircle2, XCircle, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginWithEmail, loginWithGoogle, initializing, user } = useAuth();

  useEffect(() => {
    if (!initializing && user) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [initializing, navigate, user]);

  // Password strength calculator
  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    const checks = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass),
    };

    if (checks.length) strength += 20;
    if (checks.uppercase) strength += 20;
    if (checks.lowercase) strength += 20;
    if (checks.number) strength += 20;
    if (checks.special) strength += 20;

    return { strength, checks };
  };

  const { strength, checks } = calculatePasswordStrength(password);
  
  const getStrengthColor = () => {
    if (strength < 40) return "bg-destructive";
    if (strength < 60) return "bg-warning";
    if (strength < 80) return "bg-info";
    return "bg-success";
  };

  const getStrengthText = () => {
    if (strength < 40) return "Weak";
    if (strength < 60) return "Fair";
    if (strength < 80) return "Good";
    return "Strong";
  };

  const getFirebaseErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error && "code" in error) {
      const { code } = error as { code?: string };
      switch (code) {
        case "auth/invalid-credential":
        case "auth/invalid-email":
          return "Email or password is incorrect.";
        case "auth/user-disabled":
          return "This account has been disabled.";
        case "auth/user-not-found":
          return "No user found with this email.";
        case "auth/wrong-password":
          return "Email or password is incorrect.";
        case "auth/popup-closed-by-user":
          return "Google sign in was cancelled.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
    return "Unable to complete the request. Please try again.";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
      toast({
        title: "Login successful",
        description: "Welcome to ClaimGuard Admin Portal",
      });
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: getFirebaseErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: "Signed in with Google",
        description: "Welcome back!",
      });
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast({
        title: "Google sign in failed",
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
            <CardTitle className="text-2xl font-bold">ClaimGuard Admin</CardTitle>
            <CardDescription>Sign in to access the admin portal</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@claimguard.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {password && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password Strength:</span>
                    <span className={`font-medium ${
                      strength < 40 ? "text-destructive" :
                      strength < 60 ? "text-warning" :
                      strength < 80 ? "text-info" :
                      "text-success"
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <Progress value={strength} className="h-2" indicatorClassName={getStrengthColor()} />
                  
                  <div className="grid grid-cols-2 gap-1 text-xs pt-1">
                    <div className="flex items-center gap-1">
                      {checks.length ? 
                        <CheckCircle2 className="h-3 w-3 text-success" /> : 
                        <XCircle className="h-3 w-3 text-muted-foreground" />
                      }
                      <span className={checks.length ? "text-foreground" : "text-muted-foreground"}>
                        8+ characters
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {checks.uppercase ? 
                        <CheckCircle2 className="h-3 w-3 text-success" /> : 
                        <XCircle className="h-3 w-3 text-muted-foreground" />
                      }
                      <span className={checks.uppercase ? "text-foreground" : "text-muted-foreground"}>
                        Uppercase
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {checks.lowercase ? 
                        <CheckCircle2 className="h-3 w-3 text-success" /> : 
                        <XCircle className="h-3 w-3 text-muted-foreground" />
                      }
                      <span className={checks.lowercase ? "text-foreground" : "text-muted-foreground"}>
                        Lowercase
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {checks.number ? 
                        <CheckCircle2 className="h-3 w-3 text-success" /> : 
                        <XCircle className="h-3 w-3 text-muted-foreground" />
                      }
                      <span className={checks.number ? "text-foreground" : "text-muted-foreground"}>
                        Number
                      </span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      {checks.special ? 
                        <CheckCircle2 className="h-3 w-3 text-success" /> : 
                        <XCircle className="h-3 w-3 text-muted-foreground" />
                      }
                      <span className={checks.special ? "text-foreground" : "text-muted-foreground"}>
                        Special character (!@#$%...)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="relative py-2 text-center text-xs text-muted-foreground">
              <span className="bg-card px-2">or</span>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
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
              Need an account?{" "}
              <Link to="/admin/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
