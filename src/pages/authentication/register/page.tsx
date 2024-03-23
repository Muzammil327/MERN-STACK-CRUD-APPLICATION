import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const SubmitHandle = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/register`,
        data
      );
      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white shadow-md rounded-lg px-12 py-6 lg:w-5/12 md:w-8/12 sm:w-10/12 w-full">
          <h1 className="text-2xl font-bold text-center mb-4">
            Welcome Add User!
          </h1>
          <form onSubmit={SubmitHandle}>
            <div className="mb-4">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="name"
                id="name"
                className="input"
                placeholder="Enter Your First Name"
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Enter Your Email Address"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label htmlFor="para" className="label">
                Password
              </label>
              <input
                id="para"
                className="input"
                type="password"
                placeholder="Enter Your Password"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
