import "./globals.css";
import { clsx } from "clsx";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(sfPro.variable, inter.variable)}>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <VercelAnalytics />
      </body>
    </html>
  );
}
