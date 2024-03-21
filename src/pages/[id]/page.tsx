import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

export default function Update() {
  let { id } = useParams();

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
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/crud/update/${id}`,
        data
      );

      if (response.data.error) {
        alert(response.data.message);
        console.log(response.data.message);
      } else {
        navigate("/");
        setData({
          fname: "",
          lname: "",
          email: "",
          para: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/crud/single/${id}`,
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white shadow-md rounded-lg px-12 py-6 lg:w-5/12 md:w-8/12 sm:w-10/12 w-full">
          <h1 className="text-2xl font-bold text-center mb-4">
            Welcome Update User!
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
