import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "@/components/nav-bar/nav-bar";
import { AuthProvider } from "@/utils/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/utils/providers/react-query-provider";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "UTSAMA Art Studio",
    description: "Website for the UofT club UTSAMA's art studio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ReactQueryProvider>
                <AuthProvider>
                    <body className={poppins.className}>
                        <NavBar></NavBar>
                        <main className="pb-10">{children}</main>
                        <Toaster />
                    </body>
                </AuthProvider>
            </ReactQueryProvider>
        </html>
    );
}
