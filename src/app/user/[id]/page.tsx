"use client";

import { useAuth } from "@/context/auth-context";
import {
    User,
    changeProfilePicture,
    fetchUserById,
    updateUser,
} from "@/services/users/user-service";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import ProfileInfo from "@/components/user/profile-info";
import UserProfilePicture from "@/components/user/profile-picture";
import MerchGrid from "@/components/user/merch-grid";
import VerifyArtistDialog from "@/components/user/verify-artist-dialog";

const UserPage = () => {
    const { user, updateContextUser } = useAuth();
    const { toast } = useToast();
    const params = useParams();
    const id = params.id;
    const [queryUser, setQueryUser] = useState<User | null>(null);
    const [isSelf, setIsSelf] = useState(false);
    const [isSelfArtist, setSelfArtist] = useState(false);

    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // if query self
        if (user && user.id == id) {
            setIsSelf(true);
            // check if user is artist
            if (
                user.role === "artist" ||
                user.role === "director" ||
                user.role === "admin"
            ) {
                setSelfArtist(true);
            }

            setQueryUser(user);
        } else if (id) {
            setIsSelf(false);
            fetchUserById(id as string)
                .then((res: User) => setQueryUser(res))
                .catch(() => setQueryUser(null));
        }
        console.log(user);
    }, [id, user]);

    if (!queryUser) {
        return <div>User does not exist</div>;
    }

    const onEditProfileSave = async (newUserInfo: Partial<User>) => {
        const updatedUser = { ...user, ...newUserInfo } as User;
        try {
            await updateUser(updatedUser);
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

    const handleChangePictureClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger click on the hidden input
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
        <div className="flex flex-col md:flex-row justify-center md:justify-start mx-0 lg:mx-32 xl:mx-48 2xl:mx-64 md:px-8">
            <div className="flex flex-row md:flex-col md:items-center w-full md:w-64 h-fit">
                <UserProfilePicture
                    user={queryUser}
                    allowEdit={isSelf}
                    isEditingInfo={isEditingInfo}
                    handleProfilePictureUpload={handleProfilePictureUpload}
                    fileInputRef={fileInputRef}
                    handleChangePictureClick={handleChangePictureClick}
                />
                <div className="flex flex-col ml-4 md:ml-0 w-fit">
                    <ProfileInfo
                        user={queryUser}
                        allowEdit={isSelf}
                        onEditProfileSave={onEditProfileSave}
                        isEditingInfo={isEditingInfo}
                        setIsEditingInfo={setIsEditingInfo}
                        handleChangePictureClick={handleChangePictureClick}
                    />
                </div>
            </div>

            <hr className="h-1px my-2 bg-gray-200" />

            {isSelf ? (
                isSelfArtist ? (
                    <MerchGrid userId={queryUser.id} isSelf={isSelf} />
                ) : (
                    <div className="flex flex-col w-full justify-center items-center">
                        <div className=" text-center mt-4">
                            Are you an artist, want to upload merch?
                        </div>
                        <VerifyArtistDialog />
                    </div>
                )
            ) : (
                <MerchGrid userId={queryUser.id} isSelf={isSelf} />
            )}
        </div>
    );
};

export default UserPage;
