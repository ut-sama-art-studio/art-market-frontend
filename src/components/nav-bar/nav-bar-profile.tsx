import { User } from "@/services/users/user-service";
import Image from "next/image";
import { useState } from "react";

import { cn, handleNoProfilePicture } from "@/utils/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { ProfileDropdown } from "./profile-dropdown";

interface NavProfileProps {
    user: User;
}

export function NavProfileBtn({ user }: NavProfileProps) {
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
                <ProfileDropdown user={user} handleClick={handleClick} />
            )}
        </div>
    );
}
