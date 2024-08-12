"use client";

import React from "react";
import { cn } from "@/lib/utils";

type CircularBtn3DProps = {
    onClick: () => void;
    Icon?: React.ComponentType<any>;
    text: string;
    color: string;
    textColor: string;
};

export default function CircularBtn3D({
    onClick,
    Icon,
    text,
    color,
    textColor,
}: CircularBtn3DProps) {
    return (
        <div className="text-xl relative pb-2">
            <div
                className="absolute inset-0 w-fit h-fit selection:transform border border-white rounded-full flex outline-white mt-2 py-4 px-12 z-0"
                style={{
                    backgroundColor: `${color}80`, // Adds transparency to the color
                }}
                onClick={onClick}
            >
                {Icon && (
                    <span className="flex items-center justify-center text-3xl mr-5">
                        <Icon />
                    </span>
                )}
                <span className="ml-2 whitespace-nowrap">{text}</span>
            </div>
            <button
                className="relative border border-white rounded-full flex items-center justify-center py-4 px-12 z-10"
                onClick={onClick}
                style={{
                    backgroundColor: color,
                    color: textColor,
                }}
            >
                {Icon && (
                    <span className="flex items-center justify-center text-3xl mr-5">
                        <Icon />
                    </span>
                )}
                <span className="ml-2 whitespace-nowrap">{text}</span>
            </button>
        </div>
    );
}
