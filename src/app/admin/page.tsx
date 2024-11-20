"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { graphqlQuery } from "@/services/graphql/graphql-service";
import { gql } from "@apollo/client";
import React, { useState } from "react";

import { FaClipboard } from "react-icons/fa";

export default function AdminPage() {
    const [artistToken, setArtistToken] = useState(String);
    const { toast } = useToast();

    const generateArtistToken = async () => {
        try {
            const res = await graphqlQuery(gql`
                query {
                    generateArtistRoleToken
                }
            `);
            setArtistToken(res.generateArtistRoleToken);
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Error generating token:" + err,
            });
            console.error("Error generating token:", err);
        }
    };

    const copyToClipboard = () => {
        if (artistToken) {
            navigator.clipboard
                .writeText(artistToken)
                .then(() => {
                    toast({
                        variant: "default",
                        description: "Token copied to clipboard!",
                    });
                })
                .catch((err) => {
                    toast({
                        variant: "destructive",
                        description: "Failed to copy token: " + err,
                    });
                    console.error("Failed to copy token:", err);
                });
        }
    };

    return (
        <div className="container">
            <h1 className="text-lg">Welcome to the admin dashboard!</h1>

            <div className="mt-2 w-fit border rounded-md p-4">
                <div className="flex items-center">
                    <div className="mr-4">
                        <h2 className="text-md text-blue-400">
                            Generate artist verification token
                        </h2>
                        <p className="text-sm text-gray-600 italic">
                            valid for 7 days, can be used by multiple people
                        </p>
                    </div>

                    <Button onClick={generateArtistToken}>Generate</Button>
                </div>

                {artistToken && (
                    <div className="flex items-center mt-2 gap-2">
                        <p className="text-xs text-gray-400 w-[360px] break-words">
                            {artistToken}
                        </p>
                        <Button
                            variant="secondary"
                            onClick={copyToClipboard}
                            className="flex items-center text-blue-400"
                        >
                            <FaClipboard />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
