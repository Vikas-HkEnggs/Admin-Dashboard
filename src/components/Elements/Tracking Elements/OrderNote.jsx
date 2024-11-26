import React from "react";

const OrderNote = ({ note }) => {
  return (
    <div>
      <h6 className="font-medium">Order Note:</h6>
      <p className="text-gray-500">{note}</p>
    </div>
  );
};

export default OrderNote;
