import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "Devarsh Patel — Software & Creative Work",
    description: "Software engineering, AI, and creative work by Devarsh Patel. Built with logic. Led by curiosity.",
    other: {
        "codex-preview": "development",
    },
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
    },
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en">
      <body className="antialiased">{children}</body>
    </html>);
}

