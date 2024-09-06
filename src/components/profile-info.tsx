import { User } from "@/services/user/user-service";
import Image from "next/image";
import React from "react";

import defaultProfile from "@/../public/images/default-profile-pic.jpg";

export default function ProfileInfo({ user }: { user: User }) {
    return (
        <div className="flex-col justify-center align-middle">
            <div className="overflow-hidden rounded-full w-72 h-72">
                <Image
                    src={
                        user?.profilePicture
                            ? user.profilePicture
                            : defaultProfile
                    }
                    alt="profile picture"
                    objectFit="cover"
                ></Image>
            </div>
            <div className="text-2xl">{user.name}</div>
            <p>{user.bio?? "This artist is too cool to give an introduction"}</p>
        </div>
    );
}
