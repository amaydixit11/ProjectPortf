import { DataSourceConfig, HeatMapValue } from "@/types/pixels";
import { Github } from "lucide-react";

const generateDummyData = (): HeatMapValue[] => {
  const data: HeatMapValue[] = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    // Generate random contributions with higher probability on weekdays
    const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
    const probability = isWeekday ? 0.7 : 0.4;

    if (Math.random() < probability) {
      const count = Math.floor(Math.random() * 20) + 1;
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
};

export const githubDataSource: DataSourceConfig = {
  id: "github",
  name: "GitHub",
  description: "Daily contributions and commits to open source projects",
  icon: Github,
  colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  unit: "contributions",
  dataProvider: () => {
    // TODO: Replace with actual GitHub API call
    // Example: fetch contributions from GitHub GraphQL API
    return generateDummyData();
  },
};