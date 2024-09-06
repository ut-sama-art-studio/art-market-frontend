"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ArtMarketTextLogo from "./text-logo";
import { useAuth } from "@/context/auth-context";

export const NavBar = () => {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const { user } = useAuth();

    return (
        <nav
            className={cn(
                "w-full h-fit z-10 flex justify-between items-center py-2 px-4",
                isLoginPage
                    ? "bg-transparent absolute px-12 py-8 text-white login-drop-in"
                    : "text-black"
            )}
        >
            <div className="flex items-center">
                <Link href="/">
                    <ArtMarketTextLogo
                        className={cn(
                            isLoginPage ? "text-white" : "text-black"
                        )}
                    />
                </Link>
            </div>
            <ul className="flex space-x-12">
                <li>
                    <Link href="/events">Events</Link>
                </li>
                {user ? (
                    <li>
                        <Link href={`/user/${user.id}`}>Account</Link>
                    </li>
                ) : (
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                )}

                <li>
                    <Link href="/about-us">About Us</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
