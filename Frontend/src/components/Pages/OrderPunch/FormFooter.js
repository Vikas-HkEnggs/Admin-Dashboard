import React from "react";
import Button from "@/components/Elements/Button";

const FormFooter = ({ currentStep, nextStep, prevStep, validateStep }) => (
  <div className="flex justify-between mt-6">
    {currentStep > 1 && (
      <Button type="button" onClick={prevStep}>
        Previous
      </Button>
    )}
    {currentStep < 4 && (
      <Button type="button" onClick={nextStep} disabled={!validateStep()}>
        Next
      </Button>
    )}
    {currentStep === 4 && (
      <Button type="submit" disabled={!validateStep()}>
        Submit
      </Button>
    )}
  </div>
);

export default FormFooter;
