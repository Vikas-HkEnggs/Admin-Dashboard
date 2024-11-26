import React from "react";

const OrderItem = ({ image, title, size, color, price, quantity }) => {
  return (
    <div className="flex gap-4">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-medium">{title}</h4>
        <p className="text-gray-500">Size: {size}</p>
        <p className="text-gray-500">Color: {color}</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-gray-500">
          ${price} x {quantity}
        </p>
        <p className="text-gray-900 font-semibold">${price * quantity}</p>
      </div>
    </div>
  );
};

export default OrderItem;
