import { useAuth } from "@/utils/context/auth-context";
import { User } from "@/services/users/user-service";
import Link from "next/link";

import { IoLogOutOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";

export function ProfileDropdown({
    user,
    handleClick,
}: {
    user: User;
    handleClick: () => void;
}) {
    const { logout } = useAuth();

    return (
        <div
            style={{ top: "105%", right: "-10px" }}
            className="absolute mt-0 w-fit bg-white shadow-md rounded-md text-sm border "
            onClick={handleClick}
        >
            <Link href={`/user/${user.id}`}>
                <div className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-1 whitespace-nowrap">
                    <BsFillPersonFill className="text-lg" />
                    View Profile
                </div>
            </Link>

            <div className="border-t my-0"></div>

            <div
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-1"
                onClick={logout}
            >
                <IoLogOutOutline className="text-lg" />
                Logout
            </div>
        </div>
    );
}
