"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ArtMarketTextLogo from "@/components/ui/text-logo";
import { useAuth } from "@/context/auth-context";
import { NavProfileBtn } from "@/components/nav-bar/nav-bar-profile";

export const NavBar = () => {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const { user } = useAuth();

    return (
        <nav
            className={cn(
                "w-full h-fit z-10 flex justify-between items-center py-4 px-8",
                isLoginPage
                    ? "bg-transparent absolute px-12 py-8 text-white login-drop-in"
                    : "bg-white text-black"
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
            <ul className="flex space-x-12 items-center">
                <li>
                    <Link href="/events">Events</Link>
                </li>
                <li>
                    <Link href="/about-us">About Us</Link>
                </li>
                {user ? (
                    <li>
                        <NavProfileBtn user={user} />
                    </li>
                ) : (
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
