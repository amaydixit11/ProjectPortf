import { DataSourceConfig, HeatMapValue } from "@/types/pixels";
import { Zap } from "lucide-react";

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
    if (Math.random() < 0.4) {
      const count = Math.floor(Math.random() * 6) + 1;
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

export const leetcodeDataSource: DataSourceConfig = {
  id: "leetcode",
  name: "LeetCode",
  description: "Daily coding challenges and interview prep",
  icon: Zap,
  colors: ["#ebedf0", "#ffd4a3", "#ffa94d", "#ff8c00", "#cc5500"],
  unit: "problems solved",
  dataProvider: () => {
    // TODO: Replace with actual LeetCode API call
    return generateDummyData();
  },
};