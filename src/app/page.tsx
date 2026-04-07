import Hero from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Terminal, Code2, Globe } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/utils/blog";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      <Hero />

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-gray-800">
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-primary">9.08</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">CGPA @ IIT Bhilai</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-secondary">60+</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Org Repos Managed</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-accent">1.2k+</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Contributions</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-purple-500">1320</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Codeforces Rating</p>
        </div>
      </section>

      {/* Featured Projects */}
      <ProjectsGrid />

      {/* OpenLake Section */}
      <section className="space-y-8 bg-primary/5 dark:bg-blue-900/10 p-8 md:p-12 rounded-3xl border border-primary/10 dark:border-blue-800/20">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase">
            <Users size={18} />
            leadership
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            OpenLake Coordinator @ IIT Bhilai
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Leading the technical society responsible for fostering open-source culture across the campus. Managed 60+ organization repositories, built standardized CI/CD pipelines, and organized workshops and hackathons for 200+ students.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Terminal size={20} className="text-primary" />
              <span className="text-sm font-medium">Standardized CI/CD Templates</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Globe size={20} className="text-secondary" />
              <span className="text-sm font-medium">Managed 60+ Repositories</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Code2 size={20} className="text-accent" />
              <span className="text-sm font-medium">Community Mentorship</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Users size={20} className="text-purple-500" />
              <span className="text-sm font-medium">Technical Roadmaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookOpen size={28} className="text-secondary" />
            Latest Thoughts
          </h2>
          <Link 
            href="/blog" 
            className="text-secondary hover:text-green-700 font-medium flex items-center gap-2 group transition-colors"
          >
            All posts
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300"
            >
              <div className="space-y-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500 flex items-center gap-2">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Let&apos;s build something great.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto italic">
          &quot;I thrive on technical challenges, whether it&apos;s building distributed systems or architecting scalable backend infrastructures.&quot;
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="mailto:amayd@iitbhilai.ac.in"
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Get in touch
          </Link>
          <Link
            href="https://github.com/amaydixit11"
            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            GitHub Profile
          </Link>
        </div>
      </section>
    </div>
  );
}
