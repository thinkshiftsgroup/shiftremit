"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

interface UserPayload {
  id: string;
  email: string;
  username: string;
  userType: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserPayload | null;
  userRole: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeBase64Url = (base64: string): string => {
  let paddedBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  while (paddedBase64.length % 4) {
    paddedBase64 += "=";
  }
  return atob(paddedBase64);
};

const decodeToken = (token: string): UserPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const decodedPayload = decodeBase64Url(parts[1]);
    const payload = JSON.parse(decodedPayload);

    if (payload.id && payload.email && payload.username && payload.userType) {
      return {
        id: payload.id,
        email: payload.email,
        username: payload.username,
        userType: payload.userType,
      };
    }
    return null;
  } catch (e) {
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/partners",
    "send-money",
    "request-money",
    "/profile",
    "/settings",
    "/transactions",
    "track-transfer",
    "all-logs",
  ];
  const loginRoute = "/login";

  const isAuthenticated = !!user;
  const userRole = user ? user.userType : null;

  useEffect(() => {
    const token = Cookies.get("shiftremit_auth_token");

    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        setUser(userData);
      } else {
        Cookies.remove("shiftremit_auth_token");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      if (!isAuthenticated) {
        router.replace(`${loginRoute}?redirect=${pathname}`);
        return;
      }

      if (pathname.startsWith("/admin") && userRole !== "admin") {
        router.replace(`${loginRoute}?redirect=${pathname}`);
        return;
      }
      if (pathname.startsWith("/partners") && userRole !== "partner") {
        router.replace(`${loginRoute}?redirect=${pathname}`);
        return;
      }
    }

    if (isAuthenticated && pathname === loginRoute) {
      router.replace("/dashboard");
      return;
    }
  }, [isAuthenticated, userRole, isLoading, pathname, router]);

  const contextValue: AuthContextType = {
    isAuthenticated: isAuthenticated,
    user: user,
    userRole: userRole,
    isLoading: isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
