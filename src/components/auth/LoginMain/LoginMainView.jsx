// LoginView.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
      .post("/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          handleLoginSuccess();
        }
      })
      .catch((error) => {
        console.log(`Credentials: '${username}', '${password}'`);
        console.error("Login error: ", error);
        toast.error("Error logging in. Please try again."); // Show error notification
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsernameLocal(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <br />
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default LoginView;
