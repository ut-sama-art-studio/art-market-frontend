import React, { useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type CustomPaginationProps = {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
};

export default function customPagination({
    currentPage,
    totalPages,
    handlePageChange,
}: CustomPaginationProps) {
    // show at most 5 pages at a time
    const range = 5;
    const startPage = Math.max(1, currentPage - Math.floor(range / 2));
    const endPage = Math.min(startPage + range - 1, totalPages);

    return (
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem className="cursor-pointer">
                            <PaginationPrevious
                                onClick={() =>
                                    currentPage > 1 &&
                                    handlePageChange(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                    )}
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                        <PaginationItem key={i} className="cursor-pointer">
                            <PaginationLink
                                onClick={() => handlePageChange(startPage + i)}
                                isActive={currentPage === startPage + i}
                            >
                                {startPage + i}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {endPage < totalPages - 1 && <PaginationEllipsis />}
                    {endPage < totalPages && (
                        <PaginationItem className="cursor-pointer">
                            <PaginationLink
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {currentPage < totalPages && (
                        <PaginationItem className="cursor-pointer">
                            <PaginationNext
                                onClick={() =>
                                    currentPage < totalPages &&
                                    handlePageChange(currentPage + 1)
                                }
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
