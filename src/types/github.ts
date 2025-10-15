// types/github.ts

export interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

export interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubUserContributions {
  user: {
    contributionsCollection: {
      contributionCalendar: GitHubContributionCalendar;
    };
  };
}

export interface GitHubConfig {
  username: string;
  token?: string; // Optional: for authenticated requests (higher rate limits)
}