"use client";

import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Query, useQuery } from "@tanstack/react-query";

import {
    Merch,
    QueryMerchPageArgs,
    defaultQueryMerchPageArgs,
    queryMerchPage,
} from "@/services/merch/merch-service";
import { useSearchParams, useRouter } from "next/navigation";
import CustomPagination from "@/components/ui/customPagination";
import MerchDialog from "@/components/merch/merch-dialog";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export default function MerchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MerchPageContent />
        </Suspense>
    );
}

function MerchPageContent() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [queryArgs, setQueryArgs] = useState<QueryMerchPageArgs>(
        defaultQueryMerchPageArgs
    );

    const searchParams = useSearchParams();
    const router = useRouter();

    // Sync queryArgs with URL searchParams
    useEffect(() => {
        const page = parseInt(
            searchParams.get("page") ||
                defaultQueryMerchPageArgs.page.toString(),
            10
        );
        const keyword =
            searchParams.get("keyword") || defaultQueryMerchPageArgs.keyword;

        setQueryArgs((prev) => ({
            ...prev,
            page,
            keyword,
        }));
        setSearchKeyword(keyword); // Sync input value with query
    }, [searchParams]);

    // Fetch merch data using React Query
    const { data, isError, isLoading } = useQuery({
        queryKey: ["getAllMerch", queryArgs],
        queryFn: async () => queryMerchPage(queryArgs),
    });

    const merchs = data?.items || [];
    const totalPages = data?.totalPages || 1;
    const isNoMerch = merchs.length === 0;

    const queryPageWithNewUrl = (queryArgs: QueryMerchPageArgs) => {
        // Query with new url when search and pagination for borwser history
        router.push(
            `/merch?page=${queryArgs.page}${
                queryArgs.keyword &&
                queryArgs.keyword !== defaultQueryMerchPageArgs.keyword
                    ? `&keyword=${queryArgs.keyword.trim()}`
                    : ""
            }`,
        );
    };

    const handlePageChange = (newPage: number) => {
        queryPageWithNewUrl({
            ...queryArgs,
            page: newPage,
        });
    };

    const handleSearchBarSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        queryPageWithNewUrl({
            ...queryArgs,
            keyword: searchKeyword,
            page: 1, // Reset to the first page for a new search
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading merch data</div>;
    }

    return (
        <div className="md:container mx-auto px-2">
            <MerchSearchBar
                handleSearch={handleSearchBarSubmit}
                handleKeywordChange={setSearchKeyword}
                keyword={searchKeyword}
            />
            {isNoMerch && (
                <div className="text-center text-2xl text-gray-600 font-semibold mt-10">
                    No merch found :(
                </div>
            )}

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

function MerchSearchBar({
    handleSearch,
    handleKeywordChange,
    keyword,
}: {
    handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
    handleKeywordChange: (keyword: string) => void;
    keyword: string;
}) {
    return (
        <div className="flex justify-center items-center w-full mb-4">
            <form
                onSubmit={handleSearch}
                className="group/search-bar flex items-center w-full md:w-1/2 lg:w-1/3"
            >
                <button
                    type="submit"
                    className="group/search-btn w-fit h-fit p-1 hover:bg-blue-300 mr-[-20px] z-10 transition-all rounded-l-md"
                >
                    <div className="bg-white group-hover/search-btn:bg-blue-300 group-hover/search-btn:text-white transition-all text-gray-400 group-focus-within/search-bar:text-gray-800">
                        <PiMagnifyingGlassLight className="text-xl" />
                    </div>
                </button>

                <input
                    placeholder="Search for merch..."
                    onChange={(e) => handleKeywordChange(e.target.value)}
                    value={keyword}
                    className="text-center w-full pb-[2px] outline-none focus:outline-none border-b-[1px] border-gray-300 focus:border-gray-600 transition-all focus:placeholder-transparent"
                />
            </form>
        </div>
    );
}
