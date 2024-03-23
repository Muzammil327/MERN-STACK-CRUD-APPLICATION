import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import React from "react";

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // if (!currentUser) {
        //   // Token expired or unauthorized, redirect to login
        //   return navigate("/login");
        // }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/profile`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data); // Set user data
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [navigate, currentUser]);

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}api/logout`
  //     );
  //     // Send a POST request to the /logout endpoint

  //     // Check if the logout was successful
  //     if (response.data.success) {
  //       // Clear any user-related data in your frontend (optional)
  //       // Redirect the user to the login page or any other desired page
  //       window.location.href = "/login"; // Redirect to login page
  //     } else {
  //       // Handle logout failure
  //       console.error("Logout failed:", response.data.message);
  //     }
  //   } catch (error) {
  //     // Handle network errors or other exceptions
  //     console.error("Error during logout:", error);
  //   }
  // };

  return (
    <>
      <h1>Profile</h1>
      {/* <button onClick={handleLogout}>Logout</button>{" "} */}
      {/* {error && <p>Error: {error}</p>} */}
      {user && (
        <div>
          <p>id: {user?._id}</p>
          <p>Username: {user?.name}</p>
          <p>Email: {user?.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </>
  );
}
