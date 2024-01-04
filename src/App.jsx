import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RegisterView from "./view/main/register/RegisterView.jsx";
import LoginView from "./view/main/LoginMain/LoginMainView.jsx";
import AuthenticatedContent from "./view/main/MapMain/AuthenticatedContent.jsx";
import AboutView from "./view/about/AboutView.jsx";

function App() {
  axios.defaults.baseURL = `http://localhost:5000`;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Local state for username
  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Logout error: ", error);
        // Handle logout error, e.g., display an error message
        console.log(error.message);
        toast.error("Error logging out. Please try again."); // Show error notification
      });
  };

  return (
    <div>
      <div>
        <ToastContainer
          theme="light"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route
            path="/login"
            element={
              <LoginView
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
              />
            }
          ></Route>

          <Route path="/register" element={<RegisterView />}></Route>
          <Route path="/about" element={<AboutView />}></Route>

          <Route
            path="/"
            element={
              <AuthenticatedContent
                isLoggedIn={isLoggedIn}
                showMap={showMap}
                username={username}
                handleLogout={handleLogout}
                toggleMap={toggleMap}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
