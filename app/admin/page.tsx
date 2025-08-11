"use client";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/use-auth";

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
