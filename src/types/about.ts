// types/about.ts
export interface CurrentActivity {
  status: string;
  project: string;
  language: string;
  link: string;
}

export interface Track {
  name: string;
  artist: string;
  album: string;
  isPlaying: boolean;
}

export interface Achievement {
  id: number;
  title: string;
}

export interface QuickLink {
  href: string;
  label: string;
  icon: string;
  external?: boolean;
}