import React, { useState } from "react";
import axios from "axios";

export function Balance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch balance from server
  async function checkBalance() {
    setLoading(true);
    const token = localStorage.getItem("JWT-Token");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setBalance(response.data.balance);
      setError(null);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Error fetching balance. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <div className="text-2xl font-bold mb-4">Your Balance</div>
      <div className="text-lg mb-4">
        {loading ? (
          <div className="text-blue-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="text-green-500 font-semibold">{balance !== null && `Rs ${balance}`}</div>
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={checkBalance}
      >
        Check Balance
      </button>
    </div>
  );
}
