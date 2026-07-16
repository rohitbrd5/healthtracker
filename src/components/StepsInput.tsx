import React from "react";

interface StepsInputProps {
  onAddSteps: (steps: number) => void;
}

const StepsInput: React.FC<StepsInputProps> = ({ onAddSteps }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("steps") as HTMLInputElement;
    const steps = parseInt(input.value, 10);

    if (isNaN(steps) || steps < 0) return;

    onAddSteps(steps);
    form.reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Steps Today
          </label>
          <input
            type="number"
            name="steps"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter steps"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Add Steps
        </button>
      </form>
    </div>
  );
};

export default StepsInput;
