"use client";

import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Merch, queryMerchPage } from "@/services/merch/merch-service";
import { useSearchParams, useRouter } from "next/navigation";
import CustomPagination from "@/components/ui/customPagination";
import MerchDialog from "@/components/merch/merch-dialog";

export default function MerchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MerchPageContent />
        </Suspense>
    );
}

function MerchPageContent() {
    const [merchs, setMerchs] = useState<Merch[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const { toast } = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Read the current page from the query
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const getMerchPage = useCallback(
        async (page: number) => {
            try {
                const merch = await queryMerchPage({ page }); // Pass the page parameter to the query
                setMerchs(merch.items);
                setTotalPages(merch.totalPages || 1);
            } catch (err) {
                toast({
                    variant: "destructive",
                    description: "Error finding merch: " + err,
                });
                console.error("Error finding merch:", err);
            }
        },
        [toast]
    );

    useEffect(() => {
        getMerchPage(currentPage); // Fetch merch when the page changes
    }, [currentPage, getMerchPage]);

    const handlePageChange = (newPage: number) => {
        // Update the URL with the new page
        router.push(`/merch?page=${newPage}`);
    };

    return (
        <div className="md:container mx-auto px-2">
            <input placeholder="Search..." />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {merchs.map((merch: Merch, idx: number) => (
                    <MerchDialog key={merch.id} merch={merch} />
                ))}
            </div>
            {totalPages > 1 && (
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>
    );
}
