'use client'
import { createContext, useContext } from "react";

export type UserInfo = {
    id: string,
    displayName: string,
    pfp: string,
    givenName: string,
    surName: string,
    birthday: string,
    email: string,
    gender: string,
    countryCode: number | undefined,
    phoneNumber: number | undefined,
    nationality: number | undefined,
    occupation: number | undefined,
    placeOfWork: string,
}

type AuthContextType = {
    userInfo: UserInfo | null;
    token: string | null;
};

const AuthContext = createContext<AuthContextType>({
    userInfo: null,
    token: null
});

export function AuthProvider({
    children,
    initialAuth,
}: {
    children: React.ReactNode;
    initialAuth: AuthContextType;
}) {
    return (
        <AuthContext.Provider value={initialAuth}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);