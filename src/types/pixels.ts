import { LucideIcon } from "lucide-react";

export interface HeatMapValue {
  date: string; // Format: YYYY/MM/DD
  count: number;
  content?: string;
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  colors?: string[];
  unit: string;
  fetchData: () => Promise<HeatMapValue[]>;
}

export interface DataSourceConfig {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  colors?: string[];
  unit: string;
  dataProvider: () => Promise<HeatMapValue[]> | HeatMapValue[];
}