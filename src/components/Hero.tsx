import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-16">
      {/* Left Content */}
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          Hi, I&apos;m{" "}
          <span className="text-primary font-semibold">Amay Dixit</span>
        </h1>

        <h2 className="text-xl font-medium">
          I build <span className="text-secondary">Backend Systems</span> and{" "}
          <span className="text-accent">Distributed Infrastructure</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Pre-final year DSAI @ IIT Bhilai · CGPA 9.08 · Building from-scratch systems in Go, Rust, and Python
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Skilled in Go, Python, Rust, C/C++, TypeScript, Next.js, PostgreSQL, libp2p, and CRDTs.
          Built a BitTorrent client from scratch, CRDT-based sync engines (ACORDE),
          and LLM-powered analysis tools. Led{" "}
          <span className="font-semibold text-secondary">OpenLake</span>{" "}
          (open-source society, IIT Bhilai) as Coordinator · Intern at{" "}
          <span className="font-semibold text-secondary">MOSIP/C4GT</span>{" "}
          and{" "}
          <span className="font-semibold text-secondary">FOSSEE, IIT Bombay</span>
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-4 py-2 text-sm bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <ExternalLink size={18} />
            View Projects
          </Link>

          <Link
            href="/resume"
            className="flex items-center gap-3 px-4 py-2 text-sm bg-secondary hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Download size={18} />
            Resume
          </Link>
          <div className="flex gap-3">
            <Link
              href="https://github.com/amaydixit11"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="GitHub"
            >
              <Github size={25} />
            </Link>

            <Link
              href="https://www.linkedin.com/in/amay-dixit-462113284"
              className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={25} />
            </Link>

            <Link
              href="https://x.com/AmayDixit11"
              className="p-2 text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={25} />
            </Link>

            <Link
              href="mailto:amayd@iitbhilai.ac.in"
              className="p-2 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Email"
            >
              <Mail size={25} />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-shrink-0">
        <Image
          src="/amay2.jpeg"
          alt="Amay Dixit"
          width={300}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
