"use client";

import React, { useEffect} from "react";
import { getQueryParam } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import MerchPage from "@/app/merch/page";

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
            <MerchPage />
        </main>
    );
};

export default HomePage;
