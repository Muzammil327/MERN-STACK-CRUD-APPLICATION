import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import React from "react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  // Add more properties as needed
}

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState<UserData | null>(null);
  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
       
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

  const handleLogout = async () => {
    console.log("logout")
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/logout`
      );
      // Send a POST request to the /logout endpoint
      navigate("/authentication/login")
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>{" "}
      {/* {error && <p>Error: {error}</p>} */}
      {/* {user} */}
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
