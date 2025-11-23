import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check localStorage for existing auth
    const authData = localStorage.getItem("claimGuard_auth");
    if (authData) {
      const { user } = JSON.parse(authData);
      setUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, name: string) => {
    const userData = { email, name };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("claimGuard_auth", JSON.stringify({ user: userData }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("claimGuard_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
