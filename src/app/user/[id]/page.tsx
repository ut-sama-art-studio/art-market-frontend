"use client";

import { useAuth } from "@/context/auth-context";
import { User, fetchUserById, updateUser } from "@/services/users/user-service";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProfileInfo from "@/components/user/profile-info";

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
            console.log(id);
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
            updateContextUser(updatedUser);
            setQueryUser(updatedUser);
            return true;
        } catch (err: any) {
            console.error("Failed to save edited profile", err?.message);
            toast({
                variant: "destructive",
                description: "Failed to save changes.",
            });
            return false;
        }
    };

    return (
        <div className="flex justify-center md:justify-start">
            <ProfileInfo
                user={queryUser}
                allowEdit={isSelf}
                onEditProfileSave={onEditProfileSave}
            />
        </div>
    );
};

export default UserPage;
