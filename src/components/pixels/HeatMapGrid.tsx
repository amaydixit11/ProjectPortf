"use client";

import React, { useState, useEffect } from "react";
import HeatMap from "@uiw/react-heat-map";
import { DataSource, HeatMapValue } from "@/types/pixels";

interface HeatMapGridProps {
  dataSource: DataSource;
}

export const HeatMapGrid: React.FC<HeatMapGridProps> = ({ dataSource }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [data, setData] = useState<HeatMapValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colors = dataSource.colors || [
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await dataSource.fetchData();
        setData(result);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataSource]);

  const endDate = new Date();
  // endDate.setMonth(11); // December (0-indexed)
  // endDate.setDate(31);

  const startDate = new Date(endDate.getTime() - 280 * 24 * 60 * 60 * 1000);

  // startDate.setFullYear(startDate.getFullYear());
  // startDate.setMonth(0); // January
  // startDate.setDate(1);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 dark:text-gray-400">
            Loading data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-8">
      <div className="space-y-6">
        {/* Heatmap Container with proper overflow */}
        <div className="w-full overflow-x-scroll overflow-y-visible pb-2">
          <div className="min-w-[800px]">
            <HeatMap
              legendRender={() => <></>}
              width={800}
              value={data}
              startDate={startDate}
              endDate={endDate}
              panelColors={colors}
              rectSize={12}
              space={3}
              style={{
                color: "#6b7280",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              rectProps={{
                rx: 2,
              }}
              rectRender={(props, data) => {
                const isSelected = selectedDate === data.date;
                return (
                  <rect
                    {...props}
                    opacity={selectedDate && !isSelected ? 0.3 : 1}
                    onClick={() => {
                      setSelectedDate(
                        data.date === selectedDate ? "" : data.date
                      );
                    }}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      ...props.style,
                    }}
                    className="hover:stroke-gray-900 dark:hover:stroke-gray-100 hover:opacity-100"
                    strokeWidth={isSelected ? 2.5 : 0}
                    stroke={isSelected ? "#3b82f6" : "none"}
                  />
                );
              }}
            />
          </div>
        </div>

        {/* Legend with better spacing */}
        <div className="flex items-center justify-end gap-3 text-xs">
          <span className="text-gray-500 dark:text-gray-500 font-medium">
            Less
          </span>
          <div className="flex items-center gap-1.5">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-3.5 h-3.5 rounded-sm transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
                title={`Level ${index}`}
              />
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-500 font-medium">
            More
          </span>
        </div>

        {/* Selected Date Info with improved design */}
        {selectedDate && (
          <div className="mt-2 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {data.find((d) => d.date === selectedDate)?.count || 0}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {dataSource.unit}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDate("")}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
