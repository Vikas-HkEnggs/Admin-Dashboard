const ReviewStep = ({ formData, products, options }) => {
    // Debugging: Log options and selected values
    console.log("Options:", options);
    console.log("Options Selected:", formData.optionsSelected);
  
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Review Your Details</h2>
        <ul>
          <li className="p-1">
            <strong>Customer Name:</strong> {formData.customerName}
          </li>
          <li className="p-1">
            <strong>Customer Email:</strong> {formData.customerEmail}
          </li>
          <li className="p-1">
            <strong>Product:</strong>{" "}
            {products.find((p) => p.productCode === formData.product)?.name || "N/A"}
          </li>
          <li className="p-1">
            <strong>Quantity:</strong> {formData.quantity}
          </li>
          <li className="p-1">
            <strong>Options Selected:</strong>
            <ul>
              {Object.entries(formData.optionsSelected).map(([optionId, value]) => {
                const option = options.find((opt) => opt.id.toString() === optionId.toString());
                return (
                  <li key={optionId} className="p-1">
                    {option?.name || "Unknown Option"}: {value}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  };
  
  export default ReviewStep;
  