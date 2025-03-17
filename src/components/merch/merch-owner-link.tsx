import { User } from "@/services/users/user-service";
import { handleNoProfilePicture } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MerchOwnerLinkProps {
    owner: Partial<User>;
    handleLinkClick?: () => void;
}

export default function MerchOwnerLink({
    owner,
    handleLinkClick,
}: MerchOwnerLinkProps) {
    return (
        <div className="display flex items-center mt-[-8px] md:mt-0">
            by
            <Link
                href={`/user/${owner.id}`}
                className="w-fit block hover:underline"
                onClick={handleLinkClick}
            >
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-300 mx-2 mt-1">
                        <Image
                            src={handleNoProfilePicture(owner?.profilePicture)}
                            alt="Profile picture"
                            fill
                            sizes="12 12"
                            className="object-cover"
                        />
                    </div>
                    {owner.name}
                </div>
            </Link>
        </div>
    );
}
