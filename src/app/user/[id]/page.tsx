"use client";

import { useAuth } from "@/context/auth-context";
import {
    User,
    changeProfilePicture,
    fetchUserById,
    updateUser,
} from "@/services/users/user-service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import ProfileInfo from "@/components/user/profile-info";
import UserProfilePicture from "@/components/user/profile-picture";

const UserPage = () => {
    const { user, updateContextUser } = useAuth();
    const { toast } = useToast();
    const params = useParams();
    const id = params.id;
    const [queryUser, setQueryUser] = useState<User | null>(null);
    const [isSelf, setIsSelf] = useState(false);

    useEffect(() => {
        // if query self
        if (user && user.id == id) {
            setQueryUser(user);
            setIsSelf(true);
        } else if (id) {
            fetchUserById(id as string)
                .then((res) => setQueryUser(res))
                .catch(() => setQueryUser(null));
        }
    }, [id, user]);

    if (!queryUser) {
        return <div>User does not exit</div>;
    }

    const onEditProfileSave = async (newUserInfo: Partial<User>) => {
        const updatedUser = { ...user, ...newUserInfo } as User;
        try {
            await updateUser(updatedUser);
            console.log("updateContextUser");
            updateContextUser(updatedUser);
            return true;
        } catch (err: any) {
            console.error("Failed to save edited profile", err?.message);
            toast({
                variant: "destructive",
                description: "Failed to save edited profile.",
            });
            return false;
        }
    };

    const handleProfilePictureUpload = async (file: File) => {
        try {
            const profilePictureLink = await changeProfilePicture(file);
            console.log("Link", profilePictureLink);
            updateContextUser({
                ...queryUser,
                profilePicture: profilePictureLink,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Failed to upload profile picture.",
            });
        }
    };

    return (
        <div className="flex justify-center md:justify-start">
            <div className="flex flex-col items-center w-80">
                <UserProfilePicture
                    user={queryUser}
                    allowEdit={isSelf}
                    handleProfilePictureUpload={handleProfilePictureUpload}
                ></UserProfilePicture>
                <ProfileInfo
                    user={queryUser}
                    allowEdit={isSelf}
                    onEditProfileSave={onEditProfileSave}
                />
            </div>
        </div>
    );
};

export default UserPage;
