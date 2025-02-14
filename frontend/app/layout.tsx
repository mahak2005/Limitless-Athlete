import { AuthProvider } from "@/components/auth/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { SignupModal } from "@/components/auth/signup-modal";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <LoginModal />
          <SignupModal />
        </AuthProvider>
      </body>
    </html>
  );
}
