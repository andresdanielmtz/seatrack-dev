import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registration successful!"); // Show success notification
        }
      })
      .catch((error) => {
        console.error("Registration error: ", error);
        if (error.response.status === 409) {
          toast.error("Registration Error: Username already exists"); // Show error notification
        } else {
          toast.error("Registration error. Please try again."); // Show error notification
        }
      });
  };

  return (
    <>
      <h2> Alternatively, you can register here: </h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  );
}
