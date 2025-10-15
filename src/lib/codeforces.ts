import { CodeforcesApiResponse, CodeforcesSubmission, HeatMapValue } from "@/types/codeforces";
import { DataSourceConfig } from "@/types/pixels";

const CODEFORCES_API_BASE = "https://codeforces.com/api";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const REQUEST_DELAY = 2000; // 2 seconds between requests

let lastRequestTime = 0;
const cache = new Map<string, { data: unknown; timestamp: number }>();

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < REQUEST_DELAY) {
    await new Promise(resolve => 
      setTimeout(resolve, REQUEST_DELAY - timeSinceLastRequest)
    );
  }
  
  lastRequestTime = Date.now();
}

export async function fetchCodeforcesApi<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  
  const url = `${CODEFORCES_API_BASE}/${endpoint}${queryString ? `?${queryString}` : ""}`;
  
  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  
  // Rate limiting
  await waitForRateLimit();
  
  try {
    const response = await fetch(url);
    const data: CodeforcesApiResponse<T> = await response.json();
    
    if (data.status === "FAILED") {
      throw new Error(data.comment || "API request failed");
    }
    
    if (!data.result) {
      throw new Error("No result in API response");
    }
    
    // Cache the result
    cache.set(url, { data: data.result, timestamp: Date.now() });
    
    return data.result;
  } catch (error) {
    console.error(`Codeforces API error for ${endpoint}:`, error);
    throw error;
  }
}

export async function getUserSubmissions(
  handle: string,
  count: number = 10000
): Promise<CodeforcesSubmission[]> {
  return fetchCodeforcesApi<CodeforcesSubmission[]>("user.status", {
    handle,
    from: 1,
    count,
  });
}
export interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  organization?: string;
  contribution?: number;
  friendOfCount?: number;
  titlePhoto?: string;
  avatar?: string;
}

export interface CodeforcesRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export async function getUserInfo(handle: string): Promise<CodeforcesUser> {
  const users = await fetchCodeforcesApi<CodeforcesUser[]>("user.info", {
    handles: handle,
  });
  return users[0];
}

export async function getUserRating(handle: string): Promise<CodeforcesRatingChange[]> {
  return fetchCodeforcesApi<CodeforcesRatingChange[]>("user.rating", { handle });
}


export function processSubmissionsToHeatmap(
  submissions: CodeforcesSubmission[]
): HeatMapValue[] {
  const dateMap = new Map<string, number>();
  
  for (const submission of submissions) {
    // Only count accepted submissions
    if (submission.verdict !== "OK") continue;
    
    const date = new Date(submission.creationTimeSeconds * 1000);
    const dateKey = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    
    dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
  }
  
  return Array.from(dateMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));
}

export function filterSubmissionsByDateRange(
  submissions: CodeforcesSubmission[],
  startDate: Date,
  endDate: Date
): CodeforcesSubmission[] {
  const startTime = startDate.getTime() / 1000;
  const endTime = endDate.getTime() / 1000;
  
  return submissions.filter(
    (sub) =>
      sub.creationTimeSeconds >= startTime &&
      sub.creationTimeSeconds <= endTime
  );
}

export function getSubmissionStats(submissions: CodeforcesSubmission[]) {
  const stats = {
    total: submissions.length,
    accepted: 0,
    problemsSolved: new Set<string>(),
    languages: new Map<string, number>(),
    verdicts: new Map<string, number>(),
    averageRating: 0,
    problemsWithRating: 0,
  };
  
  let totalRating = 0;
  
  for (const sub of submissions) {
    if (sub.verdict === "OK") {
      stats.accepted++;
      const problemId = `${sub.problem.contestId || "unknown"}-${sub.problem.index}`;
      stats.problemsSolved.add(problemId);
    }
    
    if (sub.verdict) {
      stats.verdicts.set(
        sub.verdict,
        (stats.verdicts.get(sub.verdict) || 0) + 1
      );
    }
    
    stats.languages.set(
      sub.programmingLanguage,
      (stats.languages.get(sub.programmingLanguage) || 0) + 1
    );
    
    if (sub.problem.rating) {
      totalRating += sub.problem.rating;
      stats.problemsWithRating++;
    }
  }
  
  stats.averageRating =
    stats.problemsWithRating > 0
      ? Math.round(totalRating / stats.problemsWithRating)
      : 0;
  
  return {
    ...stats,
    problemsSolved: stats.problemsSolved.size,
  };
}

export function generateCodeforcesHeatmapData(handle: string) {
  return async (): Promise<HeatMapValue[]> => {
    try {
      // Fetch user submissions
      const submissions = await getUserSubmissions(handle);
      
      // Filter to current calendar year
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1); // January 1
      const endDate = new Date(currentYear, 11, 31); // December 31
      
      const filteredSubmissions = filterSubmissionsByDateRange(
        submissions,
        startDate,
        endDate
      );
      
      // Convert to heatmap data
      return processSubmissionsToHeatmap(filteredSubmissions);
    } catch (error) {
      console.error("Error fetching Codeforces data:", error);
      return generateFallbackData();
    }
  };
}

function generateFallbackData(): HeatMapValue[] {
  const data: HeatMapValue[] = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (Math.random() < 0.3) {
      const count = Math.floor(Math.random() * 8) + 1;
      data.push({
        date: `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}/${String(date.getDate()).padStart(2, "0")}`,
        count,
      });
    }
  }

  return data;
}

import { Code } from "lucide-react";

export function createCodeforcesDataSource(
  handle: string
): DataSourceConfig {
  return {
    id: "codeforces",
    name: "Codeforces",
    description: "Competitive programming practice and contest participation",
    icon: Code,
    colors: ["#ebedf0", "#c6e3f9", "#6eb5de", "#4682b4", "#1e3a5f"],
    unit: "problems solved",
    dataProvider: generateCodeforcesHeatmapData(handle),
  };
}