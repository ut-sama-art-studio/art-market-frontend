"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <Suspense>{children}</Suspense>
        </Provider>
    );
}
