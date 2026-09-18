import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "Devarsh Patel — The Restless Mind Index",
    description: "Software, AI, creative work, and the questions connecting them. An interactive portfolio by Devarsh Patel.",
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


