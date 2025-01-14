import React, { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreateMerchForm, {
    CreateMerchFormData,
} from "../merch/create-merch-form";
import {
    Merch,
    createMerch,
    deleteMerch,
    fetchUserMerchItems,
} from "@/services/merch/merch-service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/utils";
import MerchDialog from "../merch/merch-dialog";
import { error } from "console";

interface MerchGridProps {
    userId: string;
    isSelf: boolean;
}
export default function MerchGrid({ userId, isSelf }: MerchGridProps) {
    const [merchList, setMerchList] = useState<Merch[]>([]);
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchMerchItems = useCallback(async () => {
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
    }, [userId, toast]);

    useEffect(() => {
        fetchMerchItems();
    }, [fetchMerchItems]);

    const handleAddMerch = async (formData: CreateMerchFormData) => {
        setIsFormOpen(false);
        try {
            const newMerch = await createMerch(formData);
            console.log(newMerch);
            setMerchList((prevMerchList) => [newMerch, ...prevMerchList]);
        } catch (err) {
            console.error("Error creating merch:", err);
            toast({
                variant: "destructive",
                description: "Failed to create merch.",
            });
        }
    };

    const handleDeleteMerch = async (merch: Merch) => {
        try {
            const success = await deleteMerch(merch.id);
            if (success) {
                setMerchList((prevMerchList) =>
                    prevMerchList.filter((m: Merch) => m.id !== merch.id)
                );
            } else {
                throw new Error("unknown error occured");
            }
        } catch (err) {
            console.error("Error deleting merch:", err);
            toast({
                variant: "destructive",
                description: "Failed to delete merch.",
            });
        }
    };

    return (
        <div className="w-full h-full ml-0 md:ml-4 grid grid-cols-3 2xl:grid-cols-4 max-w-[840px]">
            {isSelf && (
                <div
                    className={cn(
                        "flex justify-center items-center flex-col",
                        merchList.length == 0 &&
                            "w-full h-full col-span-3 md:mt-8"
                    )}
                >
                    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                        <DialogTrigger>
                            <div
                                className={cn(
                                    "flex flex-col items-center",
                                    merchList.length == 0 &&
                                        "animate-pulse text-sm mt-4 md:mt-"
                                )}
                            >
                                <div className="flex flex-col w-fit h-fit p-2 items-center justify-center text-black rounded-lg border border-gray-900 border-dashed cursor-pointer hover:bg-gray-200 transition-bg duration-200 ease-out text-sm">
                                    <div className="text-xl flex justify-center">
                                        <GoPlus />
                                    </div>
                                </div>
                                {merchList.length == 0 && (
                                    <div className="mt-2">
                                        Add your first merch!
                                    </div>
                                )}
                            </div>
                        </DialogTrigger>

                        <DialogContent className="max-h-screen p-4 overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add a New Merch Item</DialogTitle>
                            </DialogHeader>
                            <CreateMerchForm handleAddMerch={handleAddMerch} />
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {merchList.map((merch: Merch, idx: number) => (
                <MerchDialog
                    key={idx}
                    merch={merch}
                    handleDeleteMerch={handleDeleteMerch}
                />
            ))}
        </div>
    );
}
