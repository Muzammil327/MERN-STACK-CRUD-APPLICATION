import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define a type for the data received from the API
interface Data {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  para: string;
}

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/crud/get`,
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    };
    fetchData();
  }, []);
  const handleDeleteItem = async (_id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}api/crud/delete/${_id}`,
        {
          withCredentials: true,
        }
      );
      setData(data.filter((item: Data) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto lg:px-8 md:px-6 px-4">
        <Link
          to="/add"
          className="items-end justify-end block w-40 my-5 bg-gray-800 text-white py-2 px-4 rounded-md "
        >
          Add New User
        </Link>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Fist Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Para
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4"> {datas._id}</td>
                    <td className="px-6 py-4"> {datas.fname}</td>
                    <td className="px-6 py-4"> {datas.lname}</td>
                    <td className="px-6 py-4"> {datas.email}</td>
                    <td className="px-6 py-4"> {datas.para}</td>
                    <td className="px-6 py-4 gap-4 flex items-center">
                      <Link
                        to={datas._id}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                      >
                        Update
                      </Link>
                      {/* onClick={() => handleDeleteItem(data._id)} */}

                      <button
                        onClick={() => handleDeleteItem(datas._id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
            {/* <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th> */}
            {/* <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
