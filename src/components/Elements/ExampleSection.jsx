import React from "react";

const ExampleSection = ({ currentStep }) => {
  const renderExample = () => {
    if (currentStep === 1) {
      return (
        <div>
          <h4 className="mb-2 text-lg font-semibold">Example</h4>
          <p>
            <strong>Customer Name:</strong> Vikas Kashyap
          </p>
          <p>
            <strong>Customer Email:</strong> vk@gmail.com
          </p>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div>
          <h4 className="mb-2 text-lg font-semibold">Product Details</h4>
          <p>Product details will be displayed here as per selection.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg md:p-10">
      {renderExample()}
    </div>
  );
};

export default ExampleSection;
