import React from "react";
import TrackingTimeline from "./TrackingTimeline";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";
import OrderNote from "./OrderNote";
import Button from "../Button";

const OrderDetails = () => {
  const trackingSteps = [
    { title: "Order Placed", date: "20 May, 2024", completed: true },
    { title: "Picked", date: "22 May, 2024", completed: true },
    { title: "Packed", date: "23 May, 2024", completed: true },
    { title: "Shipped", date: "28 May, 2024", completed: true },
    { title: "Delivered", date: "2 Jun, 2024", completed: false },
  ];

  const orderItems = [
    {
      image: "https://pagedone.io/asset/uploads/1718189222.png",
      title: "Pure Cotton Regular Fit T-Shirt",
      size: "M",
      color: "White",
      price: 40,
      quantity: 2,
    },
    {
      image: "https://pagedone.io/asset/uploads/1718189288.png",
      title: "Men Colourblocked PU Sneakers",
      size: "38",
      color: "Green & Gray",
      price: 56,
      quantity: 1,
    },
  ];

  const subtotal = 210;
  const shipping = 10;
  const tax = 22;
  const total = 242;
  const note =
    "Make sure to ship all the ordered items together by Friday. Thank you!";

  return (
    <div className="p-8 bg-white rounded-lg">
      <div className="flex justify-between mb-6">
        <h2>Order #125103</h2>
        <Button>Print Invoice</Button>
      </div>

      <TrackingTimeline steps={trackingSteps} />

      <div className="mt-6">
        {orderItems.map((item, index) => (
          <OrderItem key={index} {...item} />
        ))}
      </div>

      <div className="mt-6">
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>

      <div className="mt-6">
        <OrderNote note={note} />
      </div>
    </div>
  );
};

export default OrderDetails;
