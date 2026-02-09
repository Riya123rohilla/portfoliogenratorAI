import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps }) => {
  const { currentStep, goToStep } = usePortfolio();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          const isAccessible = index <= currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isAccessible && goToStep(index)}
              disabled={!isAccessible}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                isActive
                  ? 'bg-primary-50 border-2 border-primary-600'
                  : isCompleted
                  ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                  : 'bg-gray-50 border border-gray-200 opacity-50 cursor-not-allowed'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={`font-medium ${
                  isActive
                    ? 'text-primary-900'
                    : isCompleted
                    ? 'text-green-900'
                    : 'text-gray-600'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-900 font-medium">
          💡 Tip: Use AI enhancement to improve your content!
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
