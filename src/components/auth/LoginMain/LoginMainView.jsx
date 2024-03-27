import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const LoginView = ({ setIsLoggedIn, setUsername }) => {
  LoginView.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsernameLocal] = useState("");
  const [email, setEmail] = useState("");

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUsername(username);
    toast.success("Login successful!");
    navigate("/");
  };

  const handleReturnHome = () => {
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
          toast.error("Error Logging in: Request Cancelled");
        } else {
          console.error("Login error: ", error.message);
          toast.error("Error logging in. Please try again.");
        }
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-extrabold my-10">Login</h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-indigo-500 "
      />
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
          className="bg-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-700 my-3 text-white"
          onClick={handleLogin}
          id="loginButton"
        >
          <span>Login</span>
        </button>

        <button
          className="bg-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-700 my-3  text-white"
          onClick={handleReturnHome}
          id="loginButton"
        >
          <span>Return to Home</span>
        </button>
      </div>
    </div>
  );
};

export default LoginView;
