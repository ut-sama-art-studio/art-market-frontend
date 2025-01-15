"use client";

import { useDebounce } from "@/hooks/use-debounce";
import {
    defaultQueryMerchPageArgs,
    QueryMerchPageArgs,
} from "@/services/merch/merch-service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function MerchSearchBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialKeyword =
        searchParams.get("keyword") || defaultQueryMerchPageArgs.keyword; // Incase user loads a history that already has a keyword
    const [searchKeyword, setSearchKeyword] = useState(initialKeyword);

    const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
    useEffect(() => {
        handleSearchBarSubmit();
    }, [debouncedSearchKeyword]);

    const [queryArgs, setQueryArgs] = useState<QueryMerchPageArgs>(
        defaultQueryMerchPageArgs
    );

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
            searchKeyword,
        }));
        setSearchKeyword(keyword);
    }, [searchParams]);

    const queryPageWithNewUrl = (args: QueryMerchPageArgs) => {
        // Query with new url when search and pagination for borwser history
        const params = new URLSearchParams(searchParams);
        params.set("page", args.page.toString());
        args.keyword
            ? params.set("keyword", args.keyword)
            : params.delete("keyword");
        router.replace(`${pathname}/?${params.toString()}`);
    };

    const handleSearchBarSubmit = (
        event?: React.FormEvent<HTMLFormElement>
    ) => {
        event?.preventDefault();
        queryPageWithNewUrl({
            ...defaultQueryMerchPageArgs,
            keyword: searchKeyword,
            page: 1, // Reset to the first page for a new search
        });
    };

    return (
        <div className="flex justify-center items-center w-full mb-4">
            <form
                onSubmit={handleSearchBarSubmit}
                className="group/search-bar flex items-center w-full md:w-1/2 lg:w-1/3"
            >
                <button
                    type="submit"
                    className="group/search-btn w-fit h-fit p-1 hover:bg-blue-300 mr-[-20px] z-10 transition-all rounded-l-md"
                >
                    <div className="bg-white group-hover/search-btn:bg-blue-300 group-hover/search-btn:text-white transition-all text-gray-400 group-focus-within/search-bar:text-gray-800">
                        <PiMagnifyingGlass className="text-xl" />
                    </div>
                </button>

                <input
                    placeholder="Search for merch..."
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    value={searchKeyword}
                    className="text-center w-full pb-[2px] outline-none focus:outline-none border-b-[1px] border-gray-300 focus:border-gray-600 transition-all focus:placeholder-transparent"
                />
            </form>
        </div>
    );
}
