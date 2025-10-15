import { DataSourceConfig, HeatMapValue } from "@/types/pixels";
import { Terminal } from "lucide-react";

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
    if (Math.random() < 0.45) {
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
};

export const geeksforgeeksDataSource: DataSourceConfig = {
  id: "geeksforgeeks",
  name: "GeeksforGeeks",
  description: "Algorithm practice and interview preparation",
  icon: Terminal,
  colors: ["#ebedf0", "#b8e6b8", "#6bc96b", "#2d8f2d", "#1a5c1a"],
  unit: "problems solved",
  dataProvider: () => {
    // TODO: Replace with actual GeeksforGeeks API/scraping
    return generateDummyData();
  },
};