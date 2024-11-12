import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import defaultProfile from "@/../public/images/default-profile-pic.jpg";
import { StaticImageData } from "next/image";

// Used for conditional texts (eg. for classNames)
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getQueryParam(name: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Returns default profile picture src if no profile picture is set
export function handleNoProfilePicture(
    profilePictureSrc: string | undefined
): string | StaticImageData {
    return profilePictureSrc || defaultProfile;
}
