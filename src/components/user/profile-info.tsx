import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/services/users/user-service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    const { toast } = useToast();
    const maxBioLength = 255;

    const handleSave = async () => {
        if (editedBio.length > 255) {
            toast({
                variant: "destructive",
                description: "Bio is too long",
            });
            return;
        } else if (editedName.length > 128) {
            toast({
                variant: "destructive",
                description: "Name is too long",
            });
            return;
        }

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
        <>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-xl mt-2 border border-gray-300 rounded px-2 w-64"
                    />
                    <div className="relative mt-2 w-full">
                        <textarea
                            value={editedBio}
                            placeholder="Introduce yourself here..."
                            onChange={(e) => setEditedBio(e.target.value)}
                            maxLength={maxBioLength}
                            className="text-sm text-opacity-50 border border-gray-300 rounded px-1 w-full h-20"
                            rows={3}
                        />
                        <div className="text-xs text-gray-500 text-right">
                            {editedBio.length}/{maxBioLength}
                        </div>
                    </div>
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
        </>
    );
}
