"use client";

import { useDebounce } from "@/hooks/use-debounce";
import {
    defaultQueryMerchPageArgs,
    QueryMerchPageArgs,
} from "@/services/merch/merch-service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setKeyword, setQueryArgs } from "@/store/merch-query-slice";

export default function MerchSearchBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const queryArgs = useSelector((state: RootState) => state.merchQuery);

    // Handle loading a url including keyword search param directly
    const [searchKeyword, setSearchKeyword] = useState(
        searchParams.get("keyword") || queryArgs.keyword
    );
    const [isKeywordChange, setIsKeywordChange] = useState(false);
    const isKeywordChangeDebounced = useDebounce(isKeywordChange, 500);

    // Sync queryArgs with URL searchParams
    useEffect(() => {
        const page = parseInt(
            searchParams.get("page") ||
                defaultQueryMerchPageArgs.page.toString(),
            10
        );
        const keyword =
            searchParams.get("keyword") || defaultQueryMerchPageArgs.keyword;

        dispatch(setQueryArgs({ page, keyword }));
        setSearchKeyword(keyword);
    }, [searchParams, dispatch]);

    const queryPageWithNewUrl = useCallback(
        (args: QueryMerchPageArgs) => {
            // Query with new url when search and pagination for browser history
            const params = new URLSearchParams(searchParams);
            params.set("page", args.page.toString());
            searchKeyword
                ? params.set("keyword", searchKeyword)
                : params.delete("keyword");

            router.push(`${pathname}/?${params.toString()}`);
            setIsKeywordChange(false);
        },
        [pathname, router, searchParams, searchKeyword]
    );

    const handleSearchBarOnChange = (e: any) => {
        setSearchKeyword(e.target.value);
        setIsKeywordChange(true);
    };

    const handleSearchBarSubmit = useCallback(
        (event?: React.FormEvent<HTMLFormElement>) => {
            event?.preventDefault();
            queryPageWithNewUrl({
                ...defaultQueryMerchPageArgs,
                keyword: searchKeyword,
                page: 1, // Reset to the first page for a new search
            });
        },
        [queryPageWithNewUrl, searchKeyword]
    );

    useEffect(() => {
        if (isKeywordChangeDebounced) handleSearchBarSubmit();
    }, [isKeywordChangeDebounced, handleSearchBarSubmit]);

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
                    onChange={(e) => handleSearchBarOnChange(e)}
                    value={searchKeyword}
                    className="text-center w-full pb-[2px] outline-none focus:outline-none border-b-[1px] border-gray-300 focus:border-gray-600 transition-all focus:placeholder-transparent"
                />
            </form>
        </div>
    );
}
