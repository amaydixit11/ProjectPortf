import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amay Dixit - Portfolio",
  description: "Portfolio of Amay Dixit, IIT Bhilai Student and Developer",
    icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col h-screen overflow-hidden">
            {/* Main Content Area for Mobile */}
            <main className="flex-1 flex flex-col overflow-hidden px-6">
              <div className="w-full h-full max-w-[1072px] flex flex-col">
                <Header />
                <div className="flex-1 overflow-y-auto no-scrollbar pb-20 pt-4 px-1">
                  {children}
                </div>
              </div>
            </main>
            
            {/* Fixed Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 h-16 backdrop-blur-lg backdrop-filter bg-white/80 border-t dark:border-slate-800 z-50">
              <Nav />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-screen overflow-hidden">
            {/* Fixed Sidebar for Desktop */}
            <div className="h-full backdrop-blur-lg backdrop-filter bg-white/80 border-t dark:border-slate-800 sticky top-0 left-0 h-full w-1/9 z-50 shrink-0 ml-6">
              <Nav />
            </div>

            {/* Main Content Area for Desktop */}
            <main className="flex-1 flex flex-col overflow-hidden px-6 border-l">
              <div className="w-full h-full max-w-[1072px] flex flex-col">
                <Header />
                <div className="flex-1 overflow-y-auto no-scrollbar pb-6 pt-6">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}