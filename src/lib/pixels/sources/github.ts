// lib/sources/github.ts

import { fetchGitHubContributionsPublic } from "@/lib/github";
import { DataSourceConfig } from "@/types/pixels";
import { Github } from "lucide-react";

// Configuration - Update this with your GitHub username
const GITHUB_USERNAME = "amaydixit11"; // Change this to your username

export const githubDataSource: DataSourceConfig = {
  id: "github",
  name: "GitHub",
  description: "Daily contributions and commits to open source projects",
  icon: Github,
  colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  unit: "contributions",
  dataProvider: async () => {
    try {
      // Using the public API (no authentication required)
      const contributions = await fetchGitHubContributionsPublic(GITHUB_USERNAME);
      return contributions;
    } catch (error) {
      console.error("Failed to fetch GitHub data:", error);
      
      // Fallback to empty data if API fails
      return [];
    }
  },
};