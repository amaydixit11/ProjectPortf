"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-full mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left - Logo/Name */}
        <div className="md:hidden flex items-center justify-end mr-5 mt-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <img
                // src="/amay3.png"
                src="/icon.png"
                alt="Amay avatar"
                className="w-full h-full object-cover"
                // className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/5 w-[200%] h-[200%] object-cover"

                // style={{ objectPosition: "center 100%" }}
              />
            </div>
          </Link>
        </div>
        <div className="hidden md:block flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Amay Dixit
          </Link>

          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Available for opportunities
            </span>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/amaydixit11"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent/20 transition"
              aria-label="GitHub"
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://x.com/AmayDixit11"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent/20 transition"
              aria-label="X"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/amay-dixit-462113284"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent/20 transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </Link>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background hover:bg-accent/20 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* CTA Button */}
          <Link
            href="mailto:amayd@iitbhilai.ac.in"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Let&apos;s Connect</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
