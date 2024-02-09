import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup({ toast }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alertMessage, setAlertMessage] = useState(null); // Alert message state

  function requestSignup() {
<<<<<<< HEAD
    axios
      .post("https://paytm-wallet-backend1.vercel.app/api/v1/user/signup", {
=======
    axios.post("https://paytm-wallet-backend1.vercel.app/api/v1/user/signup", {
>>>>>>> 370e265a4f3c43f6358d4c006082c1eb67564cf6
        firstName,
        lastName,
        username,
        password,
      })
      .then(function (response) {
        if (response.status === 200) {
          setAlertMessage("Signup Successfully");
          navigate("/signin");
        }
      })
      .catch(function (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setAlertMessage("Please fill all input fields correctly!");
              break;
            case 409:
              setAlertMessage("Username already taken!");
              break;
            case 500:
              setAlertMessage("Something went wrong! Please try again.");
              break;
            default:
              break;
          }
        } else {
          setAlertMessage("An unexpected error occurred. Please try again later.");
        }
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 text-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        {alertMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {alertMessage}</span>
          </div>
        )}
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
            placeholder="At least 8 characters"
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
