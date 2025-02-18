"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import MerchPageLoadingText from "@/components/merch-page/merch-page-loading-text";
import MerchDialog from "@/components/merch/merch-dialog";
import CustomPagination from "@/components/ui/customPagination";
import {
    defaultQueryMerchPageArgs,
    Merch,
    queryMerchPage,
    QueryMerchPageArgs,
} from "@/services/merch/merch-service";

export default function MerchGrid() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryArgs = useSelector((state: RootState) => state.merchQuery);

    const handlePageChange = (page: number) => {
        // Query with new url when search and pagination for browser history
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`${pathname}/?${params.toString()}`);
    };

    // Fetch merch data using React Query
    const { data, isError, isLoading } = useQuery({
        queryKey: ["getAllMerch", queryArgs],
        queryFn: async () => queryMerchPage(queryArgs),
    });

    const merchs = data?.items || [];
    const totalPages = data?.totalPages || 1;
    const isNoMerch = merchs.length === 0;

    if (isLoading) {
        // return <MerchPageLoadingText text={"Loading..."} />;
        return <></>;
    }
    if (isError) {
        return <MerchPageLoadingText text={"Error loading merch :("} />;
    }

    return (
        <div>
            {" "}
            {isNoMerch && <MerchPageLoadingText text={"No merch found :("} />}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {merchs.map((merch: Merch) => (
                    <MerchDialog key={merch.id} merch={merch} />
                ))}
            </div>
            {totalPages > 1 && (
                <CustomPagination
                    currentPage={queryArgs.page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>
    );
}
