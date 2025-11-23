import { Button } from "@/components/ui/button";
import { Shield, Home, FileText, Clock, Bell, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-none">claimGuard</span>
              <span className="text-xs text-muted-foreground">Insurance Claims</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/dashboard">
              <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} className="gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/file-claim">
              <Button variant={isActive("/file-claim") ? "secondary" : "ghost"} className="gap-2">
                <FileText className="h-4 w-4" />
                File Claim
              </Button>
            </Link>
            <Link to="/track-claims">
              <Button variant={isActive("/track-claims") ? "secondary" : "ghost"} className="gap-2">
                <Clock className="h-4 w-4" />
                Track Claims
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant={isActive("/notifications") ? "secondary" : "ghost"} className="gap-2 relative">
                <Bell className="h-4 w-4" />
                Notifications
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full animate-pulse"></span>
              </Button>
            </Link>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user?.name || "User"}</span>
                    <span className="text-xs text-muted-foreground font-normal">{user?.email || ""}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{user?.name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{user?.email || ""}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant={isActive("/dashboard") ? "secondary" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleNavClick("/dashboard")}
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Button>
                  
                  <Button
                    variant={isActive("/file-claim") ? "secondary" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleNavClick("/file-claim")}
                  >
                    <FileText className="h-4 w-4" />
                    File Claim
                  </Button>
                  
                  <Button
                    variant={isActive("/track-claims") ? "secondary" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleNavClick("/track-claims")}
                  >
                    <Clock className="h-4 w-4" />
                    Track Claims
                  </Button>
                  
                  <Button
                    variant={isActive("/notifications") ? "secondary" : "ghost"}
                    className="justify-start gap-2 relative"
                    onClick={() => handleNavClick("/notifications")}
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                    <span className="absolute left-6 top-2 h-2 w-2 bg-destructive rounded-full"></span>
                  </Button>

                  <div className="border-t border-border pt-4 mt-4">
                    <Button
                      variant={isActive("/profile") ? "secondary" : "ghost"}
                      className="justify-start gap-2 w-full"
                      onClick={() => handleNavClick("/profile")}
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 w-full text-destructive hover:text-destructive mt-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
