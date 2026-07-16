import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

/** Daily step goal. */
export const STEPS_GOAL = 5000;

/** Unfilled track color behind the completed portion. */
const TRACK_COLOR = "#E5E7EB"; // gray-200

/**
 * Returns the color for the completed doughnut arc based on how many steps
 * have been taken against the daily goal.
 */
export function getProgressColor(steps: number): string {
  if (steps >= 5000) return "#22C55E"; // green
  if (steps >= 2500) return "#EAB308"; // yellow
  return "#F97316"; // orange
}

interface StepsProgressChartProps {
  steps: number;
  goal?: number;
}

const StepsProgressChart: React.FC<StepsProgressChartProps> = ({
  steps,
  goal = STEPS_GOAL,
}) => {
  const completed = Math.min(steps, goal);
  const remaining = goal - completed;
  const color = getProgressColor(steps);
  const percent = Math.round((completed / goal) * 100);

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: [color, TRACK_COLOR],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-gray-800">
          {steps.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">/ {goal.toLocaleString()}</span>
        <span className="text-xs text-gray-400 mt-1">{percent}%</span>
      </div>
    </div>
  );
};

export default StepsProgressChart;
