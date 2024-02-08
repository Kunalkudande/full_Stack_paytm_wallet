/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Heading } from "../components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SendMoney({ toast }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  let dashboardRedirect;

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/dashboard?name=${dashboardRedirect}`);
        setInputValue("");
      }, 2000); // Delay navigation for 2 seconds
    }
  }, [isLoading, navigate, dashboardRedirect]);

  function transferMoney() {
    setIsLoading(true); // Set loading state to true
    axios.post("https://paytm-wallet-backend1.vercel.app/api/v1/account/transfer",
        {
          toUser: `${id}`,
          amount: parseFloat(inputValue),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT-Token"),
          },
        }
      )
      .then(function (response) {
        response.status === 200 && toast.success("Transaction Successful");
        const userInfo = response.data.userInfo;
        dashboardRedirect = userInfo.name; // Assuming name is a property of userInfo
        setIsLoading(false); // Reset loading state
        setTimeout(() => {
          navigate(`/dashboard?name=${dashboardRedirect}`);
          setInputValue("");
        }, 5000); // Delay navigation for 2 seconds
      })
      .catch(function (error) {
        setIsLoading(false); // Reset loading state
        error.response.status === 400
          ? toast.error("Please fill the input field")
          : error.response.status === 401
          ? toast.error("Unauthorized request")
          : error.response.status === 402
          ? toast.error("Insufficient balance")
          : error.response.status === 500
          ? toast.error("Something went wrong")
          : null;
      });
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-80">
          <Heading textValue="Send Money To" />
          <div className="flex items-center mb-4">
            <div className="bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center mr-4">
              <span className="text-lg font-semibold">{name[0]}</span>
            </div>
            <span className="font-semibold">{name}</span>
          </div>
          <p className="text-gray-600 mb-2">Amount (INR)</p>
          <input
            type="number"
            placeholder="Rs."
            className="border border-gray-300 rounded-md w-full py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500 mb-4"
            min={0}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={transferMoney}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Transferring..." : "Transfer"}
          </button>
        </div>
      </div>
    </>
  );
}
