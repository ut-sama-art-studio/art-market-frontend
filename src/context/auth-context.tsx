"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getAuthToken,
    removeAuthToken,
    setAuthToken,
} from "@/services/auth/auth-service";
import { User, fetchAuthUser } from "@/services/user/user-service";
import { graphqlUseToken } from "@/services/graphql/graphql-service";

export interface AuthContextType {
    user: User;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if there's an existing token
        const token = getAuthToken();
        if (token) {
            fetchAndSetUser();
        }
    }, []);

    const fetchAndSetUser = async () => {
        try {
            const userData = await fetchAuthUser();
            setUser(userData);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Auth context err:", err);
            logout();
        }
    };

    const login = async (token: string) => {
        await setAuthToken(token);
        graphqlUseToken(token);
        fetchAndSetUser();
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        removeAuthToken();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
