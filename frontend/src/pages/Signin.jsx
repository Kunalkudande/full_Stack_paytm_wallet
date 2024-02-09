import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin({ toast }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  function requestSignin() {
    axios
      .post("https://paytm-wallet-backend1.vercel.app/api/v1/user/signin", {
        username,
        password,
      })
      .then(function (response) {
        if (response.status === 200) {
          setAlertMessage("Signed in Successfully");
          const authToken = response.data.token;
          localStorage.setItem("JWT-Token", authToken);
          navigate(`/dashboard?name=${response.data.firstName.split(" ")[0]}`);
        }
      })
      .catch(function (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setAlertMessage("Please fill the input fields correctly!");
              break;
            case 404:
              setAlertMessage("Username does not exist!");
              break;
            case 401:
              setAlertMessage("Incorrect password!");
              break;
            case 500:
              setAlertMessage("Something went wrong!");
              break;
            default:
              break;
          }
        }
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 text-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        {alertMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {alertMessage}</span>
          </div>
        )}
        <p className="text-gray-600 mb-4">
          Enter your credentials to access your account
        </p>
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
          onClick={requestSignin}
        >
          Sign in
        </button>
        <p className="text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            className="text-blue-500 focus:outline-none"
            onClick={() => navigate("/")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
