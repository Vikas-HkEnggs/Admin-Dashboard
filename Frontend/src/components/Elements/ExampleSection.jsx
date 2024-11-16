import React from "react";

const ExampleSection = ({ currentStep }) => {
  const renderExample = () => {
    if (currentStep === 1) {
      return (
        <div>
          <h4 className="text-lg font-semibold mb-2">Example</h4>
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
          <h4 className="text-lg font-semibold mb-2">Product Details</h4>
          <p>Product details will be displayed here as per selection.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
      {renderExample()}
    </div>
  );
};

export default ExampleSection;
