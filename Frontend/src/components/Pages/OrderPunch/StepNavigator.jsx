import React from "react";

const StepNavigator = ({ currentStep, steps }) => (
  <div className="mb-8">
    <div className="mb-2 flex justify-between">
      {steps.map((step, index) => (
        <span
          key={index}
          className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${
            currentStep >= index + 1
              ? "bg-green-200 text-green-600"
              : "opacity-50"
          }`}
        >
          {step}
        </span>
      ))}
    </div>
    <div className="mb-4 flex h-2 overflow-hidden rounded bg-green-200 text-xs">
      <div
        className="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none transition-all duration-500 ease-in-out"
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default StepNavigator;
