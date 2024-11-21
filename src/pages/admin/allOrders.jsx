"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Table from "@/components/Elements/Table";

const AllOrders = () => {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend-hlrb.onrender.com/api/v1/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchData();
  }, []);

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "order_id", header: "Order ID", size: 50 },
      { accessorKey: "companyName", header: "Company Name", size: 150 },
      { accessorKey: "customerEmail", header: "Company Email", size: 200 },
      { accessorKey: "gstNumber", header: "GST Number", size: 150 },
      { accessorKey: "address", header: "Address", size: 150 },
      { accessorKey: "quantity", header: "Quantity", size: 150 },
      { accessorKey: "product_name", header: "Product Name", size: 150 },
      {
        accessorKey: "optionsSelected",
        header: "Show Options",
        size: 100,
        Cell: ({ row }) => (
          <button
            className="text-blue-500"
            onClick={() => showModal(row.original)}
          >
            View Product Details
          </button>
        ),
      },
    ],
    []
  );

  const createBtn = () => {
    router.push("/admin/idPassGenerate");
  };

  return (
    <div>
      <h1 className="mb-4 ml-2 text-3xl">All Orders</h1>
      <button
        className="absolute right-6 top-[110px] ml-2 flex"
        onClick={createBtn}
      >
        <UserRoundPlus />
      </button>
      <Table
        columns={columns}
        data={data}
        options={{ sorting: true, filtering: true, pagination: true }}
      />

      {/* Modal for displaying selected options */}
      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ top: "10vh", bottom: "10vh" }} // Adjusts the modal's vertical position
          >
            <h2 className="text-2xl font-bold mb-4">
              {selectedOrder.product_name}
            </h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border p-2">Option</th>
                  <th className="border p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.optionsSelected &&
                  Object.entries(selectedOrder.optionsSelected).map(
                    ([key, value]) => (
                      <tr key={key}>
                        <td className="border p-2">{key}</td>
                        <td className="border p-2">
                          {/* Handle value being an object */}
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
