"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CirclePlus, Plus, Minus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import Button from "@/components/Elements/Button";
import Table from "@/components/Elements/Table";
import Input from "@/components/Elements/Input";



const AllParts = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [quantityChange, setQuantityChange] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend-hlrb.onrender.com/api/v1/admin/allParts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.parts);
    } catch (error) {
      console.error("Error fetching part data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (part) => {
    setSelectedPart(part);
    setQuantityChange(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPart(null);
  };

  const handleQuantityUpdate = async (change) => {
    if (
      selectedPart &&
      window.confirm(`Confirm update of ${change} for ${selectedPart.part_name}?`)
    ) {
      try {
        await axios.post(
          "http://localhost:8080/api/v1/emp/add-update-inventory",
          {
            part_code: selectedPart.part_code,
            quantity_available: change,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        closeModal();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "part_id", header: "ID", size: 50 },
      { accessorKey: "part_name", header: "Part Name", size: 150 },
      { accessorKey: "part_code", header: "Part Code", size: 200 },
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
      <h1 className="mb-4 ml-2 text-3xl">All Parts</h1>
      <Button
        onClick={() => router.push("/admin/addItems")}
        className="absolute right-6 top-[97px] flex"
      >
        <CirclePlus className="mr-2" /> Add Part
      </Button>
      
      {/* Using reusable Table component */}
      <Table
        columns={columns}
        data={data}
        options={{ sorting: true, filtering: true, pagination: true }}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="modal mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            zIndex: 1001,
          },
        }}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Update Quantity for {selectedPart?.part_name}
        </h2>
        
        <div className="flex flex-col items-center space-y-6">
          <Input
            id="quantityChange"
            type="number"
            label="Quantity Change"
            placeholder="Enter quantity"
            value={quantityChange}
            onChange={(e) => setQuantityChange(parseInt(e.target.value))}
            className="w-24 text-center "
          />

          <div className="flex space-x-4">
            <Button
              onClick={() => handleQuantityUpdate(-quantityChange)}
              className="flex items-center bg-red-500 hover:bg-red-600"
            >
              <Minus className="mr-2" size={20} /> Remove
            </Button>
            <Button
              onClick={() => handleQuantityUpdate(quantityChange)}
              className="flex items-center bg-green-500 hover:bg-green-600"
            >
              <Plus className="mr-2" size={20} /> Add
            </Button>
            <Button
              onClick={closeModal}
              className="flex items-center bg-gray-300 hover:bg-gray-400"
            >
              <X className="mr-2" size={20} /> Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllParts;
