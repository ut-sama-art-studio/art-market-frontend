import React from "react";

export default function MerchPageLoadingText({ text }: { text: string }) {
    return (
        <div className="text-center text-2xl text-gray-600 font-semibold mt-10">
            {text}
        </div>
    );
}
