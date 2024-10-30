import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import MerchThumbnail from "@/components/merch/merch-thumbnail";
import { useAuth } from "@/context/auth-context";
import CreateMerchForm, {
    CreateMerchFormData,
} from "../merch/create-merch-form";
import {
    MerchItem,
    createMerch,
    fetchUserMerchItems,
} from "@/services/merch/merch-service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface MerchGridProps {
    userId: string;
    isSelf: boolean;
}
export default function MerchGrid({ userId, isSelf }: MerchGridProps) {
    const [merchList, setMerchList] = useState<MerchItem[]>([]);
    const { toast } = useToast();

    const fetchMerchItems = async () => {
        try {
            const merchList = await fetchUserMerchItems(userId);
            setMerchList(merchList);
        } catch (err) {
            console.error("Error fetching merch items:", err);
            toast({
                variant: "destructive",
                description: "Failed to get merch item.",
            });
        }
    };
    useEffect(() => {
        fetchMerchItems();
    }, []);

    const handleAddMerch = async (formData: CreateMerchFormData) => {
        console.log(formData);
        try {
            const newMerch = await createMerch(formData);
            setMerchList((prevMerchList) => [newMerch, ...prevMerchList]);
        } catch (err) {
            console.error("Error creating merch item:", err);
            toast({
                variant: "destructive",
                description: "Failed to create merch item.",
            });
        }
    };

    return (
        <div className="w-full h-full ml-0 md:ml-4 grid grid-cols-3 2xl:grid-cols-4">
            {isSelf && (
                <AddMerchBtn
                    handleAddMerch={handleAddMerch}
                    isEmpty={merchList.length == 0}
                />
            )}
            {merchList.map((merch: MerchItem) => (
                <MerchThumbnail merch={merch} />
            ))}
        </div>
    );
}

function AddMerchBtn({
    handleAddMerch,
    isEmpty,
}: {
    handleAddMerch: (formData: CreateMerchFormData) => void;
    isEmpty: boolean;
}) {
    return (
        <div
            className={cn(
                "flex justify-center items-center flex-col",
                isEmpty && "w-full h-full col-span-3 md:mt-8"
            )}
        >
            <Dialog>
                <DialogTrigger>
                    <div
                        className={cn(
                            "flex flex-col items-center",
                            isEmpty && "animate-pulse text-sm mt-4 md:mt-"
                        )}
                    >
                        <div className="flex flex-col w-fit h-fit p-2 items-center justify-center text-black rounded-lg border border-gray-900 border-dashed cursor-pointer hover:bg-gray-200 transition-bg duration-200 ease-out text-sm">
                            <div className="text-xl flex justify-center">
                                <GoPlus />
                            </div>
                        </div>
                        {isEmpty && (
                            <div className="mt-2">Add your first merch!</div>
                        )}
                    </div>
                </DialogTrigger>

                <DialogContent className="max-h-screen p-4 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add a new merch item</DialogTitle>
                    </DialogHeader>
                    <CreateMerchForm handleAddMerch={handleAddMerch} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
