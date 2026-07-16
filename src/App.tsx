import React, { useEffect, useState } from "react";
import {
  calculateCalories,
  getDailyEntries,
  getWeeklyEntries,
  getDateKey,
  sumSteps,
  sumCalories,
  type StepEntry,
} from "./utils/health";
import { loadEntries, saveEntries } from "./services/storage";
import StepsInput from "./components/StepsInput";
import Summary from "./components/Summary";
import StepsProgressChart, {
  STEPS_GOAL,
} from "./components/StepsProgressChart";

const App: React.FC = () => {
  const [entries, setEntries] = useState<StepEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleAddSteps = (steps: number) => {
    const newEntry: StepEntry = {
      date: getDateKey(),
      steps,
      calories: calculateCalories(steps),
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  const dailyEntries = getDailyEntries(entries);
  const weeklyEntries = getWeeklyEntries(entries);

  const dailySteps = sumSteps(dailyEntries);
  const dailyCalories = sumCalories(dailyEntries);

  const weeklySteps = sumSteps(weeklyEntries);
  const weeklyCalories = sumCalories(weeklyEntries);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Health Tracker</h1>
          <p className="text-gray-500">Track your daily steps</p>
        </header>

        <StepsInput onAddSteps={handleAddSteps} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Daily Goal Progress
          </h2>
          <StepsProgressChart steps={dailySteps} goal={STEPS_GOAL} />
          <p className="text-center text-sm text-gray-500 mt-4">
            Goal: {STEPS_GOAL.toLocaleString()} steps
          </p>
        </div>

        <Summary
          dailySteps={dailySteps}
          dailyCalories={dailyCalories}
          weeklyEntries={weeklyEntries}
          weeklySteps={weeklySteps}
          weeklyCalories={weeklyCalories}
        />
      </div>
    </div>
  );
};

export default App;
