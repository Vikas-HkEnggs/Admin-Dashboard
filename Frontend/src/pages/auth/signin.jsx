"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Image from "next/image";
import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("http://localhost:8080/api/v1/emp/login", data);
      
      if (res.status === 200) {
        const { token, employee } = res.data;
        
        // Save the token and user data to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(employee));

        console.log("Successfully logged in");
        router.push("/"); // Redirect to the home page or dashboard
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="mt-16">
      <div className="mx-auto flex flex-col  items-center px-6 py-8 md:h-screen lg:py-0">
        <Image
          className="mb-2 mr-2 h-16 w-16 object-contain"
          src="/assets/logo_hk.jpg"
          alt="logo"
          width={150}
          height={150}
        />
        <h1 className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
          H K Consultants & Engineers Pvt. Ltd.
        </h1>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <Input
                id="email"
                type="email"
                label="Your email"
                placeholder="name@hkengg.com"
                required
                value={data.email}
                onChange={handleChange}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                required
                value={data.password}
                onChange={handleChange}
              />
              
              {error && <div className="text-red-500">{error}</div>}

              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
