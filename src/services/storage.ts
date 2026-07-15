import type { StepEntry } from '../utils/health';

const STORAGE_KEY = 'healthTrackerData';

/** Loads step entries from localStorage. Returns [] on missing/corrupt data. */
export function loadEntries(): StepEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StepEntry[]) : [];
  } catch {
    return [];
  }
}

/** Persists step entries to localStorage. */
export function saveEntries(entries: StepEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
