export interface CodeforcesSubmission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    type: string;
    rating?: number;
    tags: string[];
  };
  author: {
    members: Array<{ handle: string }>;
    participantType: string;
  };
  programmingLanguage: string;
  verdict?: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface CodeforcesApiResponse<T> {
  status: "OK" | "FAILED";
  comment?: string;
  result?: T;
}

export interface HeatMapValue {
  date: string;
  count: number;
}