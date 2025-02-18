import { Suspense } from "react";
import MerchGrid from "./merch-grid";
import MerchSearchBar from "./merch-search-bar";

export default function MerchPage() {
    return (
        <Suspense>
            <div className="md:container mx-auto px-2">
                <MerchSearchBar />
                <MerchGrid />
            </div>
        </Suspense>
    );
}
