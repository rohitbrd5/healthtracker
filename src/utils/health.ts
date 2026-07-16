// Calories burned per step (4 kcal per 1000 steps = 0.04 kcal/step).
export const CALORIES_PER_STEP = 0.04;

export interface StepEntry {
  /** ISO date key, e.g. "2026-07-15" */
  date: string;
  steps: number;
  calories: number;
}

/** Returns the local-date key (YYYY-MM-DD) for a given Date (defaults to now). */
export function getDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Calculates calories burned for a number of steps. */
export function calculateCalories(steps: number): number {
  return Math.round(steps * CALORIES_PER_STEP);
}

/** Filters entries to those matching the given date key. */
export function getDailyEntries(
  entries: StepEntry[],
  dateKey: string = getDateKey(),
): StepEntry[] {
  return entries.filter((e) => e.date === dateKey);
}

/**
 * Returns entries within the trailing 7-day window ending on referenceKey
 * (inclusive of both ends).
 */
export function getWeeklyEntries(
  entries: StepEntry[],
  referenceKey: string = getDateKey(),
): StepEntry[] {
  const ref = new Date(`${referenceKey}T00:00:00`);
  const start = new Date(ref);
  start.setDate(ref.getDate() - 6);
  return entries.filter((e) => {
    const d = new Date(`${e.date}T00:00:00`);
    return d >= start && d <= ref;
  });
}

export function sumSteps(entries: StepEntry[]): number {
  return entries.reduce((total, e) => total + e.steps, 0);
}

export function sumCalories(entries: StepEntry[]): number {
  return entries.reduce((total, e) => total + e.calories, 0);
}
