import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-none">claimGuard</span>
              <span className="text-xs text-muted-foreground">Insurance Claims</span>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-base">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="text-base">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
