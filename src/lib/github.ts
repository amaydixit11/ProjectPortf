// lib/github.ts

import { HeatMapValue } from "@/types/pixels";
import {
  GitHubConfig,
  GitHubUserContributions,
  GitHubContribution,
} from "@/types/github";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

/**
 * Fetches GitHub contributions for a user using the GitHub GraphQL API
 */
export async function fetchGitHubContributions(
  config: GitHubConfig
): Promise<HeatMapValue[]> {
  const { username, token } = config;

  // Calculate date range (last year)
  const to = new Date();
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
    from: from.toISOString(),
    to: to.toISOString(),
  };

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token is provided
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data: { data: GitHubUserContributions } = await response.json();

    if (!data.data?.user) {
      throw new Error(`User ${username} not found`);
    }

    // Transform the data into HeatMapValue format
    const contributions: HeatMapValue[] = [];
    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    calendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.contributionCount > 0) {
          // Convert date from YYYY-MM-DD to YYYY/MM/DD format
          const [year, month, dayNum] = day.date.split("-");
          contributions.push({
            date: `${year}/${month}/${dayNum}`,
            count: day.contributionCount,
          });
        }
      });
    });

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}

/**
 * Fetches GitHub contributions using a public scraping method (no auth required)
 * This is a fallback method that scrapes the public contribution graph
 */
export async function fetchGitHubContributionsPublic(
  username: string
): Promise<HeatMapValue[]> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch contributions: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.contributions) {
      throw new Error("Invalid response format");
    }

    // Transform the data into HeatMapValue format
    const contributions: HeatMapValue[] = [];

    data.contributions.forEach((contribution: GitHubContribution) => {
      if (contribution.count > 0) {
        contributions.push({
          date: contribution.date.replace(/-/g, "/"),
          count: contribution.count,
        });
      }
    });

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions (public):", error);
    throw error;
  }
}

/**
 * Helper function to get contribution level based on count
 * Mimics GitHub's contribution levels (0-4)
 */
export function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

/**
 * Validates GitHub username format
 */
export function isValidGitHubUsername(username: string): boolean {
  // GitHub username rules: alphanumeric and hyphens, max 39 chars, cannot start/end with hyphen
  const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
  return regex.test(username);
}