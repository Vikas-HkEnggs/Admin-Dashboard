import React from "react";

const StepNavigator = ({ currentStep, steps }) => (
  <div className="mb-8">
    <div className="flex justify-between mb-2">
      {steps.map((step, index) => (
        <span
          key={index}
          className={`text-xs font-semibold py-1 px-2 uppercase rounded-full ${
            currentStep >= index + 1
              ? "text-green-600 bg-green-200"
              : "opacity-50"
          }`}
        >
          {step}
        </span>
      ))}
    </div>
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
      <div
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default StepNavigator;
