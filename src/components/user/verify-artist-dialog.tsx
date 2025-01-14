"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    graphqlMutate,
    graphqlQuery,
} from "@/services/graphql/graphql-service";
import { gql } from "@apollo/client";
import { useAuth } from "@/utils/context/auth-context";
import { User } from "@/services/users/user-service";

export default function VerifyArtistDialog() {
    const [token, setToken] = useState("");
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const { user, updateContextUser } = useAuth();

    const applyArtistRole = async () => {
        if (!token) {
            toast({
                variant: "destructive",
                description: "Token is required!",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await graphqlMutate(
                gql`
                    mutation ApplyArtistRoleToken($token: String!) {
                        applyArtistRoleToken(token: $token) {
                            id
                            role
                        }
                    }
                `,
                { token }
            );

            if (res?.applyArtistRoleToken) {
                if (user) {
                    updateContextUser({
                        ...(user as User),
                        role: res.applyArtistRoleToken.role,
                    });
                }

                setDialogOpen(false);
                setToken("");
                toast({
                    description: `Welcome ${user?.name}! You can upload your merch now.`,
                });
            } else {
                throw new Error("Invalid response");
            }
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Error verifying token: " + err,
            });
            console.error("Error verifying token:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="w-fit">
                    Verify Artist Membership
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Verify Artist Membership</DialogTitle>
                </DialogHeader>
                <div className="">
                    <h2 className="">Do not have a token?</h2>
                    <p className="text-sm text-gray-500">
                        Please consult an art director for how to get the token.
                    </p>
                </div>
                <div className="flex flex-col">
                    <Input
                        type="text"
                        placeholder="Enter verification token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>{" "}
                <DialogFooter>
                    <Button onClick={applyArtistRole} disabled={loading}>
                        {loading ? "Verifying..." : "Verify"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
