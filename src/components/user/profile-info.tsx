import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { UserProfilePicture } from "@/components/user/profile-picture";
import { User } from "@/services/user/user-service";

interface ProfileInfoProps {
    user: User;
    allowEdit: boolean;
    onEditProfileSave: (newUserInfo: Partial<User>) => Promise<boolean>;
}

export default function ProfileInfo({
    user,
    allowEdit,
    onEditProfileSave,
}: ProfileInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedBio, setEditedBio] = useState(user.bio ?? "");

    const handleSave = async () => {
        const success = await onEditProfileSave({
            name: editedName,
            bio: editedBio,
        } as Partial<User>);
        if (!success) {
            return;
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(user.name);
        setEditedBio(user.bio ?? "");
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center w-80">
            <UserProfilePicture
                user={user}
                allowEdit={allowEdit}
            ></UserProfilePicture>

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-xl mt-2 border border-gray-300 rounded px-2 w-64"
                    />
                    <textarea
                        value={editedBio}
                        placeholder="Introduce yourself here..."
                        onChange={(e) => setEditedBio(e.target.value)}
                        maxLength={300}
                        className="text-sm text-opacity-50 mt-2 border border-gray-300 rounded px-1 w-full"
                        rows={3}
                    />
                </>
            ) : (
                <>
                    <div className="text-xl mt-2">{user.name}</div>
                    <p className="text-sm text-opacity-50">
                        {user.bio ??
                            "<This artist is too cool to give an introduction>"}
                    </p>
                </>
            )}

            {allowEdit &&
                (isEditing ? (
                    <div className="mt-2">
                        <Button
                            className="rounded-full mr-2"
                            variant="default"
                            size="sm"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            className="rounded-full"
                            variant="secondary"
                            size="sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="rounded-full mt-2"
                        variant="default"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit profile
                    </Button>
                ))}
        </div>
    );
}
