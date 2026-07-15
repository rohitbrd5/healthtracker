import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StepsProgressChart, {
  STEPS_GOAL,
  getProgressColor,
} from './StepsProgressChart';

vi.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}));

describe('getProgressColor', () => {
  it('is orange (#F97316) for 0-2499 steps', () => {
    expect(getProgressColor(0)).toBe('#F97316');
    expect(getProgressColor(2499)).toBe('#F97316');
  });

  it('is yellow (#EAB308) for 2500-4999 steps', () => {
    expect(getProgressColor(2500)).toBe('#EAB308');
    expect(getProgressColor(4999)).toBe('#EAB308');
  });

  it('is green (#22C55E) for 5000 or more steps', () => {
    expect(getProgressColor(5000)).toBe('#22C55E');
    expect(getProgressColor(9999)).toBe('#22C55E');
  });
});

describe('STEPS_GOAL', () => {
  it('is 5000', () => {
    expect(STEPS_GOAL).toBe(5000);
  });
});

describe('StepsProgressChart', () => {
  it('renders the steps, goal and completion percent', () => {
    render(<StepsProgressChart steps={5000} goal={5000} />);

    expect(screen.getByText('5,000')).toBeInTheDocument();
    expect(screen.getByText('/ 5,000')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('shows the entered steps but caps the percent at the goal', () => {
    render(<StepsProgressChart steps={8000} goal={5000} />);

    expect(screen.getByText('8,000')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('uses the default 5000 goal', () => {
    render(<StepsProgressChart steps={2500} />);

    expect(screen.getByText('/ 5,000')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
