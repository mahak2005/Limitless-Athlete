"use client";
import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ProfilePage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [token, router]);

  if (!token) {
    return <p>Redirecting to login...</p>; // Prevents page flickering
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col xl:flex-row gap-6 flex-1">
        {/* Profile content can go here */}
      </div>
      <Footer />
    </div>
  );
}
