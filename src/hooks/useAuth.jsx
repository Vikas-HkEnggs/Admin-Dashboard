import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const role = parsedUserData?.role || "";
      setUserRole(role);
      setIsLoggedIn(!!role); // Set login state based on user role
    }
  }, []); // Only check on initial load

  return { isLoggedIn, userRole, setIsLoggedIn, setUserRole }; // Return state and setters
};
