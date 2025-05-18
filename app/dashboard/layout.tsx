"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // First effect to mark client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auth check effect that only runs on the client side
  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, isClient]);

  // Add a listener to update user data when it changes in localStorage
  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue) {
        setUser(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isClient]);

  const handleLogout = () => {
    if (isClient) {
      localStorage.removeItem("user");
      router.push("/sign-in");
    }
  };

  // During SSR, return a loading state without any conditional logic
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
        <p className="text-lg dark:text-white">Loading...</p>
      </div>
    );
  }

  // For client side rendering
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
        <p className="text-lg dark:text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-6 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
