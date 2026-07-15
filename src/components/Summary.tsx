import React from 'react';
import type { StepEntry } from '../utils/health';

interface SummaryProps {
  dailySteps: number;
  dailyCalories: number;
  weeklyEntries: StepEntry[];
  weeklySteps: number;
  weeklyCalories: number;
}

const Summary: React.FC<SummaryProps> = ({
  dailySteps,
  dailyCalories,
  weeklyEntries,
  weeklySteps,
  weeklyCalories,
}) => (
  <>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-600 font-medium">Daily Steps</p>
        <p className="text-2xl font-bold text-blue-800">{dailySteps.toLocaleString()}</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4 text-center">
        <p className="text-sm text-green-600 font-medium">Calories Burned</p>
        <p className="text-2xl font-bold text-green-800">{dailyCalories}</p>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Steps</span>
          <span className="font-medium text-gray-800">{weeklySteps.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Calories</span>
          <span className="font-medium text-gray-800">{weeklyCalories}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {weeklyEntries.map((entry, idx) => (
          <div key={idx} className="border-t border-gray-100 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{entry.date}</span>
              <span className="font-medium">
                {entry.steps} steps ({entry.calories} kcal)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Summary;
