import { DataSourceConfig, HeatMapValue } from "@/types/pixels";
import { Languages } from "lucide-react";

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
    if (Math.random() < 0.6) {
      const count = Math.floor(Math.random() * 50) + 10;
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

export const duolingoDataSource: DataSourceConfig = {
  id: "duolingo",
  name: "Duolingo",
  description: "Language learning streak and daily practice",
  icon: Languages,
  colors: ["#ebedf0", "#d4f1d4", "#7dd87d", "#58cc58", "#1cb11c"],
  unit: "XP earned",
  dataProvider: () => {
    // TODO: Replace with actual Duolingo API call
    return generateDummyData();
  },
};
