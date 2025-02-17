

"use client";
import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { ProfileLayout } from "@/components/layout/profile-layout";
// import { ProfileHeader } from "@/components/profile/profile-header";
// import { ProfileContent } from "@/components/profile/profile-content";
// import { ProfileSidebar } from "@/components/profile/profile-sidebar";
// import { ProfileInfo } from "@/components/profile/profile-info";

export default function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token, userId } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

//   useEffect(() => {
//     if (!token) {
//       router.push("/login"); // Redirect to login if not authenticated
//     }
//   }, [token, router]);

//   if (!token) {
//     return <p>Redirecting to login...</p>; // Prevents page flickering
//   }

//   return (
    
//     <div className="min-h-screen">
//       <Navbar />
        
//         <div className="flex flex-col xl:flex-row gap-6 flex-1">
//           <ProfileContent />
          
//         </div>
     
//       <Footer />
      
//     </div>
//   );
}
