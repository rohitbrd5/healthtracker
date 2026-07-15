import { describe, it, expect } from 'vitest';
import {
  calculateCalories,
  getDailyEntries,
  getWeeklyEntries,
  getDateKey,
  sumSteps,
  sumCalories,
  type StepEntry,
} from './health';

describe('calculateCalories', () => {
  it('burns ~4 kcal per 1000 steps', () => {
    expect(calculateCalories(1000)).toBe(40);
    expect(calculateCalories(0)).toBe(0);
    expect(calculateCalories(2500)).toBe(100);
  });
});

describe('getDateKey', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(getDateKey(new Date(2026, 6, 15))).toBe('2026-07-15');
  });
});

describe('getDailyEntries', () => {
  const entries: StepEntry[] = [
    { date: '2026-07-15', steps: 1000, calories: 40 },
    { date: '2026-07-15', steps: 2000, calories: 80 },
    { date: '2026-07-14', steps: 500, calories: 20 },
  ];

  it('returns only entries for the given date', () => {
    const daily = getDailyEntries(entries, '2026-07-15');
    expect(daily).toHaveLength(2);
    expect(sumSteps(daily)).toBe(3000);
    expect(sumCalories(daily)).toBe(120);
  });
});

describe('getWeeklyEntries', () => {
  const entries: StepEntry[] = [
    { date: '2026-07-15', steps: 1000, calories: 40 },
    { date: '2026-07-14', steps: 200, calories: 8 },
    { date: '2026-07-09', steps: 100, calories: 4 }, // 6 days before the 15th -> outside
    { date: '2026-07-08', steps: 999, calories: 40 }, // outside
  ];

  it('includes the trailing 7-day window inclusive of both ends', () => {
    const weekly = getWeeklyEntries(entries, '2026-07-15');
    expect(weekly).toHaveLength(2);
    expect(sumSteps(weekly)).toBe(1200);
  });
});
