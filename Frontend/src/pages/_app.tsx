import Head from "next/head";
import "tailwindcss/tailwind.css";
import "./style.css";
import { AppProps } from "next/app";
import { DashboardLayout } from "@/dashboard/Layout";
import { DashboardProvider } from "@/dashboard/Provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [userRole, setUserRole] = useState("");
  const router = useRouter(); // Use the useRouter hook here

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only on the client side
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const role = userData?.role || "";
      setUserRole(role);
    }
  }, []);

  const isLoginPage = router.pathname === "/auth/signin"; // Check if the current route is the login page

  return (
    <>
      <Head>
        <title>H K Consultants & Engineers Pvt. Ltd.</title>
      </Head>
      <DashboardProvider userRole={userRole}>
        {isLoginPage ? (
          <Component {...pageProps} /> 
        ) : (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        )}
      </DashboardProvider>
    </>
  );
}

export default MyApp;
