import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import type { StepEntry } from '../utils/health';
import Summary from './Summary';

afterEach(cleanup);

const weeklyEntries: StepEntry[] = [
  { date: '2026-07-15', steps: 1000, calories: 40 },
  { date: '2026-07-14', steps: 500, calories: 20 },
];

describe('Summary', () => {
  it('renders the daily stats', () => {
    render(
      <Summary
        dailySteps={1500}
        dailyCalories={60}
        weeklyEntries={weeklyEntries}
        weeklySteps={1500}
        weeklyCalories={60}
      />,
    );

    expect(screen.getByText('Daily Steps')).toBeInTheDocument();
    expect(screen.getAllByText('1,500')).toHaveLength(2);
    expect(screen.getByText('Calories Burned')).toBeInTheDocument();
    expect(screen.getAllByText('60')).toHaveLength(2);
  });

  it('renders the weekly summary with an entry row per day', () => {
    render(
      <Summary
        dailySteps={1500}
        dailyCalories={60}
        weeklyEntries={weeklyEntries}
        weeklySteps={1500}
        weeklyCalories={60}
      />,
    );

    expect(screen.getByText('Weekly Summary')).toBeInTheDocument();
    expect(screen.getByText('Total Steps')).toBeInTheDocument();
    expect(screen.getByText('Total Calories')).toBeInTheDocument();
    expect(screen.getByText('2026-07-15')).toBeInTheDocument();
    expect(screen.getByText('2026-07-14')).toBeInTheDocument();
    expect(screen.getByText('1000 steps (40 kcal)')).toBeInTheDocument();
    expect(screen.getByText('500 steps (20 kcal)')).toBeInTheDocument();
  });
});
