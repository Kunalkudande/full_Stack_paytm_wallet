import React from "react";
import { Link } from "react-router-dom";

export const Appbar = ({ user }) => {
    const handleLogout = () => {
        // Clear authentication data from localStorage (replace "JWT-Token" with your actual key)
        localStorage.removeItem("JWT-Token");
    }

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div>
                <Link to="/">
                    <img className="h-12" src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg" alt="Paytm Logo" />
                </Link>
            </div>
            <div className="flex items-center">
                <div className="mr-4">
                    Hello, {user || "Guest"}
                </div>
                {user && (
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl mr-2">
                        {user[0]}
                    </div>
                )}
                <Link to="/Signin">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none" onClick={handleLogout}>
                        Log out
                    </button>
                </Link>
            </div>
        </div>
    );
}
