import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

// The doughnut needs a canvas 2d context jsdom doesn't provide; stub it.
vi.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}));

beforeEach(() => {
  localStorage.clear();
});

afterEach(cleanup);

describe('App', () => {
  it('persists entered steps to localStorage', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Enter steps') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '3000' } });
    fireEvent.click(screen.getByRole('button', { name: /add steps/i }));

    const stored = JSON.parse(localStorage.getItem('healthTrackerData') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].steps).toBe(3000);
    expect(stored[0].calories).toBe(120);
    expect(typeof stored[0].date).toBe('string');
  });

  it('loads existing entries from localStorage on mount', () => {
    localStorage.setItem(
      'healthTrackerData',
      JSON.stringify([{ date: '2026-07-15', steps: 2000, calories: 80 }]),
    );

    render(<App />);

    expect(screen.getAllByText('2,000').length).toBeGreaterThan(0);
  });
});
