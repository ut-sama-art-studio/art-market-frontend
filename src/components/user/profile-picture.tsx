import React, { useRef, useState } from "react";
import Image from "next/image";
import defaultProfile from "@/../public/images/default-profile-pic.jpg";
import { RiImageAddLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

import { User } from "@/services/user/user-service";
import { uploadImage } from "@/services/image/image-service";
import { useToast } from "@/hooks/use-toast";

interface UserProfilePictureProps {
    user: User;
    allowEdit?: boolean;
}
export function UserProfilePicture({
    user,
    allowEdit,
}: UserProfilePictureProps) {
    const [isMouseOverProfilePicture, setIsMouseOverProfilePicture] =
        useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger click on the hidden input
        }
    };

    const handleSelectFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const url = await uploadImage(file);
                console.log(url);
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: "Failed to upload profile picture.",
                });
            }
        }
    };

    return (
        <div
            className="overflow-hidden rounded-full w-40 h-40 border border-gray-300 grid"
            onMouseOver={() => setIsMouseOverProfilePicture(true)}
            onMouseOut={() => setIsMouseOverProfilePicture(false)}
            onClick={handleDivClick}
        >
            <Image
                style={{ gridRow: "1", gridColumn: "1" }}
                src={
                    user?.profilePicture ? user.profilePicture : defaultProfile
                }
                alt="profile picture"
            />

            {allowEdit && (
                <div
                    style={{ gridRow: "1", gridColumn: "1" }}
                    className={cn(
                        "w-full h-full flex flex-col justify-center items-center bg-gray-500 bg-opacity-70 opacity-0 cursor-pointer transition-opacity",
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
                        <div className="text-m text-white text-center">
                            Change Picture
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
