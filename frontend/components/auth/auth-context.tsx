"use client"

import { createContext, useContext, useState } from "react"

type AuthModalType = "login" | "signup" | null

interface AuthContextType {
  modalType: AuthModalType
  openModal: (type: AuthModalType) => void
  closeModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModalType] = useState<AuthModalType>(null)

  const openModal = (type: AuthModalType) => setModalType(type)
  const closeModal = () => setModalType(null)

  return <AuthContext.Provider value={{ modalType, openModal, closeModal }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

