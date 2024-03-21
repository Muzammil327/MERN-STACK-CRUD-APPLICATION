import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    para: "",
  });

  const SubmitHandle = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/crud/post`,
        data
      );
      if (response.data && response.data.error) {
        alert(response.data.error.message);
        console.log(response.data.error.message);
      } else {
        navigate("/");
        setData({
          fname: "",
          lname: "",
          email: "",
          para: "",
        });
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
              <label htmlFor="fname" className="label">
                First Name
              </label>
              <input
                type="fname"
                id="fname"
                className="input"
                placeholder="Enter Your First Name"
                value={data.fname}
                onChange={(e) =>
                  setData({
                    ...data,
                    fname: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lname" className="label">
                Last Name
              </label>
              <input
                type="lname"
                id="lname"
                className="input"
                placeholder="Enter Your Last Name"
                value={data.lname}
                onChange={(e) =>
                  setData({
                    ...data,
                    lname: e.target.value,
                  })
                }
                required
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
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="para" className="label">
                Description
              </label>
              <textarea
                id="para"
                className="input"
                placeholder="Enter Your Description"
                value={data.para}
                onChange={(e) =>
                  setData({
                    ...data,
                    para: e.target.value,
                  })
                }
                required
              ></textarea>
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
