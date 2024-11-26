import React from "react";

const TrackingStep = ({ title, date, completed }) => {
  return (
    <li className="group flex relative justify-start">
      <div className="flex flex-col items-center gap-1">
        <h5
          className={`text-lg font-medium ${completed ? "text-gray-900" : "text-gray-500"}`}
        >
          {title}
        </h5>
        <h6 className="text-gray-500 text-base">{date}</h6>
      </div>
    </li>
  );
};

export default TrackingStep;
