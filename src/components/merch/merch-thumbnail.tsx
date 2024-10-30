import Image from "next/image";
import React from "react";
import defaultProfile from "@/../public/images/default-profile-pic.jpg";
import { MerchItem } from "@/services/merch/merch-service";

interface MerchThumbnailProps {
    merch: MerchItem;
}

export default function MerchThumbnail({ merch }: MerchThumbnailProps) {
    return (
        <div className="flex flex-col p-1 md:p-2">
            <div className="aspect-square flex items-center justify-center  bg-gray-100 relative">
                <Image
                    style={{
                        gridRow: "1",
                        gridColumn: "1",
                    }}
                    src={merch.images[0]}
                    alt="Profile Picture"
                    layout="fill"
                    className="h-full w-full"
                    objectFit="cover"
                />
            </div>
            <div className="mt-1 flex w-full overflow-hidden text-gray-700 justify-between">
                <div className="flex items-center">
                    <p
                        style={{ lineHeight: 1 }}
                        className="text-xs md:text-sm font-medium"
                    >
                        {merch.name}
                    </p>
                </div>
                <p
                    style={{ lineHeight: 1 }}
                    className="ml-2 font-medium"
                >
                    ${merch.price}
                </p>
            </div>
            <p
                style={{ lineHeight: 1.25 }}
                className="text-xs md:text-sm font-light italic"
            >
                {merch.type}
                {merch?.height != 0 &&
                    merch?.width != 0 &&
                    `, ${merch.width} x ${merch.height} ${merch.unit}`}
            </p>
        </div>
    );
}
