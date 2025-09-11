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
    <div className="h-full w-full flex flex-col">
      {/* Spacer to push nav to center */}
      <div className="flex-1" />

      {/* Centered Navigation */}
      <div className="flex justify-center md:justify-end pr-3">
        <nav className="w-full max-w-fit">
          <ul className="flex flex-row md:flex-col md:space-y-1 justify-center md:items-center ">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href} className="md:py-2 mx-2 md:mx-0">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg transition-colors ${
                      isActive
                        ? "text-sky-500"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    <span className="sr-only">{item.label}</span>
                    <Icon
                      size={24}
                      stroke="currentColor"
                      className="hover:text-slate-600 hover:bg-slate-50 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Spacer to push nav to center */}
      <div className="flex-1" />
    </div>
  );
}
