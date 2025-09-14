// src/app/layout.tsx - Enhanced with better SEO
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amay Dixit - Backend Engineer & Open Source Developer | IIT Bhilai Student",
  description: "Amay Dixit is a Backend Engineer and Open Source Developer studying Computer Science at IIT Bhilai. Specializing in system design, scalable applications, and contributing to MOSIP and FOSSEE projects. Experienced in Go, TypeScript, React, Node.js, and database systems.",
  keywords: [
    "Amay Dixit",
    "Backend Engineer", 
    "Open Source Developer",
    "IIT Bhilai",
    "Computer Science",
    "System Design",
    "Node.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Go Developer",
    "Database Systems",
    "MOSIP Contributor",
    "FOSSEE Fellow",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "API Development",
    "Microservices",
    "Distributed Systems"
  ],
  authors: [{ name: "Amay Dixit", url: "https://amaydixit11.vercel.app" }],
  creator: "Amay Dixit",
  publisher: "Amay Dixit",
  metadataBase: new URL("https://amaydixit11.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amaydixit11.vercel.app",
    title: "Amay Dixit - Backend Engineer & Open Source Developer",
    description: "Backend Engineer specializing in system design and scalable applications. Open Source contributor to MOSIP and FOSSEE. Computer Science student at IIT Bhilai.",
    siteName: "Amay Dixit Portfolio",
    images: [
      {
        url: "/amay2.JPG",
        width: 1200,
        height: 630,
        alt: "Amay Dixit - Backend Engineer and Open Source Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amay Dixit - Backend Engineer & Open Source Developer",
    description: "Backend Engineer specializing in system design and scalable applications. Open Source contributor to MOSIP and FOSSEE.",
    site: "@AmayDixit11",
    creator: "@AmayDixit11",
    images: ["/amay2.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://amaydixit11.vercel.app" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Amay Dixit" />
        <meta name="copyright" content="Amay Dixit" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IN-CG" />
        <meta name="geo.placename" content="Durg, Chhattisgarh" />
        <meta name="geo.position" content="21.1938;81.2809" />
        <meta name="ICBM" content="21.1938, 81.2809" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Amay Dixit",
              "url": "https://amaydixit11.vercel.app",
              "image": "https://amaydixit11.vercel.app/amay2.JPG",
              "jobTitle": "Backend Engineer & Open Source Developer",
              "description": "Backend Engineer specializing in system design and scalable applications. Open Source contributor to MOSIP and FOSSEE projects.",
              "email": "amayd@iitbhilai.ac.in",
              "telephone": "+91-XXXXXXXXXX", // Add if you want
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Durg",
                "addressRegion": "Chhattisgarh",
                "addressCountry": "IN"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Indian Institute of Technology Bhilai",
                "url": "https://www.iitbhilai.ac.in"
              },
              "knowsAbout": [
                "Backend Engineering",
                "System Design",
                "Open Source Development",
                "Node.js",
                "TypeScript",
                "React",
                "Go",
                "Python",
                "Database Systems",
                "API Development",
                "Microservices"
              ],
              "sameAs": [
                "https://github.com/amaydixit11",
                "https://x.com/AmayDixit11",
                "https://www.linkedin.com/in/amay-dixit-462113284"
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "MOSIP",
                  "url": "https://mosip.io"
                },
                {
                  "@type": "Organization", 
                  "name": "FOSSEE, IIT Bombay",
                  "url": "https://fossee.in"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col h-screen overflow-hidden">
            {/* Main Content Area for Mobile */}
            <main className="flex-1 flex flex-col overflow-hidden pl-6 justify-around">
              <div className="w-full h-full max-w-[2000px] flex flex-col justify-around">
                <Header />
                <div className="flex-1 overflow-y-auto no-scrollbar pb-20 pt-4 px-1 justify-around">
                  {children}
                </div>
              </div>
            </main>
            
            {/* Fixed Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 h-16 backdrop-blur-lg backdrop-filter bg-white/80 dark:bg-black/20 border-t border-gray-200 dark:border-slate-800 z-50">
              <Nav />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-screen overflow-hidden">
            {/* Fixed Sidebar for Desktop */}
            <div className="h-full backdrop-blur-lg backdrop-filter bg-white/80 dark:bg-black/0 border-gray-200 sticky top-0 left-0 h-full w-1/9 z-50 shrink-0 ml-6">
              <Nav />
            </div>

            {/* Main Content Area for Desktop - INCREASED WIDTH */}
            <main className="flex-1 flex flex-col overflow-hidden pl-12 border-l border-gray-200 dark:border-slate-800">
              <div className="w-full h-full max-w-[1111px] flex flex-col">
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