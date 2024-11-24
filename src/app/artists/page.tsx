"use client";

import { useAuth } from "@/context/auth-context";
import { handleNoProfilePicture } from "@/lib/utils";
import { graphqlQuery } from "@/services/graphql/graphql-service";
import { Role } from "@/services/users/user-service";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Artist {
    id: string;
    name: string;
    profilePicture?: string;
    bio: string;
    role: Role;
}

export default function ArtistsPage() {
    const { user } = useAuth(); // Assuming useUser hook is available

    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch artists data
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await graphqlQuery(gql`
                    query artists {
                        artists {
                            id
                            name
                            profilePicture
                            bio
                            role
                        }
                    }
                `);

                const rolePriority: Record<string, number> = {
                    director: 1,
                    admin: 2,
                    artist: 3,
                };

                const sortedArtists = [...res.artists].sort(
                    (a: Artist, b: Artist) => {
                        return rolePriority[a.role] - rolePriority[b.role];
                    }
                );

                setArtists(sortedArtists);
            } catch (err) {
                console.error("Error fetching artists:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1 className="text-3xl font-semibold">Studio Artists</h1>
            <h2 className="text-2xl font-semibold text-blue-400">2024-2025</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {artists.map((artist, index) => (
                    <Link key={index} href={`/user/${artist.id}`}>
                        <div className="flex flex-col items-center py-3 h-fit hover:shadow-[0_2px_10px_0px_rgba(0,0,0,0.2)] transition-shadow hover:cursor-pointer">
                            <div className="w-36 h-36 relative">
                                <Image
                                    src={handleNoProfilePicture(
                                        artist.profilePicture
                                    )}
                                    fill
                                    sizes="144px 144px"
                                    className="object-cover"
                                    alt={`${artist.name}'s profile picture`}
                                />
                            </div>

                            <div className="w-fit flex flex-col items-center">
                                <h2 className="text-lg font-semibold leading-5 mt-1 px-2 line-clamp-2">
                                    {artist.name}
                                </h2>
                                {artist.role == "director" && (
                                    <p className="text-blue-400 font-semibold italic leading-4">
                                        Art Director
                                    </p>
                                )}
                                {artist.role == "admin" && (
                                    <p className="text-blue-400 font-semibold italic leading-4">
                                        Admin
                                    </p>
                                )}
                                {artist.bio && (
                                    <div className="flex justify-center">
                                        <p className="text-gray-600 text-sm leading-4 line-clamp-2 max-w-36 w-full">
                                            {artist.bio}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
