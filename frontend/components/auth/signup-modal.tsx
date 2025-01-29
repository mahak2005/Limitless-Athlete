"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "./auth-context"
import Image from "next/image"
import { useRouter } from "next/navigation"

const userTypes = [
  { id: "athlete", label: "ATHLETE", icon: "/placeholder.svg?height=60&width=60" },
  { id: "agent", label: "AGENT", icon: "/placeholder.svg?height=60&width=60" },
  { id: "artist", label: "ARTIST", icon: "/placeholder.svg?height=60&width=60" },
  { id: "team", label: "TEAM", icon: "/placeholder.svg?height=60&width=60" },
  { id: "other", label: "OTHER", icon: "/placeholder.svg?height=60&width=60" },
]

export function SignupModal() {
  const { modalType, closeModal, openModal } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"brand" | "athlete">("athlete")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, directly navigate to profile
    closeModal()
    router.push("/profile")
  }

  return (
    <Dialog open={modalType === "signup"} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <button
            onClick={() => closeModal()}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <form onSubmit={handleSignup} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign Up for Free</h1>
              <p className="text-sm text-muted-foreground">Be a part of the largest sports marketplace</p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm text-gray-500">
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm text-gray-500">
                  PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input id="password" placeholder="Password" type={showPassword ? "text" : "password"} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setUserType("brand")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      userType === "brand" ? "bg-blue-50 text-blue-600" : "text-gray-500"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={userType === "brand"}
                      onChange={() => setUserType("brand")}
                      className="hidden"
                    />
                    I am a Brand
                  </button>
                  <button
                    onClick={() => setUserType("athlete")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      userType === "athlete" ? "bg-blue-50 text-blue-600" : "text-gray-500"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={userType === "athlete"}
                      onChange={() => setUserType("athlete")}
                      className="hidden"
                    />
                    I am an athlete or...
                  </button>
                </div>
                {userType === "athlete" && (
                  <div className="grid grid-cols-5 gap-4">
                    {userTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedRole(type.id)}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${
                            selectedRole === type.id ? "border-blue-600" : "border-transparent"
                          }`}
                        >
                          <Image src={type.icon || "/placeholder.svg"} alt={type.label} fill className="object-cover" />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{type.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedRole === "other" && (
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm text-gray-500">
                    I AM A <span className="text-red-500">*</span>
                  </label>
                  <Input id="role" placeholder="Other Role" />
                </div>
              )}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                SIGN UP
              </Button>
              <div className="text-center text-sm">
                Already a member?{" "}
                <button onClick={() => openModal("login")} className="text-blue-600 hover:underline">
                  Login
                </button>
              </div>
              <p className="text-center text-xs text-gray-500">
                By signing up you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

