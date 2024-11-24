"use client";

import { Merch } from "@/services/merch/merch-service";
import { useEffect, useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn, handleNoProfilePicture } from "@/lib/utils";
import { Button } from "../ui/button";
import { GoTrash } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { useAuth } from "@/context/auth-context";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User, fetchSimpleUserById } from "@/services/users/user-service";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface MerchDialogContent {
    merch: Merch;
    handleDeleteMerch: (merch: Merch) => void;
    setIsDialogOpen: (isOpen: boolean) => void;
}
// Displays merch details
export default function MerchDialogContent({
    merch,
    handleDeleteMerch,
    setIsDialogOpen,
}: MerchDialogContent) {
    const { user } = useAuth();
    const [isOwner, setIsOwner] = useState(false);

    const { toast } = useToast();

    const handleEditMerch = () => {
        toast({
            variant: "destructive",
            description: "Sorry, feature coming soon...",
        });
    };

    useEffect(() => {
        setIsOwner(user?.id === merch.ownerId);
    }, [user, merch.ownerId]);

    return (
        <DialogContent className="max-h-screen min-w-fit p-0 overflow-y-auto border-none">
            <div className="flex w-fit">
                <MerchImages merch={merch} />

                <MerchDescription
                    merch={merch}
                    isOwner={isOwner}
                    handleDeleteMerch={handleDeleteMerch}
                    handleEditMerch={handleEditMerch}
                    setIsDialogOpen={setIsDialogOpen}
                />
            </div>
        </DialogContent>
    );
}

function MerchImages({ merch }: { merch: Merch }) {
    const [api, setApi] = useState<CarouselApi>();
    const [currCarouselIdx, setCurrCarouselIdx] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        // init carousel api
        setCount(api.scrollSnapList().length);
        setCurrCarouselIdx(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrCarouselIdx(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="flex flex-col items-center min-w-fit px-4 py-4">
            <Carousel className="w-[40vw]" setApi={setApi}>
                <CarouselContent>
                    {merch.images.map((imgUrl: string, index: number) => {
                        return (
                            <CarouselItem key={index}>
                                <div className="aspect-square relative bg-gray-200">
                                    <Image
                                        src={imgUrl}
                                        fill
                                        alt={`Merch picture ${index + 1}`}
                                        className="object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious
                    className={cn(
                        "translate-x-14  opacity-60 hover:opacity-80 transition-opacity",
                        currCarouselIdx == 0 && "hidden"
                    )}
                />
                <CarouselNext
                    className={cn(
                        "-translate-x-14 opacity-60 hover:opacity-80 transition-opacity",
                        currCarouselIdx == count - 1 && "hidden"
                    )}
                />
            </Carousel>

            <div className="w-full mt-3 flex justify-center gap-2">
                {merch.images.map((imgUrl: string, index: number) => {
                    return (
                        <div
                            className={cn(
                                "w-14 h-14 aspect-square bg-black-200 relative transition-transform cursor-pointer border border-gray-200 bg-gray-200",
                                index == currCarouselIdx && "-translate-y-1"
                            )}
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                        >
                            <Image
                                className="object-cover"
                                sizes="56px 56px"
                                src={imgUrl}
                                fill
                                alt={`Merch picture small ${index + 1}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function MerchDescription({
    merch,
    isOwner,
    handleDeleteMerch,
    handleEditMerch,
    setIsDialogOpen,
}: {
    merch: Merch;
    isOwner: boolean;
    handleDeleteMerch: (merch: Merch) => void;
    handleEditMerch: (merch: Merch) => void;
    setIsDialogOpen: (isOpen: boolean) => void;
}) {
    const [owner, setOwner] = useState<Partial<User>>();

    useEffect(() => {
        fetchSimpleUserById(merch.ownerId).then((user: User) => setOwner(user));
    }, []);

    return (
        <div className="flex flex-col justify-between text-sm w-80 p-4 pt-8 pb-4">
            <div>
                <div className="my-4">
                    <p className="text-2xl font-medium">
                        ${merch.price.toFixed(2)}
                    </p>
                    <p className="italic text-gray-500">
                        {`${merch.type}, ${merch.width} x ${merch.height} ${merch.unit}`}
                    </p>
                </div>

                <DialogHeader>
                    <DialogTitle className="text-base font-normal">
                        {merch.name}
                    </DialogTitle>
                </DialogHeader>
                {owner && (
                    <div className="display flex items-center">
                        by
                        <Link
                            href={`/user/${owner.id}`}
                            className="w-fit block hover:underline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-300 mx-2 mt-1">
                                    <Image
                                        src={handleNoProfilePicture(
                                            owner?.profilePicture
                                        )}
                                        alt="Profile picture"
                                        fill
                                        sizes="12 12"
                                        className="object-cover"
                                    />
                                </div>
                                {owner.name}
                            </div>
                        </Link>
                    </div>
                )}

                <hr className="my-3" />

                <div>
                    <p className="text-gray-500 whitespace-pre-wrap max-h-[28vw] overflow-y-auto">
                        {merch.description || "No description available"}
                    </p>
                </div>
            </div>

            {isOwner && (
                <DialogFooter>
                    <Button variant="default">
                        <GoPencil
                            className="text-lg mr-2"
                            onClick={() => handleEditMerch(merch)}
                        />{" "}
                        Edit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <GoTrash className="text-lg" />
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are You REALLY Sure? 🤔
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will die if gets killed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    It lives another day
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    variant="destructive"
                                    onClick={() => handleDeleteMerch(merch)}
                                >
                                    Do it
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            )}
        </div>
    );
}
