import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginView = ({ setIsLoggedIn, setUsername }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsernameLocal] = useState("");

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUsername(username);
    toast.success("Login successful!");
    navigate("/");
  };

  const handleLogin = () => {
    axios
      .post(
        "/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-extrabold my-10">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsernameLocal(e.target.value)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-indigo-500 "
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-indigo-500"
      />

      <div className="flex flex-col justify-between my-10">
        <button
          className="bg-blue-500 !text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 my-3"
          onClick={handleLogin}
        >
          <span className="text">Login</span>
        </button>

        <button
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-l"
          onClick={() => navigate("/")}
        >
          <span className="text">Return to Home</span>
        </button>
      </div>
    </div>
  );
};

export default LoginView;
