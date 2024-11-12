import React from "react";
import { cn } from "@/lib/utils";

export default function ArtMarketTextLogo({
    className,
}: {
    className?: string;
}) {
    return (
        <>
            <h1
                className={cn(
                    "hidden md:block font-light -tracking-widest text-black text-4xl space-y-1",
                    className
                )}
            >
                <span className="font-semibold">UTSAMA</span> ART STUDIO
            </h1>
        </>
    );
}
