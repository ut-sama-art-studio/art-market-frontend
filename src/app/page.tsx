"use client";

import React, { useEffect, useState } from "react";
import { getQueryParam } from "@/lib/utils";
import { getAuthToken, setAuthToken } from "@/services/auth/auth-service";
import { gql } from "graphql-request";
import { graphqlRequest } from "@/services/graphql/graphql-service";

const HomePage: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        // Check if there is a token in the URL and save it
        const token = getQueryParam("token");
        if (token) {
            setAuthToken(token);
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        }

        const authToken = getAuthToken();
        if (authToken) {
            graphqlRequest(gql`
                query Me {
                    me {
                        id
                        name
                        email
                    }
                }
            `).then((user) => {
                if (user) {
                    setUserName(user.me.name);
                }
            });
        }
    }, []);

    return (
        <main>
            <div>
                {userName ? (
                    <h1>Welcome, {userName}!</h1>
                ) : (
                    <h1>Not logged in!</h1>
                )}
            </div>
        </main>
    );
};

export default HomePage;
