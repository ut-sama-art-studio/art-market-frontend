import { useAuth } from "@/context/auth-context";
import { User } from "@/services/users/user-service";
import Image from "next/image";
import { useState } from "react";

import { cn, handleNoProfilePicture } from "@/lib/utils";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";

interface NavProfileProps {
    user: User;
}

export function NavProfileBtn({ user }: NavProfileProps) {
    const { logout } = useAuth();
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const debouncedIsHover = useDebounce(isHover, 200); // use debounced to prevent dropdown form immediately closing after user mouse leaves profile icon, since profile icon and dropdown has a gap between, don't want to close dropdown before user hovers to

    const handleClick = () => {
        // want to close drop down immediately and bypass debounce delay
        setIsClick(true);
        setIsHover(false);
    };
    const handleMouseEnter = () => {
        setIsClick(false);
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
        setIsClick(false);
    };

    return (
        <div
            className="flex items-center relative"
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={cn(
                    "rounded-full overflow-hidden border border-gray-300 w-10 h-10 transition-transform duration-300 ease-out cursor-pointer relative",
                    (isHover || debouncedIsHover) && "scale-110"
                )}
            >
                <Image
                    src={handleNoProfilePicture(user?.profilePicture)}
                    fill
                    className="object-cover"
                    alt="Profile Picture"
                />
            </div>

            {!isClick && debouncedIsHover && (
                <div
                    style={{ top: "105%", right: "-10px" }}
                    className="absolute mt-0 w-fit bg-white shadow-md rounded-md text-sm border "
                    onClick={handleClick}
                >
                    <Link href={`/user/${user.id}`}>
                        <div className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex justify-center whitespace-nowrap">
                            View Profile
                        </div>
                    </Link>

                    <div className="border-t my-0"></div>

                    <div
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex justify-center"
                        onClick={logout}
                    >
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
}
