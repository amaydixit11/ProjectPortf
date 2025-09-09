import Link from "next/link";
import {
  Home,
  Info,
  FileText,
  Briefcase,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export default function Nav() {
  return (
    <div className="fixed w-full md:sticky bottom-0 md:top-0 h-16 md:w-24 shrink-0 md:h-screen overflow-y-auto no-scrollbar border-r dark:border-slate-800 z-50 backdrop-filter backdrop-blur-lg">
      <div className="h-full w-full flex flex-row md:flex-col justify-between after:flex-1 after:mt-auto">
        <div className="hidden md:block md:flex-1" />
        <div className="flex-1 grow flex items-center w-full">
          <nav className="w-full">
            <ul className="md:space-y-4 flex flex-row items-center w-screen justify-evenly md:flex-col md:justify-start md:items-center md:w-24">
              <li className="md:py-2">
                <Link
                  className="w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 text-sky-500"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <Home size={21} />
                </Link>
              </li>
              <li className="md:py-2">
                <Link
                  className="w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                  href="/about"
                >
                  <span className="sr-only">About</span>
                  <Info size={20} />
                </Link>
              </li>
              <li className="md:py-2">
                <Link
                  className="w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                  href="/blog"
                >
                  <span className="sr-only">Blog</span>
                  <FileText size={20} />
                </Link>
              </li>
              <li className="md:py-2">
                <Link
                  className="w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                  href="/projects"
                >
                  <span className="sr-only">Projects</span>
                  <Briefcase size={20} />
                </Link>
              </li>
              <li className="md:py-2">
                <Link
                  className="w-full h-6 flex items-center justify-center relative after:absolute after:w-0.5 after:right-0 after:top-0 after:bottom-0 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                  href="/resume"
                >
                  <span className="sr-only">Resume</span>
                  <FileText size={20} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
