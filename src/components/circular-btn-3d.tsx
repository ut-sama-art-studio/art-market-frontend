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
        <div>
            <button
                className={cn(
                    "outline-white rounded-full py-2 px-4 flex items-center justify-center z-1",
                    `bg-${color} text-${textColor}`
                )}
                onClick={onClick}
            >
                {Icon && (
                    <span className="flex items-center justify-center">
                        <Icon className={cn(``)} />
                    </span>
                )}
                <span className="ml-2">{text}</span>
            </button>
            <div
                className={cn(
                    "w-100 rounded-full outline-white absolute mt-3",
                    `bg-${color}/50`
                )}
            ></div>
        </div>
    );
}
