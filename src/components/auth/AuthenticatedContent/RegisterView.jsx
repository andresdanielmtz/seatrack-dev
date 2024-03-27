import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUpPopUp from "../../props/SignUpPopUp";

export default function RegisterView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false); // sign up pop up
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const closePopUp = () => {
    setShowPopUp(false);
    navigate("/");
  };

  const handleRegister = () => {
    setLoading(true);

    axios
      .post("/register", {
        username: username,
        password: password,
        email: email,
      })
      .then(() => {
        toast.success("Registration successful!");
      })
      .catch((error) => {
        console.error("Registration error: ", error);

        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;

          if (errorMessage.includes("Username already exists")) {
            toast.error("Registration Error: Username already exists");
          } else {
            toast.error(`Registration error: ${errorMessage}`);
          }
        } else {
          toast.error("Registration error. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
        setShowPopUp(true);
      });
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        {showPopUp ? <SignUpPopUp onClose={closePopUp} /> : null}

        <div className="flex flex-col items-center justify-center h-screen bg-white p-8 rounded-3xl shadow-md">
          <h1 className="text-4xl font-extrabold my-10">Register</h1>

          <input
            type="text"
            id="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border p-2 w-full mb-5"
          />
          
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md border p-2 w-full mb-5"
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border p-2 w-full mb-5"
          />

          <div className="flex flex-col">
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 my-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              className="bg-slate-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-l"
              onClick={() => navigate("/")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
