import React, { RefObject, useRef, useState } from "react";
import Image from "next/image";
import { RiImageAddLine } from "react-icons/ri";
import { cn, handleNoProfilePicture } from "@/utils/utils";

import { User } from "@/services/users/user-service";

interface UserProfilePictureProps {
    user: User;
    allowEdit: boolean;
    isEditingInfo: boolean;
    handleProfilePictureUpload: (file: File) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    handleChangePictureClick: () => void;
}
export default function UserProfilePicture({
    user,
    allowEdit,
    isEditingInfo,
    handleProfilePictureUpload,
    fileInputRef,
    handleChangePictureClick,
}: UserProfilePictureProps) {
    const [isMouseOverProfilePicture, setIsMouseOverProfilePicture] =
        useState(false);

    const handleSelectFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            handleProfilePictureUpload(file);
        }
    };

    return (
        <div
            className={cn(
                "overflow-hidden rounded-full w-24 h-24 min-w-24 md:w-40 md:h-40 md:min-w-40 border border-gray-300 relative grid",
                isEditingInfo && "min-w-0"
            )}
            onMouseOver={() => setIsMouseOverProfilePicture(true)}
            onMouseOut={() => setIsMouseOverProfilePicture(false)}
            onClick={handleChangePictureClick}
        >
            <Image
                style={{
                    gridRow: "1",
                    gridColumn: "1",
                }}
                src={handleNoProfilePicture(user?.profilePicture)}
                alt="Profile Picture"
                fill
                priority
                className={cn(
                    "object-cover",
                    isMouseOverProfilePicture &&
                        "animate-[spin_6s_linear_infinite]"
                )}
            />
            {allowEdit && (
                <div
                    style={{ gridRow: "1", gridColumn: "1" }}
                    className={cn(
                        "w-full h-full flex flex-col justify-center items-center bg-gray-500 bg-opacity-70 opacity-0 cursor-pointer transition-opacity z-10",
                        allowEdit && isMouseOverProfilePicture && "opacity-100"
                    )}
                >
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleSelectFile}
                        className="hidden"
                    />
                    <div>
                        <div className="text-lg text-white flex justify-center">
                            <RiImageAddLine />
                        </div>
                        <div className="text-sm text-white text-center">
                            Change Picture
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
