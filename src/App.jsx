import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MainView from "./view/Home.jsx";
import RegisterView from "./view/register/Register.jsx";
import MapView from "./view/map/MapView.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  axios.defaults.baseURL = `http://localhost:5000`;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMap, setShowMap] = useState(false);

  function toggleMap() {
    setShowMap(!showMap);
  }

  const handleLogin = () => {
    axios
      .post("/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          toast.success("Login successful!"); // Show success notification
        }
      })

      .catch((error) => {
        console.log(`Credentials: \'${username}\', \'${password}\'`);
        console.error("Login error: ", error);
        toast.error("Error logging in. Please try again."); // Show error notification
      });
  };

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          toast.success("Logout successful!"); // Show success notification
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
      <ToastContainer />
      {isLoggedIn ? (
        <div>
          {showMap ? (
            <div>
              <MapView zoom={2} />
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleMap}>Toggle Map</button>
            </div>
          ) : (
            <div>
              <MainView username={username} />
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleMap}>Toggle Map</button>
            </div>
          )}
        </div>
      ) : (
        <>
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
            <button onClick={handleLogin}>Login</button>
          </div>
          <RegisterView />
        </>
      )}
    </div>
  );
}

export default App;
