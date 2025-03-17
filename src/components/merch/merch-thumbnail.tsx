import Image from "next/image";
import React, { useState } from "react";
import defaultProfile from "@/../public/images/default-profile-pic.jpg";
import { Merch } from "@/services/merch/merch-service";
import { cn } from "@/utils/utils";
import MerchOwnerLink from "./merch-owner-link";

interface MerchThumbnailProps {
    merch: Merch;
}

export default function MerchThumbnail({ merch }: MerchThumbnailProps) {
    return (
        <div className="flex flex-col p-1 md:p-2 group">
            <div
                className={cn(
                    "aspect-square flex items-center justify-center  bg-gray-100 relative",
                    "group-hover:shadow-none group-hover:md:shadow-[0_2px_10px_0px_rgba(0,0,0,0.2)] transition-shadow  overflow-hidden"
                )}
            >
                <Image
                    style={{
                        gridRow: "1",
                        gridColumn: "1",
                    }}
                    src={merch.images[0]}
                    alt="Profile Picture"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="mt-1 w-full overflow-hidden text-gray-700">
                <div className="flex flex-col relative">
                    <p
                        style={{ lineHeight: 1.25 }}
                        className={cn(
                            "text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap",
                            "group-hover:text-blue-400"
                        )}
                    >
                        {merch.name}
                    </p>
                    <div className="flex items-center justify-between">
                        <p
                            style={{ lineHeight: 1.25 }}
                            className="text-xs md:text-sm text-gray-400 italic"
                        >
                            {`${merch.type}, ${merch.width} x ${merch.height} ${merch.unit}`}
                        </p>
                        <p className="ml-2 text-sm md:text-base font-medium">
                            ${merch.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
