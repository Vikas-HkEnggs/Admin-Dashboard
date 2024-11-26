import React from "react";

const OrderSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-gray-500">Subtotal</p>
        <p className="text-gray-900">${subtotal}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500">Shipping</p>
        <p className="text-gray-900">${shipping}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500">Tax</p>
        <p className="text-gray-900">${tax}</p>
      </div>
      <div className="flex justify-between font-semibold">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
