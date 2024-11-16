"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:8080/api/v1/emp/login", data);
      if (res.status === 200) {
        console.log("success login");
        console.log("Token:", res.data.token);
        console.log("User data:", res.data.employee);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="m-auto h-[500px] w-[500px] bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="email" className="mb-2.5 block font-medium text-dark">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="mb-2.5 block font-medium text-dark">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="password"
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <div className="mb-4.5">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium  transition hover:bg-opacity-90"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
