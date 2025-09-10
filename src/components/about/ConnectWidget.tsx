// components/about/ConnectWidget.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Pin } from "lucide-react";
import { Caveat } from "next/font/google";
import styles from "./ConnectWidget.module.css";

// Handwritten font
const caveat = Caveat({ subsets: ["latin"], weight: "700" });

const ConnectWidget: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.note} ${caveat.className}`}>
        <div className={styles.foldedCorner}></div> 
        <div className={styles.paperTear}></div>
        <h2 className="text-4xl overflow-hidden">Let&apos;s Connect</h2>
        <p className="text-xl">
          Always open to chatting about{" "}
          <span className="text-[var(--color-secondary)] font-semibold">tech</span>,{" "}
          <span className="text-[var(--color-purple)] font-semibold">projects</span>, or{" "}
          <span className="text-[var(--color-orange)] font-semibold">ideas</span>.
          <br />
          Reach out via my socials in{" "}
          <span className="text-[var(--color-accent)] font-semibold">header</span> or email me at{" "}
          <Link href="mailto:amayd@iitbhilai.ac.in" className={`${styles.email} text-[var(--color-primary)] hover:text-[var(--color-secondary)]`}>
            amayd@iitbhilai.ac.in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConnectWidget;
