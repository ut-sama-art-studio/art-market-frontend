"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ArtMarketTextLogo from "./text-logo";

export const NavBar = () => {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    return (
        <nav
            className={cn(
                "w-full h-fit z-10 flex justify-between items-center py-2 px-4",
                isLoginPage
                    ? "bg-transparent absolute px-12 py-8 text-white"
                    : "bg-secondary text-black"
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
                    <Link href="/discover">Discover</Link>
                </li>
                <li>
                    <Link href="/events">Events</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
