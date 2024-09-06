"use client";

import ProfileInfo from "@/components/profile-info";
import { useAuth } from "@/context/auth-context";
import { User, fetchUserById } from "@/services/user/user-service";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
    const { user } = useAuth();
    const params = useParams();
    const id = params.id;
    const [queryUser, setQueryUser] = useState<User | null>(null);
    const [isSelf, setIsSelf] = useState(false);

    useEffect(() => {
        // console.log(user);
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
    }, [id]);

    if (!queryUser) {
        return <div>User doesn't exit</div>;
    }

    return (
        <div>
            <ProfileInfo user={queryUser}/>
        </div>
    );
};

export default UserPage;
