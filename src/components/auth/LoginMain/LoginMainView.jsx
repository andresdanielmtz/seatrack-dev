// LoginView.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginMainView.css";

const LoginView = ({ setIsLoggedIn, setUsername }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsernameLocal] = useState(""); // Add this line

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set isLoggedIn in the parent component
    setUsername(username); // Set the username in the parent component
    toast.success("Login successful!"); // Show success notification
    navigate("/");
  };

  const handleLogin = () => {
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          handleLoginSuccess();
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log(`Credentials: ${username} , ${password}`);
          console.error("Login error: ", error);
          toast.error("Error logging in. Please try again.");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-amber-100">
      <h1 className="text-4xl font-extrabold my-10">Login</h1>
      {/* Username input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsernameLocal(e.target.value)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
      />

      <div className="flex flex-col justify-between my-10">
        <button className="button my-3" onClick={handleLogin}>
          {" "}
          <span className="text">Login</span>
        </button>

        <button className="button" onClick={() => navigate("/")}>
          {" "}
          <span className="text">Return to Home</span>
        </button>
      </div>
    </div>
  );
};

export default LoginView;
