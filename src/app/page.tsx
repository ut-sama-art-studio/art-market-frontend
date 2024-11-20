"use client";

import React, { useEffect, useState } from "react";
import { getQueryParam } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import MerchPage from "./merch/page";
import ArtistsPage from "./artists/page";

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
    }, [user, login]);

    return (
        <main>
            <ArtistsPage />
        </main>
    );
};

export default HomePage;
