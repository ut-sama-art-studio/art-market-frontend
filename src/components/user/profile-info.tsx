import React, { Ref, RefObject, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/services/users/user-service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { FaDiscord } from "react-icons/fa";

interface ProfileInfoProps {
    user: User;
    allowEdit: boolean;
    onEditProfileSave: (newUserInfo: Partial<User>) => Promise<boolean>;
    isEditingInfo: boolean;
    setIsEditingInfo: (value: boolean) => void;
    handleChangePictureClick: () => void;
}

export default function ProfileInfo({
    user,
    allowEdit,
    onEditProfileSave,
    isEditingInfo,
    setIsEditingInfo,
    handleChangePictureClick,
}: ProfileInfoProps) {
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
        setIsEditingInfo(false);
    };

    const handleCancel = () => {
        setEditedName(user.name);
        setEditedBio(user.bio ?? "");
        setIsEditingInfo(false);
    };

    return (
        <>
            {isEditingInfo ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-lg mt-2 border border-gray-300 rounded px-2 w-full md:w-64"
                    />
                    <div className="relative mt-2 w-full md:w-64">
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
                <div className="flex flex-col items-start md:items-center w-full md:w-64">
                    <div className="text-lg mt-2 font-medium">{user.name}</div>
                    <div className="flex text-sm">
                        <div className="flex items-center text-indigo-500">
                            <FaDiscord className="text-lg mr-1" />
                            {user.username}
                        </div>
                    </div>
                    <p
                        className={cn(
                            "text-sm whitespace-pre-wrap",
                            !user.bio && "opacity-40 text-center"
                        )}
                    >
                        {!user.bio || user.bio == ""
                            ? "This artist is too cool to give an introduction"
                            : user.bio}
                    </p>
                </div>
            )}

            {allowEdit &&
                (isEditingInfo ? (
                    <div className="mt-1 flex justify-end">
                        <Button
                            className="rounded-lg"
                            variant="default"
                            size="sm"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            className="rounded-lg ml-2"
                            variant="secondary"
                            size="sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end md:justify-center">
                        <Button
                            className="rounded-lg mt-2"
                            variant="default"
                            size="sm"
                            onClick={() => setIsEditingInfo(true)}
                        >
                            Edit profile
                        </Button>
                        <Button
                            className="rounded-lg mt-2 ml-2 relative md:hidden"
                            variant="default"
                            size="sm"
                            onClick={handleChangePictureClick}
                        >
                            Change picture
                        </Button>
                    </div>
                ))}
        </>
    );
}
