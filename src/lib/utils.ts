import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getQueryParam(name: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
