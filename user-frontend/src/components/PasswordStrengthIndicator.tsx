import { useMemo } from "react";
import { CheckCircle2, XCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    let label = "";
    let color = "";

    if (score <= 2) {
      label = "Weak";
      color = "text-destructive";
    } else if (score <= 3) {
      label = "Fair";
      color = "text-warning";
    } else if (score === 4) {
      label = "Good";
      color = "text-primary";
    } else {
      label = "Strong";
      color = "text-success";
    }

    return { score, label, color, checks };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                level <= strength.score
                  ? strength.score <= 2
                    ? "bg-destructive"
                    : strength.score <= 3
                    ? "bg-warning"
                    : strength.score === 4
                    ? "bg-primary"
                    : "bg-success"
                  : "bg-muted"
              )}
            />
          ))}
        </div>
        <span className={cn("text-xs font-medium", strength.color)}>
          {strength.label}
        </span>
      </div>

      <div className="space-y-1">
        <PasswordRequirement
          met={strength.checks?.length || false}
          text="At least 8 characters"
        />
        <PasswordRequirement
          met={strength.checks?.uppercase || false}
          text="One uppercase letter"
        />
        <PasswordRequirement
          met={strength.checks?.lowercase || false}
          text="One lowercase letter"
        />
        <PasswordRequirement
          met={strength.checks?.number || false}
          text="One number"
        />
        <PasswordRequirement
          met={strength.checks?.special || false}
          text="One special character"
        />
      </div>
    </div>
  );
};

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => {
  const Icon = met ? CheckCircle2 : Circle;
  
  return (
    <div className="flex items-center gap-2 text-xs">
      <Icon className={cn("h-3 w-3", met ? "text-success" : "text-muted-foreground")} />
      <span className={cn(met ? "text-success" : "text-muted-foreground")}>
        {text}
      </span>
    </div>
  );
};

export default PasswordStrengthIndicator;
