"use client";
import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";
import Dropdown from "@/components/Elements/Dropdown";

export default function IdPassGenerate() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    designation: "",
    department: "",
    mobile: "",
  });
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePasswordBlur = () => {
    if (data.password !== data.confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMismatch) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    try {
      const requestData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        designation: data.designation,
        department: data.department,
        mobile: data.mobile,
      };

      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/register",
        requestData,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
        }
      );

      if (res.status === 201) {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          router.push("/admin/allEmployees");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="m-auto mt-4 h-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg md:p-10"
      >
        <h1 className="mb-8 text-center text-2xl font-bold">
          Employee Registration Form
        </h1>

        <div className="-mx-4 mb-4 flex flex-wrap">
          <div className="mb-4 w-full px-4 md:mb-0 md:w-1/2">
            <Input
              id="name"
              type="text"
              label="Name"
              placeholder="Enter Name"
              required
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-4 md:w-1/2">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="name@hkengg.com"
              required
              value={data.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="-mx-4 mb-4 flex flex-wrap">
          <div className="relative mb-4 w-full px-4 md:mb-0 md:w-1/2">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter Password"
              required
              value={data.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-10"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative w-full px-4 md:w-1/2">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm Password"
              required
              value={data.confirmPassword}
              onChange={handleChange}
              onBlur={handlePasswordBlur}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-6 top-10"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {passwordMismatch && (
              <p className="mt-1 text-sm text-red-500">Passwords do not match.</p>
            )}
          </div>
        </div>

        <div className="-mx-4 mb-4 flex flex-wrap">
          <div className="mb-4 w-full px-4 md:mb-0 md:w-1/2">
            <Dropdown
              label="Role"
              name="role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "employee1", label: "Employee 1" },
                { value: "employee2", label: "Employee 2" },
              ]}
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />
          </div>
          <div className="w-full px-4 md:w-1/2">
            <Dropdown
              label="Designation"
              name="designation"
              options={[
                { value: "manager", label: "Manager" },
                { value: "developer", label: "Developer" },
                { value: "designer", label: "Designer" },
              ]}
              value={data.designation}
              onChange={(e) => setData({ ...data, designation: e.target.value })}
            />
          </div>
        </div>

        <div className="-mx-4 mb-4 flex flex-wrap">
          <div className="mb-4 w-full px-4 md:mb-0 md:w-1/2">
            <Dropdown
              label="Department"
              name="department"
              options={[
                { value: "HR", label: "HR" },
                { value: "IT", label: "IT" },
                { value: "Marketing", label: "Marketing" },
              ]}
              value={data.department}
              onChange={(e) => setData({ ...data, department: e.target.value })}
            />
          </div>
          <div className="w-full px-4 md:w-1/2">
            <Input
              id="mobile"
              type="text"
              label="Mobile No."
              placeholder="Enter Mobile No."
              required
              value={data.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <Button type="submit">Create Account</Button>
      </form>
      <ToastContainer />
    </>
  );
}
