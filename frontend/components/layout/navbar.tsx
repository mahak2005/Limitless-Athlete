"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"
import Image from 'next/image';
const navItems = [
  { name: "Home", path: "/" },
  { name: "Match With Athletes", path: "/match-with-athletes" },
  { name: "Events", path: "/events" },
  { name: "Plans", path: "/plans" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { openModal } = useAuth()

  return (
    <motion.nav
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="h-24 w-24 relative"
            >
              <Image
                src="/Limitless.png"
                alt="Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </motion.div>
            <span className="text-xl font-semibold">LimitlessAthlete</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${pathname === item.path ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => openModal("login")}>
                Log In
              </Button>
              <Button size="sm" onClick={() => openModal("signup")}>
                Sign Up
              </Button>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`text-sm font-medium transition-colors ${pathname === item.path ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      openModal("login")
                      setIsOpen(false)
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      openModal("signup")
                      setIsOpen(false)
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

