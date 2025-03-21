import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MerchThumbnail from "./merch-thumbnail";
import { Merch } from "@/services/merch/merch-service";
import MerchDialogContent from "./merch-dialog-content";

interface MerchDialogProps {
    merch: Merch;
    handleDeleteMerch?: (merch: Merch) => void;
    handleEditMerch?: (merch: Merch) => void;
}

export default function MerchDialog({
    merch,
    handleDeleteMerch,
    handleEditMerch,
}: MerchDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    let handleDeleteAndClose;
    if (handleDeleteMerch) {
        handleDeleteAndClose = (merch: Merch) => {
            handleDeleteMerch(merch);
            setIsDialogOpen(false);
        };
    }

    let handleEditAndClose;
    if (handleEditMerch) {
        handleEditAndClose = (merch: Merch) => {
            handleEditMerch(merch);
            setIsDialogOpen(false);
        };
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild className="cursor-pointer">
                <div onClick={() => setIsDialogOpen(true)}>
                    <MerchThumbnail merch={merch} />
                </div>
            </DialogTrigger>
            <MerchDialogContent
                merch={merch}
                handleDeleteMerch={handleDeleteAndClose}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Dialog>
    );
}
