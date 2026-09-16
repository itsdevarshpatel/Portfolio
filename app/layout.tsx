import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "Devarsh Patel — An Open Notebook",
    description: "Software, systems, and the occasional rabbit hole. Engineering and creative work by Devarsh Patel.",
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
