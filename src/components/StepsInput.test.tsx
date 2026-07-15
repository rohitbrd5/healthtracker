import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import StepsInput from './StepsInput';

afterEach(cleanup);

describe('StepsInput', () => {
  it('calls onAddSteps with the parsed steps on submit', () => {
    const onAddSteps = vi.fn();
    render(<StepsInput onAddSteps={onAddSteps} />);

    const input = screen.getByPlaceholderText('Enter steps') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '3000' } });
    fireEvent.click(screen.getByRole('button', { name: /add steps/i }));

    expect(onAddSteps).toHaveBeenCalledTimes(1);
    expect(onAddSteps).toHaveBeenCalledWith(3000);
  });

  it('does not call onAddSteps for invalid (empty) input', () => {
    const onAddSteps = vi.fn();
    render(<StepsInput onAddSteps={onAddSteps} />);

    const input = screen.getByPlaceholderText('Enter steps') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /add steps/i }));

    expect(onAddSteps).not.toHaveBeenCalled();
  });
});
