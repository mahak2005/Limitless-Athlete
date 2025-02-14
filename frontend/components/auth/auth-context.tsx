"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  modalType: string | null;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  const login = (userToken: string) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <AuthContext.Provider value={{ token, login, logout, modalType, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
