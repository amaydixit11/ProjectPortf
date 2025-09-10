"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, FileText, Briefcase, BookOpen } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: Info, label: "About" },
    { href: "/blog", icon: FileText, label: "Blog" },
    { href: "/projects", icon: Briefcase, label: "Projects" },
    { href: "/resume", icon: BookOpen, label: "Resume" },
  ];

  return (
    <div className="fixed w-full md:sticky bottom-0 md:top-0 h-16 md:w-24 shrink-0 md:h-screen overflow-y-auto no-scrollbar border-r dark:border-slate-800 z-50 backdrop-filter backdrop-blur-lg">
      <div className="h-full w-full flex flex-row md:flex-col justify-between after:flex-1 after:mt-auto">
        <div className="hidden md:block md:flex-1" />
        <div className="flex-1 grow flex items-center w-full">
          <nav className="w-full">
            <ul className="md:space-y-4 flex flex-row items-center w-screen justify-evenly md:flex-col md:justify-start md:items-center md:w-24">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href} className="md:py-2">
                    <Link
                      href={item.href}
                      className={`w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 ${
                        isActive
                          ? "text-sky-500"
                          : "text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                      }`}
                    >
                      <span className="sr-only">{item.label}</span>
                      <Icon size={20} stroke="currentColor" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
