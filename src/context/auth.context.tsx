'use client'
import { createContext, useContext, ReactNode } from "react";
import useAuth from "@/hooks/useAuth";

// 1. Infer the return type of useAuth
type AuthContextType = ReturnType<typeof useAuth>;

// 2. Initialize context with correct type (nullable at first)
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Type children properly
type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Helper hook to use context safely
export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
    return ctx;
};
