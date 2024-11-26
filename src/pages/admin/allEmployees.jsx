"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Table from "@/components/Elements/Table";
const AllEmployees = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend-hlrb.onrender.com/api/v1/admin/allEmployees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response.data.data)
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 50 },
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "email", header: "Email", size: 200 },
      { accessorKey: "designation", header: "Designation", size: 150 },
      { accessorKey: "department", header: "Department", size: 150 },
      { accessorKey: "mobile", header: "Mobile", size: 150 },
      { accessorKey: "status", header: "Status", size: 150 },
    ],
    []
  );

  const createBtn = () => {
    router.push("/admin/idPassGenerate");
  };

  return (
    <div>
      <h1 className="mb-4 ml-2 text-3xl">All Employees</h1>
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
    </div>
  );
};

export default AllEmployees;
