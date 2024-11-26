import React from "react";
import TrackingStep from "./TrackingStep";

const TrackingTimeline = ({ steps }) => {
  return (
    <ol className="flex flex-col md:flex-row justify-between gap-4 w-full">
      {steps.map((step, index) => (
        <TrackingStep key={index} {...step} />
      ))}
    </ol>
  );
};

export default TrackingTimeline;
