import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center mb-8">
      {Array.from({ length: steps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
          {index + 1 < steps && <div className="w-8 h-px bg-gray-300 mx-2"></div>}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
