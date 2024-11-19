import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

interface DashboardProviderProps {
  children: React.ReactNode;
  userRole: string;
}

interface ProviderValues {
  sidebarOpen?: boolean;
  openSidebar?: () => void;
  closeSidebar?: () => void;
  userRole: string; // Include userRole in context
}

const Context = React.createContext<ProviderValues>({ userRole: "" });

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(""); // Initialize userRole state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only on the client side
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const role = userData?.role || "";
      setUserRole(role);
    }
  }, []);
  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      router.events.on("routeChangeStart", () => setSidebarOpen(false));
    }

    return () => {
      if (sidebarOpen) {
        router.events.off("routeChangeStart", () => setSidebarOpen(false));
      }
    };
  }, [sidebarOpen, router]);

  return (
    <Context.Provider
      value={{ sidebarOpen, openSidebar, closeSidebar, userRole }}
    >
      {children}
    </Context.Provider>
  );
}

export function useDashboardContext() {
  return React.useContext(Context);
}
