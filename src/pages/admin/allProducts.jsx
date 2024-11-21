import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Plus, Minus, X, CirclePlus } from "lucide-react";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import ModalComponent from "@/components/Elements/Modal";
import Input from "@/components/Elements/Input";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityChange, setQuantityChange] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/allProducts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantityChange(0); // Reset for each product
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityUpdate = async (change) => {
    if (
      selectedProduct &&
      window.confirm(
        `Confirm update of ${change} for ${selectedProduct.product_name}?`
      )
    ) {
      try {
        await axios.post(
          "https://backend-hlrb.onrender.com/api/v1/emp/add-update-inventory",
          {
            product_code: selectedProduct.product_code,
            quantity_available: change, // Send the change in quantity
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData(); // Refresh data after update
        closeModal();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "product_id", header: "ID", size: 50 },
      { accessorKey: "product_name", header: "Product Name", size: 150 },
      { accessorKey: "product_code", header: "Product Code", size: 200 },
      {
        accessorKey: "quantity_available",
        header: "Quantity Available",
        size: 200,
      },
      {
        id: "actions",
        header: "Actions",
        size: 200,
        Cell: ({ row }) => (
          <button
            className="rounded bg-[#0e3758] px-2 py-1 text-white"
            onClick={() => openModal(row.original)}
          >
            Update Quantity
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <h1 className="mb-4 ml-2 text-3xl">All Products</h1>
      <Button
        onClick={() => router.push("/admin/addItems")}
        className="absolute right-6 top-[97px] ml-2 flex"
      >
        <CirclePlus className="mr-2" /> Add Product
      </Button>

      <Table
        columns={columns}
        data={data}
        options={{ sorting: true, filtering: true, pagination: true }}
      />

      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title={`Update Quantity for ${selectedProduct?.product_name}`}
      >
        <div className="flex flex-col items-center space-y-6">
          <Input
            type="number"
            value={quantityChange}
            onChange={(e) => setQuantityChange(parseInt(e.target.value))}
            className="w-36 rounded-lg  px-4 py-2 text-center focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex space-x-4">
            <Button
              onClick={() => handleQuantityUpdate(-quantityChange)}
              className="flex items-center bg-red-500 px-6 py-2 shadow hover:bg-red-600"
            >
              <Minus className="mr-2" size={20} />
              Remove
            </Button>
            <Button
              onClick={() => handleQuantityUpdate(quantityChange)}
              className="flex items-center bg-green-500 px-6 py-2 shadow hover:bg-green-600"
            >
              <Plus className="mr-2" size={20} />
              Add
            </Button>
            <Button
              onClick={closeModal}
              className="flex items-center bg-gray-300 px-6 py-2 text-gray-700 shadow hover:bg-gray-400"
            >
              <X className="mr-2" size={20} />
              Cancel
            </Button>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default AllProducts;
