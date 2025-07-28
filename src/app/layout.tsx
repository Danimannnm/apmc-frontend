import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "APMC - All Pakistan Music Conference",
  description: "Official website for All Pakistan Music Conference - Managing auditions, finals, and results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <AuthProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 w-full">
              <div className="lg:pl-64">
                <div className="p-4 lg:p-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
