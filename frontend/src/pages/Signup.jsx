import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup({ toast }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function requestSignup() {
    axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password,
      })
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Signup Successfully");
          navigate("/signin");
        }
      })
      .catch(function (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error("Please fill all input fields correctly!");
              console.log("give corrected input")
              break;
            case 409:
              toast.error("Username already taken!");
              break;
            case 500:
              toast.error("Something went wrong! Please try again.");
              break;
            default:
              break;
          }
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 text-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <p className="text-gray-600 mb-4">
          Enter your information to create an account
        </p>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md w-full py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md w-full py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md w-full py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="border border-gray-300 rounded-md w-full py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={requestSignup}
        >
          Signup
        </button>
        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-500 focus:outline-none"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
