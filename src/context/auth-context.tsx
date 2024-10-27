"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import {
    getAuthToken,
    removeAuthToken,
    setAuthToken,
} from "@/services/auth/auth-service";
import { User, fetchAuthUser } from "@/services/users/user-service";

export interface AuthContextType {
    user: User | undefined; // only available if authenticated
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    updateContextUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback(async (token: string) => {
        await setAuthToken(token);
        fetchAndSetUser();
    }, []);

    const logout = useCallback(() => {
        console.log("Logout");
        setUser(undefined);
        setIsAuthenticated(false);
        removeAuthToken();
    }, []);

    const fetchAndSetUser = useCallback(async () => {
        try {
            const userData = await fetchAuthUser();
            setUser(userData);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Auth context err:", err);
            logout();
        }
    }, [logout]);

    // get the user object from auth token on every page load and refresh
    useEffect(() => {
        // Check if there's an existing token
        const token = getAuthToken();
        if (token) {
            fetchAndSetUser();
        }
    }, []);

    const updateContextUser = useCallback(
        (updatedUser: User) => {
            if (!user || !updatedUser) return;
            setUser(updatedUser);
        },
        [user]
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                updateContextUser,
            }}
        >
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
