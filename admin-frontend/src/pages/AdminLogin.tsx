import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual authentication
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to ClaimGuard Admin Portal",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
