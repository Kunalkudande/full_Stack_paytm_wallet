import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* eslint-disable react/prop-types */
export function Users() {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // getting the token from local storage;
    const token = localStorage.getItem("JWT-Token");
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${inputValue}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        setUsers(response.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Users</h3>
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 border rounded w-full focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <div className="mt-8">
          {users.length === 0 && inputValue.length > 0 && (
            <p className="text-red-500">No users found</p>
          )}
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center">
                <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold">
                    {user.firstName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="font-light">{`${user.username} `}</p>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none hover:bg-blue-600"
                onClick={() =>
                  navigate(`/send?id=${user._id}&name=${user.firstName} ${user.lastName}`)
                }
              >
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
