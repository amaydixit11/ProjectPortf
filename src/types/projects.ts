// types/project.ts
export interface Project {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  demo?: string;
  status: string;
  type: string;
  startDate?: string;
  highlights?: string[];
  category?: string;
}

export interface ProjectCategory {
  name: string;
  projects: Project[];
}

export interface ProjectsData {
  projects: Project[];
  stats: {
    totalProjects: number;
    publicRepos: number;
    contributions: number;
    languages: number;
  };
}

