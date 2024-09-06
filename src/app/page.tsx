"use client";

import React, { useEffect, useState } from "react";
import { getQueryParam } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

const HomePage: React.FC = () => {
    const { user, login } = useAuth();

    useEffect(() => {
        // check if there is a token in the URL and save it
        const token = getQueryParam("token");
        if (token) {
            // remove token from url
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
            login(token);
        }
    }, [user]);

    return (
        <main>
            <div>
                {user ? (
                    <h1>Welcome, {user.name}!</h1>
                ) : (
                    <h1>Not logged in!</h1>
                )}
            </div>
        </main>
    );
};

export default HomePage;
