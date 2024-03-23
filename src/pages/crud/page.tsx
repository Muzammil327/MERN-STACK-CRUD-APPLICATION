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

export default function HomeCrud() {
  const [data, setData] = useState<Data[]>([]);


  // console.log(baseUrl + page)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/crud/get`,
        {
          withCredentials: true,
        }
      );
      // setTotalPages(response.data.page);
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
          to="/crud/add"
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
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={datas._id}
                  >
                    <td className="px-6 py-4"> {datas._id}</td>
                    <td className="px-6 py-4"> {datas.fname}</td>
                    <td className="px-6 py-4"> {datas.lname}</td>
                    <td className="px-6 py-4"> {datas.email}</td>
                    <td className="px-6 py-4"> {datas.para}</td>
                    <td className="px-6 py-4 gap-4 flex items-center">
                      <Link
                        to={`/crud/${datas._id}`}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                      >
                        Update
                      </Link>

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
          </tbody>
        </table>
      </div>
    </>
  );
}
