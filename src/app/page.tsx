"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/utils/context/auth-context";
import MerchPage from "@/app/merch/page";

const HomePage: React.FC = () => {
    const { user, login } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        // check if there is a token in the URL and save it
        const token = searchParams.get("token");
        if (token) {
            // remove token from url
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
            login(token);
        }
    }, [login]);

    return (
        <main>
            <MerchPage />
        </main>
    );
};

export default HomePage;
