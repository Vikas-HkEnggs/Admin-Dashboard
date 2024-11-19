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
      const res = await axios.post("https://backend-hlrb.onrender.com/api/v1/common/login", data);
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
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="m-auto h-[500px] w-[500px] rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="mb-2.5 block font-medium">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className=" w-full rounded-lg border bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus-visible:shadow-none"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="password" className=" mb-2.5 block font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="password"
              className=" w-full rounded-lg border bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus-visible:shadow-none"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <div className="mb-4">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium  transition "
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
